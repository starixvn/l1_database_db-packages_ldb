import type {
    AggregationLastStages,
    AggregationStages,
    ChangeStreamSplitLargeEventStage,
    ChangeStreamStage,
    CollectionAggregationStages,
    DatabaseAggregationStages,
} from "./stages.js";

export type CollectionAggregationPipeline =
    | AggregationStages[] //
    | [...AggregationStages[], AggregationLastStages]
    | [CollectionAggregationStages, ...AggregationStages[]]
    | [CollectionAggregationStages, ...AggregationStages[], AggregationLastStages]
    | [ChangeStreamStage, ...AggregationStages[]]
    | [ChangeStreamStage, ...AggregationStages[], ChangeStreamSplitLargeEventStage];

export type DatabaseAggregationPipeline =
    | [DatabaseAggregationStages, ...AggregationStages[]] //
    | [DatabaseAggregationStages, ...AggregationStages[], AggregationLastStages]
    | [ChangeStreamStage, ...AggregationStages[]]
    | [ChangeStreamStage, ...AggregationStages[], ChangeStreamSplitLargeEventStage];
