import type { Binary, ChangeStreamNameSpace, Document, Filter, ResumeToken, Timestamp } from "mongodb";
import type { ArrayExpr, Expr, ObjectExpr } from "./expressions.js";
import type { AccumulatorAggOps, DateUnit, SortOrder, WindowOps } from "./operators.js";
import type { DescendVar, KeepVar, PruneVar, UserVarName } from "./variables.js";

/**
 * `db.collection.aggregate()` First Stages
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/#db.collection.aggregate---stages
 */
export type CollectionAggregationStages =
    | CollStatsStage //
    | DocumentsStage
    | IndexStatsStage
    | ListSessions
    | PlanCacheStatsStage;

/**
 * `db.collection.aggregate()` Stages
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/#db.collection.aggregate---stages
 */
export type AggregationStages =
    | AddFieldsStage
    | BucketStage
    | BucketAutoStage
    | CountStage
    | DensifyStage
    | FacetStage
    | FillStage
    | GeoNearStage
    | GraphLookupStage
    | GroupStage
    | LimitStage
    | LookupStage
    | MatchStage
    | ProjectStage
    | RedactStage
    | ReplaceRootStage
    | ReplaceWithStage
    | SampleStage
    | SetStage
    | SetWindowsFieldsStage
    | SkipStage
    | SortStage
    | SortByCountStage
    | UnionWithStage
    | UnsetStage
    | UnwindStage;

/**
 * Aggregation Last Stages
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/#db.collection.aggregate---stages
 */
export type AggregationLastStages =
    | MergeStage //
    | OutStage;

/**
 * Atlas Aggregation Stages
 */
export type AtlasAggregationStages =
    | ListSearchIndexesStage //
    | VectorSearchStage
    | SearchStage
    | SearchMetaStage;

/**
 * Adds new fields to documents. `$addFields` outputs documents that contain all existing fields from the input documents and newly added fields.
 *
 * The [`$addFields`][1] stage is equivalent to a [`$project`][2] stage that explicitly specifies all existing fields in the input documents and adds the new fields.
 *
 * [1]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/addFields/
 * [2]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/addFields/
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/
 */
export type AddFieldsStage = { $addFields: Record<string, Expr> };

/**
 * Categorizes incoming documents into groups, called buckets, based on a specified expression and bucket boundaries and outputs a document per each bucket. Each output document contains an `_id` field whose value specifies the inclusive lower bound of the bucket. The output option specifies the fields included in each output document.
 *
 * [`$bucket`][1] only produces output documents for buckets that contain at least one input document.
 *
 * [1]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucket/
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucket/
 */
export type BucketStage = {
    $bucket: {
        groupBy: Expr;
        boundaries: [Expr, Expr, ...Expr[]];
        default?: unknown;
        output?: Record<string, AccumulatorAggOps>;
    };
};

/**
 * A string that specifies the [preferred number series][1] to use to ensure that the calculated boundary edges end on preferred round numbers or their powers of 10.
 *
 * [1]: https://en.wikipedia.org/wiki/Preferred_number
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucketAuto/
 */
export type Granularity = "R5" | "R10" | "R20" | "R40" | "R80" | "1-2-5" | "E6" | "E12" | "E24" | "E48" | "E96" | "E192" | "POWERSOF2";

/**
 * Categorizes incoming documents into a specific number of groups, called buckets, based on a specified expression. Bucket boundaries are automatically determined in an attempt to evenly distribute the documents into the specified number of buckets.
 *
 * Each bucket is represented as a document in the output. The document for each bucket contains:
 * - An `_id` object that specifies the bounds of the bucket.
 *   - The `_id.min` field specifies the inclusive lower bound for the bucket.
 *   - The `_id.max` field specifies the upper bound for the bucket. This bound is exclusive for all buckets except the final bucket in the series, where it is inclusive.
 * - A `count` field that contains the number of documents in the bucket. The `count` field is included by default when the `output` document is not specified.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucketAuto/
 */
export type BucketAutoStage = {
    $bucketAuto: {
        groupBy: Expr;
        buckets: number;
        output?: Record<string, AccumulatorAggOps>;
        granularity?: Granularity;
    };
};

/**
 * Returns a **Change Stream** cursor on a collection, a database, or an entire cluster. Must be used as the first stage in an aggregation pipeline.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/changeStream/
 */
export type ChangeStreamStage = {
    $changeStream: {
        allChangesForCluster?: boolean;
        fullDocument?: "default" | "required" | "updateLookup" | "whenAvailable";
        fullDocumentBeforeChange?: "off" | "whenAvailable" | "required";
        showExpandedEvents?: boolean;
    } & (
        | { resumeAfter?: ResumeToken } //
        | { startAfter?: ResumeToken }
        | { startAtOperationTime?: Timestamp | Date }
    );
};

/**
 * If a [change stream][1] has large events that exceed 16 MB, a `BSONObjectTooLarge` exception is returned. Starting in MongoDB 7.0 (and 6.0.9), you can use a `$changeStreamSplitLargeEvent` stage to split the events into smaller fragments.
 *
 * You can only have one `$changeStreamSplitLargeEvent` stage in your pipeline, and it must be the last stage. You can only use `$changeStreamSplitLargeEvent` in a `$changeStream` pipeline.
 *
 * [1]: https://www.mongodb.com/docs/manual/changeStreams/#std-label-changeStreams
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/changeStreamSplitLargeEvent/
 */
export type ChangeStreamSplitLargeEventStage = { $changeStreamSplitLargeEvent: Record<never, never> };

/**
 * Returns statistics regarding a collection or view.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/collStats/
 */
export type CollStatsStage = {
    $collStats: {
        latencyStats?: { histograms: boolean };
        storageStats?: { scale: number };
        count: Record<never, never>;
        queryExecStats: Record<never, never>;
    };
};

/**
 * Passes a document to the next stage that contains a count of the number of documents input to the stage.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/count/
 */
export type CountStage = { $count: string };

/**
 * Creates new documents in a sequence of documents where certain values in a field are missing.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/densify/
 */
export type DensifyStage = {
    $densify: {
        field: string;
        partitionByFields?: string[];
        range: {
            step: number;
            unit?: DateUnit;
            bounds: "full" | "partition" | [number, number] | [Date, Date];
        };
    };
};

/**
 * Returns literal documents from input values.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/documents/
 */
export type DocumentsStage = { $documents: ArrayExpr };

/**
 * Processes multiple [aggregation pipelines][1] within a single stage on the same set of input documents. Each sub-pipeline has its own field in the output document where its results are stored as an array of documents.
 *
 * [1]: https://www.mongodb.com/docs/manual/core/aggregation-pipeline/#std-label-aggregation-pipeline
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/facet/
 */
export type FacetStage = { $facet: Record<string, Exclude<AggregationStages, FacetStage | GeoNearStage>[]> };

/**
 * Populates null and missing field values within documents.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/fill/
 */
export type FillStage = {
    $fill: ({ partitionBy?: Expr } | { partitionByFields?: [string, ...string[]] }) & {
        sortBy?: Record<string, SortOrder>;
        output: Record<string, { value: Expr } | { method: "linear" | "locf" }>;
    };
};

/** @todo */
export type GeoPosition = [number, number];
export type GeoPoint = { type: "Point"; coordinates: GeoPosition };
export type GeoLineString = { type: "LineString"; coordinates: [GeoPosition, GeoPosition, ...GeoPosition[]] };
export type GeoPolygonRing = [GeoPosition, GeoPosition, GeoPosition, GeoPosition, ...GeoPosition[]];
export type GeoPolygon = { type: "Polygon"; coordinates: [GeoPolygonRing, ...GeoPolygonRing[]] };
export type GeoMultiPoint = { type: "MultiPoint"; coordinates: [GeoPoint["coordinates"], ...GeoPoint["coordinates"][]] };
export type GeoMultiLineString = { type: "MultiLineString"; coordinates: [GeoLineString["coordinates"], ...GeoLineString["coordinates"][]] };
export type GeoMultiPolygon = { type: "MultiPolygon"; coordinates: [GeoPolygon["coordinates"], ...GeoPolygon["coordinates"][]] };
export type GeoGeometryCollection = { type: "GeometryCollection"; geometries: GeoJSON[] };
export type GeoJSON = GeoPoint | GeoLineString | GeoPolygon | GeoMultiPoint | GeoMultiLineString | GeoMultiPolygon | GeoGeometryCollection;
export type CoordinatePairArray = [number, number];
export type CoordinatePairDocument<X extends string, Y extends string> = { [x in X]: number } & { [y in Y]: number };

/**
 * Outputs documents in order of nearest to farthest from a specified point.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/geoNear/
 */
export type GeoNearStage = {
    $geoNear: {
        distanceField: string;
        distanceMultiplier?: number;
        includeLocs?: string;
        key?: string;
        maxDistance?: number;
        minDistance?: number;
        near: GeoJSON | CoordinatePairArray | CoordinatePairDocument<string, string>;
        query?: Filter<Document>;
        spherical?: boolean;
    };
};

/**
 * Performs a recursive search on a collection, with options for restricting the search by recursion depth and query filter.
 *
 * The `$graphLookup` search process is summarized below:
 *   1. Input documents flow into the `$graphLookup` stage of an aggregation operation.
 *   1. `$graphLookup` targets the search to the collection designated by the `from` parameter (see below for full list of search parameters).
 *   1. For each input document, the search begins with the value designated by `startWith`.
 *   1. `$graphLookup` matches the `startWith` value against the field designated by `connectToField` in other documents in the `from` collection.
 *   1. For each matching document, `$graphLookup` takes the value of the `connectFromField` and checks every document in the `from` collection for a matching `connectToField` value. For each match, `$graphLookup` adds the matching document in the `from` collection to an array field named by the `as` parameter.
 *
 *      This step continues recursively until no more matching documents are found, or until the operation reaches a recursion depth specified by the `maxDepth` parameter. `$graphLookup` then appends the array field to the input document. `$graphLookup` returns results after completing its search on all input documents.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/graphLookup/
 */
export type GraphLookupStage = {
    $graphLookup: {
        from: string;
        startWith: Expr;
        connectFromField: string;
        connectToField: string;
        as: string;
        maxDepth?: number;
        depthField?: string;
        restrictSearchWithMatch?: Document;
    };
};

/**
 * The `$group` stage separates documents into groups according to a "group key". The output is one document for each unique group key.
 *
 * A group key is often a field, or group of fields. The group key can also be the result of an expression. Use the `_id` field in the `$group` pipeline stage to set the group key. See below for [usage examples][1].
 *
 * In the `$group` stage output, the `_id` field is set to the group key for that document.
 *
 * The output documents can also contain additional fields that are set using [accumulator expressions][2].
 *
 * [1]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#std-label-ex-agg-group-stage
 * [2]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#std-label-accumulators-group
 *
 * @todo This type is not safe due to TypeScript limitation, only provides auto-complete
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/
 */
export type GroupStage = {
    $group: { _id: Expr } & Record<
        string,
        | AccumulatorAggOps //
        | (unknown & Record<never, never>)
    >;
};

/**
 * Returns statistics regarding the use of each index for the collection. If running with [access control][1], authenticate as a user with at least the [`clusterMonitor`][2] role.
 *
 * [1]: https://www.mongodb.com/docs/manual/core/authorization/#std-label-authorization
 * [2]: https://www.mongodb.com/docs/manual/reference/built-in-roles/#mongodb-authrole-clusterMonitor
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/indexStats/
 */
export type IndexStatsStage = { $indexStats: Record<never, never> };

/**
 * Limits the number of documents passed to the next stage in the [pipeline][1].
 *
 * [1]: https://www.mongodb.com/docs/manual/reference/glossary/#std-term-pipeline
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/limit/
 */
export type LimitStage = { $limit: number };

/**
 * Returns sampled queries for all collections or a specific collection. Sampled queries are used by the `analyzeShardKey` command to calculate metrics about the read and write distribution of a shard key.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/listSampledQueries/
 */
export type ListSampledQueriesStage = { $listSampledQueries: { namespace?: string } };

/**
 * Returns information about existing [Atlas Search indexes][1] on a specified collection.
 *
 * [1]: https://www.mongodb.com/docs/atlas/atlas-search/atlas-search-overview/#fts-indexes
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/listSearchIndexes/
 */
export type ListSearchIndexesStage = { $listSearchIndexes: { id?: string; name?: string } };

/**
 * Lists all sessions stored in the [`system.sessions`][1] collection in the `config` database. These sessions are visible to all members of the MongoDB deployment.
 *
 * [1]: https://www.mongodb.com/docs/manual/reference/config-database/#mongodb-data-config.system.sessions
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/listSessions/
 */
export type ListSessions = {
    $listSessions:
        | Record<never, never> //
        | { users: { user: string; db: string }[] }
        | { allUsers: true };
};

/**
 * Performs a left outer join to a collection in the _same_ database to filter in documents from the "joined" collection for processing. The [`$lookup`][1] stage adds a new array field to each input document. The new array field contains the matching documents from the "joined" collection. The [`$lookup`][1] stage passes these reshaped documents to the next stage.
 *
 * Starting in MongoDB 5.1, you can use [`$lookup`][1] with sharded collections.
 *
 * To combine elements from two different collections, use the [`$unionWith`][2] pipeline stage.
 *
 * [1]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup
 * [2]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/unionWith/#mongodb-pipeline-pipe.-unionWith
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/
 */
export type LookupStage = {
    $lookup:
        | {
              from: string;
              localField: string;
              foreignField: string;
              as: string;
              let?: Record<UserVarName, Expr>;
              pipeline?: AggregationStages[];
          }
        | {
              from: string;
              let?: Record<UserVarName, Expr>;
              pipeline: AggregationStages[];
              as: string;
          };
};

/**
 * Filters documents based on a specified [query predicate][1]. Matched documents are passed to the next pipeline stage.
 *
 * [1]: https://www.mongodb.com/docs/manual/reference/glossary/#std-term-query-predicate
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/
 */
export type MatchStage = { $match: Filter<Document> };

/**
 * Writes the results of the [aggregation pipeline][1] to a specified collection. The [`$merge`][2] operator must be the last stage in the pipeline.
 *
 * The [`$merge`][2] stage:
 * - Can output to a collection in the same or different database.
 * - Can output to the same collection that is being aggregated. For more information, see [Output to the Same Collection that is Being Aggregated][3].
 * - Consider the following points when using [`$merge`][2] or [`$out`][4] stages in an [aggregation pipeline][1]:
 *   - Starting in MongoDB 5.0, pipelines with a `$merge` stage can run on replica set [secondary][5] nodes if all the nodes in the cluster have the [featureCompatibilityVersion][6] set to `5.0` or higher and the [read preference][7] allows secondary reads.
 *     - `$merge` and `$out` stages run on secondary nodes, but write operations are sent to the [primary][8] node.
 *     - Not all driver versions support `$merge` operations sent to the secondary nodes. For details, see the [driver][9] documentation.
 *   - In earlier MongoDB versions, pipelines with `$out` or `$merge` stages always run on the primary node and read preference isn't considered.
 * - Creates a new collection if the output collection does not already exist.
 * - Can incorporate results (insert new documents, merge documents, replace documents, keep existing documents, fail the operation, process documents with a custom update pipeline) into an existing collection.
 * - Can output to a sharded collection. Input collection can also be sharded.
 *
 * For a comparison with the [`$out`][4] stage which also outputs the aggregation results to a collection, see [`$merge` and `$out` Comparison][10].
 *
 * [1]: https://www.mongodb.com/docs/manual/core/aggregation-pipeline/#std-label-aggregation-pipeline
 * [2]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge
 * [3]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/#std-label-merge-behavior-same-collection
 * [4]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out
 * [5]: https://www.mongodb.com/docs/manual/reference/glossary/#std-term-secondary
 * [6]: https://www.mongodb.com/docs/manual/reference/command/setFeatureCompatibilityVersion/#std-label-view-fcv
 * [7]: https://www.mongodb.com/docs/manual/core/read-preference/#std-label-read-preference
 * [8]: https://www.mongodb.com/docs/manual/reference/glossary/#std-term-primary
 * [9]: https://www.mongodb.com/docs/drivers/
 * [10]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/#std-label-merge-out-comparison
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/
 */
export type MergeStage = {
    $merge: {
        into: string | ChangeStreamNameSpace;
        on?: string | string[];
        let?: Record<UserVarName, Expr>;
        whenMatched?:
            | "replace" //
            | "keepExisting"
            | "merge"
            | "fail"
            | (AddFieldsStage | SetStage | ProjectStage | UnsetStage | ReplaceRootStage | ReplaceWithStage)[];
        whenNotMatched?: "insert" | "discard" | "fail";
    };
};

/**
 * Takes the documents returned by the aggregation pipeline and writes them to a specified collection. You can specify the output database.
 *
 * The `$out` stage must be _the last stage_ in the pipeline. The `$out` operator lets the aggregation framework return result sets of any size.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/
 */
export type OutStage = {
    $out:
        | string
        | (ChangeStreamNameSpace & {
              timeseries?: {
                  timeField: string;
                  metaField?: string;
              } & (
                  | { granularity?: "seconds" | "minutes" | "hours" }
                  | {
                        bucketMaxSpanSeconds?: number;
                        bucketRoundingSeconds?: number;
                    }
              );
          });
};

/**
 * Returns [plan cache][1] information for a collection. The stage returns a document for each plan cache entry.
 *
 * [1]: https://www.mongodb.com/docs/manual/core/query-plans/#std-label-query-plans-query-optimization
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/planCacheStats/
 */
export type PlanCacheStatsStage = { $planCacheStats: { allHosts?: boolean } };

/**
 * Passes along the documents with the requested fields to the next stage in the pipeline. The specified fields can be existing fields from the input documents or newly computed fields.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/
 */
export type ProjectStage = { $project: Record<string, 0 | 1 | boolean | Expr> };

/**
 * Restricts entire documents or content within documents from being outputted based on information stored in the documents themselves.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/redact/
 */
export type RedactStage = { $redact: Expr | DescendVar | PruneVar | KeepVar };

/**
 * Replaces the input document with the specified document. The operation replaces all existing fields in the input document, including the `_id` field. You can promote an existing embedded document to the top level, or create a new document for promotion (see [example][1]).
 *
 * [1]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/replaceRoot/#std-label-new-replacement-doc
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/replaceRoot/
 */
export type ReplaceRootStage = { $replaceRoot: { newRoot: ObjectExpr } };

/**
 * Replaces the input document with the specified document. The operation replaces all existing fields in the input document, including the `_id` field. With [`$replaceWith`][1], you can promote an embedded document to the top-level. You can also specify a new document as the replacement.
 *
 * The [`$replaceWith`][1] stage performs the same action as the [`$replaceRoot`][2] stage, but the stages have different forms.
 *
 * [1]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/replaceWith/#mongodb-pipeline-pipe.-replaceWith
 * [2]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/replaceRoot/#mongodb-pipeline-pipe.-replaceRoot
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/replaceWith/
 */
export type ReplaceWithStage = { $replaceWith: ObjectExpr };

/**
 * Randomly selects the specified number of documents from the input documents.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/
 */
export type SampleStage = { $sample: { size: number } };

/**
 * The [`$search`][1] stage performs a full-text search on the specified field or fields. The field or fields must be covered by an Atlas Search [index][2].
 *
 * [1]: https://www.mongodb.com/docs/atlas/atlas-search/aggregation-stages/search/#mongodb-pipeline-pipe.-search
 * [2]: https://www.mongodb.com/docs/atlas/atlas-search/index-definitions/#std-label-ref-index-definitions
 *
 * @todo Atlas only
 * @see https://www.mongodb.com/docs/atlas/atlas-search/aggregation-stages/search/#mongodb-pipeline-pipe.-search
 */
export type SearchStage = { $search: unknown };

/**
 * The [`$searchMeta`][1] stage returns different [types of metadata result][2] documents.
 *
 * [1]: https://www.mongodb.com/docs/atlas/atlas-search/aggregation-stages/searchMeta/#mongodb-pipeline-pipe.-searchMeta
 * [2]: https://www.mongodb.com/docs/atlas/atlas-search/aggregation-stages/searchMeta/#std-label-fts-metadata-results
 *
 * @todo Atlas only
 * @see https://www.mongodb.com/docs/atlas/atlas-search/aggregation-stages/searchMeta/
 */
export type SearchMetaStage = { $searchMeta: unknown };

/**
 * Adds new fields to documents. `$set` outputs documents that contain all existing fields from the input documents and newly added fields.
 *
 * The [`$set`][1] stage is an alias for [`$addFields`][2].
 *
 * Both stages are equivalent to a [`$project`][3] stage that explicitly specifies all existing fields in the input documents and adds the new fields.
 *
 * [1]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set
 * [2]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields
 * [3]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/
 */
export type SetStage = { $set: Record<string, Expr> };

export type Boundary = number | "current" | "unbounded";
/**
 * Performs operations on a specified span of documents in a collection, known as a window, and returns the results based on the chosen [window operator][1].
 *
 * For example, you can use the [`$setWindowFields`][2] stage to output the:
 *   - Difference in sales between two documents in a collection.
 *   - Sales rankings.
 *   - Cumulative sales totals.
 *   - Analysis of complex time series information without exporting the data to an external database.
 *
 * [1]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#std-label-setWindowFields-window-operators
 * [2]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/
 */
export type SetWindowsFieldsStage = {
    $setWindowFields: {
        partitionBy: Expr;
        sortBy?: Record<string, SortOrder>;
        output: Record<
            string,
            WindowOps & {
                window?: {
                    documents?: [Boundary, Boundary];
                    range?: [Boundary, Boundary];
                    unit?: DateUnit;
                };
            }
        >;
    };
};

/**
 * Skips over the specified number of [documents][1] that pass into the stage and passes the remaining documents to the next stage in the [pipeline][2].
 *
 * [1]: https://www.mongodb.com/docs/manual/reference/glossary/#std-term-document
 * [2]: https://www.mongodb.com/docs/manual/reference/glossary/#std-term-pipeline
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/skip/
 */
export type SkipStage = { $skip: number };

/**
 * Sorts all input documents and returns them to the pipeline in sorted order.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/sort/
 */
export type SortStage = { $sort: Record<string, SortOrder> };

/**
 * Groups incoming documents based on the value of a specified expression, then computes the count of documents in each distinct group.
 *
 * Each output document contains two fields: an `_id` field containing the distinct grouping value, and a `count` field containing the number of documents belonging to that grouping or category.
 *
 * The documents are sorted by `count` in descending order.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/sortByCount/#mongodb-pipeline-pipe.-sortByCount
 */
export type SortByCountStage = { $sortByCount: Expr };

/**
 * Combines two aggregations into a single result set. `$unionWith` outputs the combined result set (including duplicates) to the next stage.
 *
 * The order in which the combined result set documents are output is unspecified.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/unionWith/
 */
export type UnionWithStage = {
    $unionWith:
        | string
        | {
              coll: string;
              pipeline: CollectionAggregationStages[];
          };
};

/**
 * Removes/excludes fields from documents.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/unset/
 */
export type UnsetStage = { $unset: string | string[] };

/**
 * Deconstructs an array field from the input documents to output a document for _each_ element. Each output document is the input document with the value of the array field replaced by the element.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/unwind/
 */
export type UnwindStage = {
    $unwind:
        | string
        | {
              path: string;
              includeArrayIndex?: string;
              preserveNullAndEmptyArrays?: boolean;
          };
};

/**
 * The [`$vectorSearch`][1] stage performs an ANN or ENN search on a vector in the specified field.
 *
 * [1]: https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-stage/#mongodb-pipeline-pipe.-vectorSearch
 *
 * @todo Atlas only
 * @see https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-stage/
 */
export type VectorSearchStage = { $vectorSearch: unknown };

/** `db.aggregate()` Stages
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/#db.aggregate---stages
 */
export type DatabaseAggregationStages =
    | CurrentOpStage //
    | DocumentsStage
    | ListSampledQueriesStage
    | ListLocalSessionsStage
    | QuerySettingsStage
    | QueryStatsStage;

/**
 * Returns a stream of documents containing information on active and/or dormant operations as well as inactive sessions that are holding locks as part of a transaction. The stage returns a document for each operation or session. To run `$currentOp`, use the `db.aggregate()` helper on the **admin** database.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/currentOp/
 */
export type CurrentOpStage = {
    $currentOp: {
        allUsers?: boolean;
        idleConnections?: boolean;
        idleCursors?: boolean;
        idleSessions?: boolean;
        localOps?: boolean;
        targetAllNodes?: boolean;
    };
};

/**
 * Lists the sessions cached in memory by the **mongod** or **mongos** instance.
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/listLocalSessions/
 */
export type ListLocalSessionsStage = {
    $listLocalSessions:
        | Record<never, never> //
        | { users: { user: string; db: string }[] }
        | { allUsers: true };
};

/**
 * Returns query settings previously added with [setQuerySettings][1]. The settings apply to the entire cluster. The cluster retains the settings after shutdown.
 *
 * [1]: https://www.mongodb.com/docs/manual/reference/command/setQuerySettings/#mongodb-dbcommand-dbcmd.setQuerySettings
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/querySettings/
 */
export type QuerySettingsStage = { $querySettings: { showDebugQueryShape?: boolean } };

/**
 * Returns runtime statistics for recorded queries.
 *
 * `$queryStats` collects and reports metrics for [`aggregate()`][1], [`find()`][2], and [`distinct()`][3] queries. $queryStats does not collect information for queries that use [Queryable Encryption][4].
 *
 * [1]: https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/#mongodb-method-db.collection.aggregate
 * [2]: https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find
 * [3]: https://www.mongodb.com/docs/manual/reference/method/db.collection.distinct/#mongodb-method-db.collection.distinct
 * [4]: https://www.mongodb.com/docs/manual/core/queryable-encryption/#std-label-qe-manual-feature-qe
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/queryStats/
 */
export type QueryStatsStage = {
    $queryStats: {
        transformIdentifiers?: { algorithm: "hmac-sha-256"; hmacKey: Binary };
    };
};

/** Update Aggregation Stages */
export type UpdateAggregationStages =
    | AddFieldsStage //
    | SetStage
    | ProjectStage
    | UnsetStage
    | ReplaceRootStage
    | ReplaceWithStage;
