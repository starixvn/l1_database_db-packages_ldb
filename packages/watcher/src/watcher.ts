import type { BaseLogger } from "@ldb/base-logger";
import {
    type ChangeStream,
    type ChangeStreamDeleteDocument,
    type ChangeStreamDocument,
    type ChangeStreamInsertDocument,
    type ChangeStreamOptions,
    type ChangeStreamReplaceDocument,
    type ChangeStreamUpdateDocument,
    type Collection,
    type Document,
    type EventsDescription,
} from "@ldb/mongo";
import { TypedEventEmitter } from "@ldb/utils";

const CHANGE_STREAM_OPTIONS = { fullDocument: "updateLookup", fullDocumentBeforeChange: "whenAvailable", maxTimeMS: 0 } as const satisfies ChangeStreamOptions;

export class Watcher<Events extends EventsDescription, Schema extends Document = Document> extends TypedEventEmitter<Events> {
    private changeStream: ChangeStream<Schema>;

    constructor(
        protected readonly collection: Collection<Schema>,
        pipeline: Document[] = [],
        protected readonly logger: BaseLogger,
    ) {
        super();
        this.changeStream = this.collection.watch(pipeline, CHANGE_STREAM_OPTIONS);
        this.selfBound();
        this.startListening();
        this.healthCheck();
    }

    get className() {
        return this.constructor.name;
    }

    private selfBound() {
        this.handleChange = this.handleChange.bind(this);
        this.handleError = this.handleError.bind(this);
        this.healthCheck = this.healthCheck.bind(this);
    }

    private startListening() {
        this.changeStream.on<"change">("change", this.handleChange);
        this.changeStream.on<"error">("error", this.handleError);
    }

    private stopListening() {
        this.changeStream.off<"change">("change", this.handleChange);
        this.changeStream.off<"error">("error", this.handleError);
    }

    private handleChange(changeDocument: ChangeStreamDocument<Schema>) {
        const { operationType } = changeDocument;

        switch (operationType) {
            case "insert":
                this.handleDocumentInsert(changeDocument);
                break;
            case "update":
                this.handleDocumentUpdate(changeDocument);
                break;
            case "replace":
                this.handleDocumentReplace(changeDocument);
                break;
            case "delete":
                this.handleDocumentDelete(changeDocument);
                break;
        }
    }

    protected handleDocumentInsert(changeDocument: ChangeStreamInsertDocument<Schema>) {
        this.logger.logDebug({ title: `${this.className} @${this.collection.namespace}`, message: "Document inserted" }, { extra: { changeDocument } });
    }

    protected handleDocumentUpdate(changeDocument: ChangeStreamUpdateDocument<Schema>) {
        this.logger.logDebug({ title: `${this.className} @${this.collection.namespace}`, message: "Document updated" }, { extra: { changeDocument } });
    }

    protected handleDocumentReplace(changeDocument: ChangeStreamReplaceDocument<Schema>) {
        this.logger.logDebug({ title: `${this.className} @${this.collection.namespace}`, message: "Document replaced" }, { extra: { changeDocument } });
    }

    protected handleDocumentDelete(changeDocument: ChangeStreamDeleteDocument<Schema>) {
        this.logger.logDebug({ title: `${this.className} @${this.collection.namespace}`, message: "Document deleted" }, { extra: { changeDocument } });
    }

    protected handleError(error: Error) {
        this.logger.logError({ title: `${this.className} @${this.collection.namespace}`, message: error });
    }

    private healthCheck() {
        if (this.changeStream.closed) {
            this.resetChangeStream();
        }

        setTimeout(this.healthCheck, 1_000);
    }

    private resetChangeStream() {
        this.stopListening();

        const changeStream = this.collection.watch(this.changeStream.pipeline, { ...CHANGE_STREAM_OPTIONS, resumeAfter: this.changeStream.resumeToken });

        try {
            this.changeStream.close();
        } catch {
            //
        }

        this.changeStream = changeStream;
        this.startListening();

        this.logger.logWarning({ title: `${this.className} @${this.collection.namespace}`, message: "Change stream has been reinitiated" });
    }
}
