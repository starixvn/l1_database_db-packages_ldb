import type { Document } from "mongodb";
import type { DatabaseAggregationPipeline } from "../aggregation/pipelines.js";

declare module "mongodb" {
    interface Db {
        /**
         * > **IMPORTANT: To enable autocomplete, set the 3rd parameter to `null`**
         * > ```js
         * > db.aggregate([{$<autocompletion>}], {}, null);
         * > ```
         *
         * Execute an aggregation framework pipeline against the database.
         *
         * @param pipeline - An array of aggregation stages to be executed
         * @param options - Optional settings for the command
         *
         * @see https://www.mongodb.com/docs/manual/reference/method/db.aggregate/
         */
        aggregate<T extends Document = Document>(
            pipeline?: DatabaseAggregationPipeline, //
            options?: AggregateOptions,
            _?: null,
        ): AggregationCursor<T>;
    }
}

export {};
