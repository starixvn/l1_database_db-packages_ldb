import type { Document } from "mongodb";
import type { CollectionAggregationPipeline } from "../aggregation/pipelines.js";

declare module "mongodb" {
    interface Collection {
        /**
         * > **IMPORTANT: To enable autocomplete, set the 3rd parameter to `null`**
         * > ```js
         * > collection.aggregate([{$<autocompletion>}], {}, null);
         * > ```
         *
         * Execute an aggregation framework pipeline against the collection, needs MongoDB \>= 2.2
         *
         * @param pipeline - An array of aggregation pipelines to execute
         * @param options - Optional settings for the command
         *
         * @see https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/
         */
        aggregate<T extends Document = Document>(
            pipeline?: CollectionAggregationPipeline, //
            options?: AggregateOptions,
            _?: null,
        ): AggregationCursor<T>;
    }
}

export {};
