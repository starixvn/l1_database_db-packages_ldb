import type { Code } from "bson";
import type { ArrayExpr, BinaryExpr, BooleanExpr, DateExpr, Expr, NumberExpr, ObjectExpr, ObjectIdExpr, RegexExpr, StringExpr, TimestampExpr } from "./expressions.js";
import type { UserVarName } from "./variables.js";
import type { SortDirection } from "mongodb";

/** Arithmetic Expression Operators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#arithmetic-expression-operators
 */
export type ArithmeticOps = AbsOp | AddOp | CeilOp | DivideOp | ExpOp | FloorOp | LnOp | LogOp | Log10Op | ModOp | MultiplyOp | PowOp | RoundOp | SqrtOp | SubtractOp | TruncOp;

export type AbsOp = { $abs: NumberExpr };
/** @todo Check if first 2 mandatory */
export type AddOp = AddOpNumber | AddOpDate;
export type AddOpNumber = { $add: [NumberExpr, NumberExpr, ...NumberExpr[]] };
export type AddOpDate = { $add: [NumberExpr | DateExpr, NumberExpr | DateExpr, ...(NumberExpr | DateExpr)[]] };
export type CeilOp = { $ceil: NumberExpr };
/** @todo Check if first 2 mandatory */
export type DivideOp = { $divide: [NumberExpr, NumberExpr, ...NumberExpr[]] };
export type ExpOp = { $exp: NumberExpr };
export type FloorOp = { $floor: NumberExpr };
export type LnOp = { $ln: NumberExpr };
export type LogOp = { $log: [NumberExpr, NumberExpr] };
export type Log10Op = { $log10: NumberExpr };
export type ModOp = { $mod: [NumberExpr, NumberExpr] };
/** @todo Check if first 2 mandatory */
export type MultiplyOp = { $multiply: [NumberExpr, NumberExpr, ...NumberExpr[]] };
export type PowOp = { $pow: [NumberExpr, NumberExpr] };
export type RoundOp = { $round: [NumberExpr, NumberExpr?] };
export type SqrtOp = { $sqrt: NumberExpr };
export type SubtractOp = SubtractOpNumber | SubtractOpDate;
export type SubtractOpNumber = { $subtract: [NumberExpr, NumberExpr] | [DateExpr | DateExpr] };
export type SubtractOpDate = { $subtract: [DateExpr, NumberExpr] };
export type TruncOp = { $trunc: [NumberExpr, NumberExpr?] };

/** Array Expression Operators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#array-expression-operators
 */
export type ArrayOps =
    | ArrayElemAtOp
    | ArrayToObjectOp
    | ConcatArraysOp
    | FilterOp
    | FirstNOp
    | InAggOp
    | IndexOfArrayOp
    | IsArrayOp
    | LastNOp
    | MapOp
    | MaxNOp
    | MinNOp
    | ObjectToArrayOp
    | RangeOp
    | ReduceOp
    | ReverseArrayOp
    | SizeOp
    | SliceOp
    | SortArrayOp
    | ZipOp;

export type ArrayElemAtOp = { $arrayElemAt: [ArrayExpr, NumberExpr] };
export type ArrayToObjectOp = { $arrayToObject: [[StringExpr, Expr][]] | { k: StringExpr; v: Expr }[] };
/** @todo Check if first 2 mandatory */
export type ConcatArraysOp = { $concatArrays: [ArrayExpr, ArrayExpr, ...ArrayExpr[]] };
export type FilterOp = {
    $filter: {
        input: ArrayExpr;
        as?: UserVarName;
        cond: BooleanExpr;
        limit?: NumberExpr | null;
    };
};
export type FirstNOp = { $firstN: { n: NumberExpr; input: ArrayExpr } };
export type InAggOp = { $in: [Expr, ArrayExpr] };
export type IndexOfArrayOp = { $indexOfArray: [ArrayExpr, Expr, NumberExpr?, NumberExpr?] };
export type IsArrayOp = { $isArray: Expr };
export type LastNOp = { $lastN: { n: NumberExpr; input: ArrayExpr } };
export type MapOp = {
    $map: {
        input: ArrayExpr;
        as?: UserVarName;
        in: Expr;
    };
};
export type MaxNOp = { $maxN: { n: NumberExpr; input: ArrayExpr } };
export type MinNOp = { $minN: { n: NumberExpr; input: ArrayExpr } };
export type ObjectToArrayOp = { $objectToArray: ObjectExpr };
export type RangeOp = { $range: [NumberExpr, NumberExpr, NumberExpr?] };
export type ReduceOp = {
    $reduce: {
        input: ArrayExpr;
        initialValue: Expr;
        in: Expr;
    };
};
export type ReverseArrayOp = { $reverseArray: ArrayExpr };
export type SizeOp = { $size: ArrayExpr };
export type SliceOp = { $slice: [ArrayExpr, NumberExpr, NumberExpr?] };

export type SortArrayOp = {
    $sortArray: {
        input: ArrayExpr;
        sortBy: Record<string, SortDirection> | SortDirection;
    };
};
export type ZipOp = {
    $zip: {
        inputs: ArrayExpr[];
        useLongestLength?: boolean;
        defaults?: ArrayExpr;
    };
};

/** Bitwise Operators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#bitwise-operators
 */
export type BitwiseOps = BitAndOp | BitNotOp | BitOrOp | BitXorOp;

export type BitAndOp = { $bitAnd: [NumberExpr, NumberExpr, ...NumberExpr[]] };
export type BitNotOp = { $bitNot: NumberExpr };
export type BitOrOp = { $bitOr: [NumberExpr, NumberExpr, ...NumberExpr[]] };
export type BitXorOp = { $bitXor: [NumberExpr, NumberExpr, ...NumberExpr[]] };

/** Boolean Expression Operators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#boolean-expression-operators
 */
export type BooleanOps = AndOp | NotOp | OrOp;

export type AndOp = { $and: Expr[] };
export type NotOp = { $not: [Expr] };
export type OrOp = { $or: Expr[] };

/** Comparison Expression Operators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#comparison-expression-operators */
export type ComparisonOps = CmpOp | EqOp | GtOp | GteOp | LtOp | LteOp | NeOp;

export type CmpOp = { $cmp: [Expr, Expr] };
export type EqOp = { $eq: [Expr, Expr] };
export type GtOp = { $gt: [Expr, Expr] };
export type GteOp = { $gte: [Expr, Expr] };
export type LtOp = { $lt: [Expr, Expr] };
export type LteOp = { $lte: [Expr, Expr] };
export type NeOp = { $ne: [Expr, Expr] };

/** Conditional Expression Operators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#conditional-expression-operators
 */
export type ConditionalOps = CondOp | IfNullOp | SwitchOp;

export type CondOp = {
    $cond:
        | {
              if: BooleanExpr;
              then: Expr;
              else: Expr;
          }
        | [BooleanExpr, Expr, Expr];
};
export type IfNullOp = { $ifNull: Expr[] };
export type SwitchOp = {
    $switch: {
        branches: { case: Expr; then: Expr }[];
        default: Expr;
    };
};

/** Custom Aggregation Expression Operators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#custom-aggregation-expression-operators
 */
export type CustomAggOps = AccumulatorOp | FunctionOp;

export type AccumulatorOp = {
    $accumulator: {
        init: StringExpr | Code;
        initArgs?: Expr[];
        accumulate: StringExpr | Code;
        accumulateArgs: Expr[];
        merge: StringExpr | Code;
        finalize?: StringExpr | Code;
        lang: "js";
    };
};
export type FunctionOp = {
    $function: {
        body: StringExpr | Code;
        args: Expr[];
        lang: "js";
    };
};

/** Data Size Operators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#data-size-operators
 */
export type DataSizeOps = BinarySizeOp | BsonSizeOp;

export type BinarySizeOp = { $binarySize: StringExpr | BinaryExpr };
export type BsonSizeOp = { $bsonSize: ObjectExpr | null };

/** Date Expression Operators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#date-expression-operators
 */
export type DateOps =
    | DateAddOp
    | DateDiffOp
    | DateFromPartsOp
    | DateFromStringOp
    | DateSubtractOp
    | DateToPartsOp
    | DateToStringOp
    | DateTruncOp
    | DayOfMonthOp
    | DayOfWeekOp
    | DayOfYearOp
    | HourOp
    | IsoDayOfWeekOp
    | IsoWeekOp
    | IsoWeekYearOp
    | MillisecondOp
    | MinuteOp
    | MonthOp
    | SecondOp
    | ToDateOp
    | WeekOp
    | YearOp;

export type DateUnit = "year" | "quarter" | "week" | "month" | "day" | "hour" | "minute" | "second" | "millisecond";
export type StandardOffset =
    | "-12"
    | "-11"
    | "-10"
    | "-09"
    | "-08"
    | "-07"
    | "-06"
    | "-05"
    | "-04"
    | "-03"
    | "-02"
    | "-01"
    | "-00"
    | "+00"
    | "+01"
    | "+02"
    | "+03"
    | "+04"
    | "+05"
    | "+06"
    | "+07"
    | "+08"
    | "+09"
    | "+10"
    | "+11"
    | "+12"
    | "+13"
    | "+14";
export type Min30Offset = "-10" | "-09" | "-08" | "-04" | "-03" | "-02" | "-00" | "+00" | "+01" | "+02" | "+03" | "+04" | "+05" | "+06" | "+07" | "+08" | "+09" | "+10" | "+11";
export type Min45Offset = "+05" | "+08" | "+09" | "+12" | "+13";
export type SpecialOffset = "-00:44" | "-0044" | "-00:25:21" | "+00:20" | "+0020" | "+01:24" | "+0124" | "+04:51" | "+0451" | "+05:40" | "+0540" | "+07:20" | "+0720";
export type UtcOffset =
    | `${StandardOffset}:00`
    | `${StandardOffset}00`
    | StandardOffset
    | `${Min30Offset}:30`
    | `${Min30Offset}30`
    | `${Min45Offset}:45`
    | `${Min45Offset}45`
    | SpecialOffset;
export type DateAddOp = {
    $dateAdd: {
        startDate: DateExpr | TimestampExpr | ObjectIdExpr;
        unit: StringExpr | DateUnit;
        amount: NumberExpr;
        timezone?: StringExpr | UtcOffset;
    };
};
export type WeekDay = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export type WeekDayShort = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export type DateDiffOp = {
    $dateDiff:
        | {
              startDate: DateExpr | TimestampExpr | ObjectIdExpr;
              endDate: DateExpr | TimestampExpr | ObjectIdExpr;
              unit: StringExpr | DateUnit;
              timezone?: StringExpr | UtcOffset;
          }
        | {
              startDate: DateExpr | TimestampExpr | ObjectIdExpr;
              endDate: DateExpr | TimestampExpr | ObjectIdExpr;
              unit: StringExpr | "week";
              timezone?: StringExpr | UtcOffset;
              startOfWeek?: StringExpr | WeekDay | WeekDayShort;
          };
};
export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Day = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
export type IsoWeek =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 32
    | 33
    | 34
    | 35
    | 36
    | 37
    | 38
    | 39
    | 40
    | 41
    | 42
    | 43
    | 44
    | 45
    | 46
    | 47
    | 48
    | 49
    | 50
    | 51
    | 52
    | 53;
export type IsoDayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Hour = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;
export type Minute =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 32
    | 33
    | 34
    | 35
    | 36
    | 37
    | 38
    | 39
    | 40
    | 41
    | 42
    | 43
    | 44
    | 45
    | 46
    | 47
    | 48
    | 49
    | 50
    | 51
    | 52
    | 53
    | 54
    | 55
    | 56
    | 57
    | 58
    | 59;
export type Second = Minute;
export type DateFromPartsOp = {
    $dateFromParts:
        | {
              year: NumberExpr;
              month?: NumberExpr | Month;
              day?: NumberExpr | Day;
              hour?: NumberExpr | Hour;
              minute?: NumberExpr | Minute;
              second?: NumberExpr | Second;
              millisecond?: NumberExpr;
              timezone?: StringExpr | UtcOffset;
          }
        | {
              isoWeekYear: NumberExpr;
              isoWeek?: NumberExpr | IsoWeek;
              isoDayOfWeek?: NumberExpr | IsoDayOfWeek;
              hour?: NumberExpr | Hour;
              minute?: NumberExpr | Minute;
              second?: NumberExpr | Second;
              millisecond?: NumberExpr;
              timezone?: StringExpr | UtcOffset;
          };
};
export type DateFromStringOp = {
    $dateFromString: {
        dateString: StringExpr;
        format?: StringExpr;
        timezone?: StringExpr | UtcOffset;
        onError?: Expr;
        onNull?: Expr;
    };
};
export type DateSubtractOp = {
    $dateSubtract: {
        startDate: DateExpr | TimestampExpr | ObjectIdExpr;
        unit: StringExpr | DateUnit;
        amount: NumberExpr;
        timezone?: StringExpr | UtcOffset;
    };
};
export type DateToPartsOp = {
    $dateToParts: {
        date: DateExpr | TimestampExpr | ObjectIdExpr;
        timezone?: StringExpr | UtcOffset;
        iso8601?: boolean;
    };
};
export type DateToStringOp = {
    $dateToString: {
        date: DateExpr | TimestampExpr | ObjectIdExpr;
        format?: StringExpr;
        timezone?: StringExpr | UtcOffset;
        onNull?: Expr;
    };
};
export type DateTruncOp = {
    $dateTrunc: {
        date: DateExpr | TimestampExpr | ObjectIdExpr;
        unit: StringExpr | Exclude<DateUnit, "millisecond">;
        binSize: NumberExpr;
        timezone?: StringExpr | UtcOffset;
        startOfWeek?: StringExpr | WeekDay | WeekDayShort;
    };
};
export type DayOfMonthOp = {
    $dayOfMonth:
        | DateExpr
        | TimestampExpr
        | ObjectIdExpr
        | {
              date: DateExpr | TimestampExpr | ObjectIdExpr;
              timezone?: StringExpr | UtcOffset;
          };
};
export type DayOfWeekOp = {
    $dayOfWeek:
        | DateExpr
        | TimestampExpr
        | ObjectIdExpr
        | {
              date: DateExpr | TimestampExpr | ObjectIdExpr;
              timezone?: StringExpr | UtcOffset;
          };
};
export type DayOfYearOp = {
    $dayOfYear:
        | DateExpr
        | TimestampExpr
        | ObjectIdExpr
        | {
              date: DateExpr | TimestampExpr | ObjectIdExpr;
              timezone?: StringExpr | UtcOffset;
          };
};
export type HourOp = {
    $hour:
        | DateExpr
        | TimestampExpr
        | ObjectIdExpr
        | {
              date: DateExpr | TimestampExpr | ObjectIdExpr;
              timezone?: StringExpr | UtcOffset;
          };
};
export type IsoDayOfWeekOp = {
    $isoDayOfWeek:
        | DateExpr
        | TimestampExpr
        | ObjectIdExpr
        | {
              date: DateExpr | TimestampExpr | ObjectIdExpr;
              timezone?: StringExpr | UtcOffset;
          };
};
export type IsoWeekOp = {
    $isoWeek:
        | DateExpr
        | TimestampExpr
        | ObjectIdExpr
        | {
              date: DateExpr | TimestampExpr | ObjectIdExpr;
              timezone?: StringExpr | UtcOffset;
          };
};
export type IsoWeekYearOp = {
    $isoWeekYear:
        | DateExpr
        | TimestampExpr
        | ObjectIdExpr
        | {
              date: DateExpr | TimestampExpr | ObjectIdExpr;
              timezone?: StringExpr | UtcOffset;
          };
};
export type MillisecondOp = {
    $millisecond:
        | DateExpr
        | TimestampExpr
        | ObjectIdExpr
        | {
              date: DateExpr | TimestampExpr | ObjectIdExpr;
              timezone?: StringExpr | UtcOffset;
          };
};
export type MinuteOp = {
    $minute:
        | DateExpr
        | TimestampExpr
        | ObjectIdExpr
        | {
              date: DateExpr | TimestampExpr | ObjectIdExpr;
              timezone?: StringExpr | UtcOffset;
          };
};
export type MonthOp = {
    $month:
        | DateExpr
        | TimestampExpr
        | ObjectIdExpr
        | {
              date: DateExpr | TimestampExpr | ObjectIdExpr;
              timezone?: StringExpr | UtcOffset;
          };
};
export type SecondOp = {
    $second:
        | DateExpr
        | TimestampExpr
        | ObjectIdExpr
        | {
              date: DateExpr | TimestampExpr | ObjectIdExpr;
              timezone?: StringExpr | UtcOffset;
          };
};
export type ToDateOp = { $toDate: Expr };
export type WeekOp = {
    $week:
        | DateExpr
        | TimestampExpr
        | ObjectIdExpr
        | {
              date: DateExpr | TimestampExpr | ObjectIdExpr;
              timezone?: StringExpr | UtcOffset;
          };
};
export type YearOp = {
    $year:
        | DateExpr
        | TimestampExpr
        | ObjectIdExpr
        | {
              date: DateExpr | TimestampExpr | ObjectIdExpr;
              timezone?: StringExpr | UtcOffset;
          };
};

/** Literal Expression Operator
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#literal-expression-operator
 */
export type LiteralOps = LiteralOp;

export type LiteralOp = { $literal: Expr };

/** Miscellaneous Operators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#miscellaneous-operators */
export type MiscOps = GetFieldOp | RandOp | SampleRateOp | ToHashedIndexKeyOp;

export type GetFieldOp = {
    $getField: {
        field: StringExpr;
        input: ObjectExpr;
    };
};
export type RandOp = { $rand: Record<never, never> };
export type SampleRateOp = { $sampleRate: number };
export type ToHashedIndexKeyOp = { $toHashedIndexKey: Expr };

/** Object Expression Operators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#object-expression-operators
 */
export type ObjectOps = MergeObjectsOp | ObjectToArrayOp | SetFieldOp | UnsetFieldOp;

export type MergeObjectsOp = { $mergeObjects: ObjectExpr[] };
export type SetFieldOp = {
    $setField: {
        field: StringExpr;
        input: ObjectExpr | null | undefined;
        value: Expr;
    };
};
export type UnsetFieldOp = {
    $unsetField: {
        field: StringExpr;
        input: ObjectExpr | null | undefined;
    };
};

/** Set Expression Operators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#set-expression-operators */
export type SetOps = AllElementsTrueOp | AnyElementTrueOp | SetDifferenceOp | SetEqualsOp | SetIntersectionOp | SetIsSubsetOp | SetUnionOp;

export type AllElementsTrueOp = { $allElementsTrue: ArrayExpr[] };
export type AnyElementTrueOp = { $anyElementTrue: ArrayExpr[] };
export type SetDifferenceOp = { $setDifference: [ArrayExpr, ArrayExpr] };
export type SetEqualsOp = { $setEquals: [ArrayExpr, ArrayExpr, ...ArrayExpr[]] };
export type SetIntersectionOp = { $setIntersection: [ArrayExpr, ArrayExpr, ...ArrayExpr[]] };
export type SetIsSubsetOp = { $setIsSubset: [ArrayExpr, ArrayExpr] };
export type SetUnionOp = { $setUnion: [ArrayExpr, ArrayExpr, ...ArrayExpr[]] };

/** String Expression Operators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#string-expression-operators
 */
export type StringOps =
    | ConcatOp
    | DateFromStringOp
    | DateToStringOp
    | IndexOfBytesOp
    | IndexOfCPOp
    | LtrimOp
    | RegexFindOp
    | RegexFindAllOp
    | RegexMatchOp
    | ReplaceOneOp
    | ReplaceAllOp
    | RtrimOp
    | SplitOp
    | StrLenBytesOp
    | StrLenCPOp
    | StrcasecmpOp
    | SubstrOp
    | SubstrBytesOp
    | SubstrCPOp
    | ToLowerOp
    | ToStringOp
    | TrimOp
    | ToUpperOp;

export type ConcatOp = { $concat: [StringExpr, StringExpr, ...StringExpr[]] };
export type IndexOfBytesOp = { $indexOfBytes: [StringExpr, StringExpr, NumberExpr?, NumberExpr?] };
export type IndexOfCPOp = { $indexOfCP: [StringExpr, StringExpr, NumberExpr?, NumberExpr?] };
export type LtrimOp = { $ltrim: { input: StringExpr; chars?: StringExpr } };
export type RegexOption = "i" | "m" | "x" | "s";
export type RegexOptions = RegexOption | `${RegexOption}${RegexOption}`;
export type RegexFindOp = { $regexFind: { input: StringExpr; regex: StringExpr | RegexExpr; options?: RegexOptions } };
export type RegexFindAllOp = { $regexFindAll: { input: StringExpr; regex: StringExpr | RegexExpr; options?: RegexOptions } };
export type RegexMatchOp = { $regexMatch: { input: StringExpr; regex: StringExpr | RegexExpr; options?: RegexOptions } };
export type ReplaceOneOp = { $replaceOne: { input: StringExpr; find: StringExpr; replacement: StringExpr } };
export type ReplaceAllOp = { $replaceAll: { input: StringExpr; find: StringExpr; replacement: StringExpr } };
export type RtrimOp = { $rtrim: { input: StringExpr; chars?: StringExpr } };
export type SplitOp = { $split: [StringExpr, StringExpr] };
export type StrLenBytesOp = { $strLenBytes: StringExpr };
export type StrLenCPOp = { $strLenCP: StringExpr };
export type StrcasecmpOp = { $strcasecmp: [StringExpr, StringExpr] };
/** @deprecated */
export type SubstrOp = { $substr: [StringExpr, NumberExpr, NumberExpr] };
export type SubstrBytesOp = { $substrBytes: [StringExpr, NumberExpr, NumberExpr] };
export type SubstrCPOp = { $substrCP: [StringExpr, NumberExpr, NumberExpr] };
export type ToLowerOp = { $toLower: StringExpr };
export type ToStringOp = { $toString: Expr };
export type TrimOp = { $trim: { input: StringExpr; chars?: StringExpr } };
export type ToUpperOp = { $toUpper: StringExpr };

/** Text Expression Operator
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#text-expression-operator
 */
export type TextOps = MetaOp;

export type MetaOp = { $meta: "textScore" | "indexKey" | "searchScore" | "searchHighlights" | "searchSequenceToken" };

/** Timestamp Expression Operators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#timestamp-expression-operators
 */
export type TimestampOp = TsIncrementOp | TsSecondOp;

export type TsIncrementOp = { $tsIncrement: TimestampExpr };
export type TsSecondOp = { $tsSecond: TimestampExpr };

/** Trigonometry Expression Operators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#trigonometry-expression-operators
 */
export type TrigonometryOps =
    | SinOp
    | CosOp
    | TanOp
    | AsinOp
    | AcosOp
    | AtanOp
    | Atan2Op
    | AsinhOp
    | AcoshOp
    | AtanhOp
    | SinhOp
    | CoshOp
    | TanhOp
    | DegreesToRadiansOp
    | RadiansToDegreesOp;

export type SinOp = { $sin: NumberExpr };
export type CosOp = { $cos: NumberExpr };
export type TanOp = { $tan: NumberExpr };
export type AsinOp = { $asin: NumberExpr };
export type AcosOp = { $acos: NumberExpr };
export type AtanOp = { $atan: NumberExpr };
export type Atan2Op = { $atan2: NumberExpr };
export type AsinhOp = { $asinh: NumberExpr };
export type AcoshOp = { $acosh: NumberExpr };
export type AtanhOp = { $atanh: NumberExpr };
export type SinhOp = { $sinh: NumberExpr };
export type CoshOp = { $cosh: NumberExpr };
export type TanhOp = { $tanh: NumberExpr };
export type DegreesToRadiansOp = { $degreesToRadians: NumberExpr };
export type RadiansToDegreesOp = { $radiansToDegrees: NumberExpr };

/** Type Expression Operators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#type-expression-operators
 */
export type TypeOps = ConvertOp | IsNumberOp | ToBoolOp | ToDateOp | ToDecimalOp | ToDoubleOp | ToIntOp | ToLongOp | ToObjectIdOp | ToStringOp | TypeOp;

export type ConvertOp = ConvertDoubleOp | ConvertStringOp | ConvertObjectIdOp | ConvertBoolOp | ConvertDateOp | ConvertIntOp | ConvertLongOp | ConvertDecimalOp;
export type DoubleTypeExpr = "double" | 1 | StringExpr | NumberExpr;
export type StringTypeExpr = "string" | 2 | StringExpr | NumberExpr;
export type ObjectIdTypeExpr = "objectId" | 7 | StringExpr | NumberExpr;
export type BoolTypeExpr = "bool" | 8 | StringExpr | NumberExpr;
export type DateTypeExpr = "date" | 9 | StringExpr | NumberExpr;
export type IntTypeExpr = "int" | 16 | StringExpr | NumberExpr;
export type LongTypeExpr = "long" | 18 | StringExpr | NumberExpr;
export type DecimalTypeExpr = "decimal" | 19 | StringExpr | NumberExpr;
export type ConvertDoubleOp = { $convert: { input: Expr; to: DoubleTypeExpr; onError?: Expr; onNull?: Expr } };
export type ConvertStringOp = { $convert: { input: Expr; to: StringTypeExpr; onError?: Expr; onNull?: Expr } };
export type ConvertObjectIdOp = { $convert: { input: Expr; to: ObjectIdTypeExpr; onError?: Expr; onNull?: Expr } };
export type ConvertBoolOp = { $convert: { input: Expr; to: BoolTypeExpr; onError?: Expr; onNull?: Expr } };
export type ConvertDateOp = { $convert: { input: Expr; to: DateTypeExpr; onError?: Expr; onNull?: Expr } };
export type ConvertIntOp = { $convert: { input: Expr; to: IntTypeExpr; onError?: Expr; onNull?: Expr } };
export type ConvertLongOp = { $convert: { input: Expr; to: LongTypeExpr; onError?: Expr; onNull?: Expr } };
export type ConvertDecimalOp = { $convert: { input: Expr; to: DecimalTypeExpr; onError?: Expr; onNull?: Expr } };
export type IsNumberOp = { $isNumber: Expr };
export type ToBoolOp = { $toBool: Expr };
export type ToDecimalOp = { $toDecimal: Expr };
export type ToDoubleOp = { $toDouble: Expr };
export type ToIntOp = { $toInt: Expr };
export type ToLongOp = { $toLong: Expr };
export type ToObjectIdOp = { $toObjectId: Expr };
export type TypeOp = { $type: Expr };

/** Accumulators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#accumulators---group---bucket---bucketauto---setwindowfields-
 */
export type AccumulatorAggOps =
    | AccumulatorOp
    | AddToSetOp
    | AvgAggOp
    | BottomOp
    | BottomNOp
    | CountOp
    | FirstAggOp
    | FirstNAggOp
    | LastAggOp
    | LastNAggOp
    | MaxAggOp
    | MaxNAggOp
    | MedianAggOp
    | MergeObjectsAggOp
    | MinAggOp
    | MinNAggOp
    | PercentileAggOp
    | PushOp
    | StdDevPopAggOp
    | StdDevSampAggOp
    | SumAggOp
    | TopOp
    | TopNOp;

export type AddToSetOp = { $addToSet: Expr };
export type AvgAggOp = { $avg: Expr };
export type SortOrder = 1 | -1 | { $meta: "textScore" };
export type BottomOp = { $bottom: { sortBy: Record<string, SortOrder>; output: Expr } };
export type BottomNOp = { $bottomN: { n: NumberExpr; sortBy: Record<string, SortOrder>; output: Expr } };
export type CountOp = { $count: Record<never, never> };
export type FirstAggOp = { $first: Expr };
export type FirstNAggOp = { $firstN: { input: Expr; n: NumberExpr } };
export type LastAggOp = { $last: Expr };
export type LastNAggOp = { $lastN: { input: Expr; n: NumberExpr } };
export type MaxAggOp = { $max: Expr };
export type MaxNAggOp = { $maxN: { input: Expr; n: NumberExpr } };
export type MedianAggOp = { $median: { input: Expr; method: "approximate" } };
export type MergeObjectsAggOp = { $mergeObjects: ObjectExpr };
export type MinAggOp = { $min: Expr };
export type MinNAggOp = { $minN: { input: Expr; n: NumberExpr } };
export type PercentileAggOp = { $percentile: { input: NumberExpr; p: NumberExpr[]; method: "approximate" } };
export type PushOp = { $push: Expr };
export type StdDevPopAggOp = { $stdDevPop: Expr };
export type StdDevSampAggOp = { $stdDevSamp: Expr };
export type SumAggOp = { $sum: Expr };
export type TopOp = { $top: { sortBy: Record<string, SortOrder>; output: Expr } };
export type TopNOp = { $topN: { n: NumberExpr; sortBy: Record<string, SortOrder>; output: Expr } };

export type AccumulatorOps = AvgOp | FirstOp | LastOp | MaxOp | MedianOp | MinOp | PercentileOp | StdDevPopOp | StdDevSampOp | SumOp;

export type AvgOp = { $avg: ArrayExpr | Expr[] };
export type FirstOp = { $first: ArrayExpr | Expr[] };
export type LastOp = { $last: ArrayExpr | Expr[] };
export type MaxOp = { $max: ArrayExpr | Expr[] };
export type MedianOp = { $median: ArrayExpr | Expr[] };
export type MinOp = { $min: ArrayExpr | Expr[] };
export type PercentileOp = { $percentile: { input: NumberExpr[]; p: NumberExpr[]; method: "approximate" } };
export type StdDevPopOp = { $stdDevPop: ArrayExpr | Expr[] };
export type StdDevSampOp = { $stdDevSamp: ArrayExpr | Expr[] };
export type SumOp = { $sum: ArrayExpr | Expr[] };

/** Variable Expression Operators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#variable-expression-operators
 */
export type VariableOps = LetOp;

export type LetOp = { $let: { vars: Record<string, Expr>; in: Expr } };

/** Window Operators
 * @link https://www.mongodb.com/docs/manual/reference/operator/aggregation/#window-operators
 */
export type WindowOps =
    | AddToSetOp
    | AvgAggOp
    | BottomOp
    | BottomNOp
    | CountOp
    | CovariancePopOp
    | CovarianceSampOp
    | DenseRankOp
    | DerivativeOp
    | DerivativeDateOp
    | DocumentNumberOp
    | ExpMovingAvgOp
    | FirstAggOp
    | FirstNAggOp
    | IntegralOp
    | IntegralDateOp
    | LastAggOp
    | LastNAggOp
    | LinearFillOp
    | LocfOp
    | MaxAggOp
    | MaxNAggOp
    | MinAggOp
    | MinNAggOp
    | PushOp
    | RankOp
    | ShiftOp
    | StdDevPopAggOp
    | StdDevSampAggOp
    | SumAggOp
    | TopOp
    | TopNOp;

export type CovariancePopOp = { $covariancePop: [NumberExpr, NumberExpr] };
export type CovarianceSampOp = { $covarianceSamp: [NumberExpr, NumberExpr] };
export type DenseRankOp = { $denseRank: Record<never, never> };
export type DerivativeOp = { $derivative: { input: NumberExpr } };
export type DerivativeDateOp = { $derivative: { input: NumberExpr; unit: Exclude<DateUnit, "year" | "quarter" | "month"> } };
export type DocumentNumberOp = { $documentNumber: Record<never, never> };
export type ExpMovingAvgOp = { $expMovingAvg: { input: Expr; N: number } | { input: Expr; alpha: number } };
export type IntegralOp = { $integral: { input: NumberExpr } };
export type IntegralDateOp = { $integral: { input: NumberExpr; unit: Exclude<DateUnit, "year" | "quarter" | "month"> } };
export type LinearFillOp = { $linearFill: Expr };
export type LocfOp = { $locf: Expr };
export type RankOp = { $rank: Record<never, never> };
export type ShiftOp = { $shift: { output: Expr; by: NumberExpr; default?: Expr } };

/** Return Type */
export type ReturnUnknownOps =
    | ArrayElemAtOp
    | ReduceOp
    | CondOp
    | IfNullOp
    | SwitchOp
    | AccumulatorOp
    | FunctionOp
    | LiteralOp
    | GetFieldOp
    | MetaOp
    | LetOp
    | FirstOp
    | LastOp
    | MaxOp
    | MinOp;
export type ReturnNumberOps =
    | AbsOp
    | AddOpNumber
    | CeilOp
    | DivideOp
    | ExpOp
    | FloorOp
    | LnOp
    | LogOp
    | Log10Op
    | ModOp
    | MultiplyOp
    | PowOp
    | RoundOp
    | SqrtOp
    | SubtractOpNumber
    | TruncOp
    | SizeOp
    | BitAndOp
    | BitNotOp
    | BitOrOp
    | BitXorOp
    | CmpOp
    | BinarySizeOp
    | BsonSizeOp
    | DateDiffOp
    | DayOfMonthOp
    | DayOfWeekOp
    | DayOfYearOp
    | HourOp
    | IsoDayOfWeekOp
    | IsoWeekOp
    | IsoWeekYearOp
    | MillisecondOp
    | MinuteOp
    | MonthOp
    | SecondOp
    | WeekOp
    | YearOp
    | RandOp
    | ToHashedIndexKeyOp
    | IndexOfBytesOp
    | IndexOfCPOp
    | StrLenBytesOp
    | StrLenCPOp
    | StrcasecmpOp
    | TsIncrementOp
    | TsSecondOp
    | SinOp
    | CosOp
    | TanOp
    | AsinOp
    | AcosOp
    | AtanOp
    | Atan2Op
    | AsinhOp
    | AcoshOp
    | AtanhOp
    | SinhOp
    | CoshOp
    | TanhOp
    | DegreesToRadiansOp
    | RadiansToDegreesOp
    | ConvertDoubleOp
    | ConvertIntOp
    | ConvertLongOp
    | ConvertDecimalOp
    | ToDecimalOp
    | ToDoubleOp
    | ToIntOp
    | ToLongOp
    | AvgOp
    | MedianOp
    | StdDevPopOp
    | StdDevSampOp
    | SumOp;
export type ReturnArrayOps =
    | ConcatArraysOp
    | FilterOp
    | FirstNOp
    | IndexOfArrayOp
    | LastNOp
    | MapOp
    | MaxNOp
    | MinNOp
    | ObjectToArrayOp
    | RangeOp
    | ReverseArrayOp
    | SliceOp
    | SortArrayOp
    | ZipOp
    | SetDifferenceOp
    | SetIntersectionOp
    | SetUnionOp
    | RegexFindAllOp
    | SplitOp
    | PercentileOp;
export type ReturnDateOps = AddOpDate | SubtractOpDate | DateAddOp | DateFromPartsOp | DateFromStringOp | DateSubtractOp | DateTruncOp | ToDateOp | ConvertDateOp;
export type ReturnObjectOps = ArrayToObjectOp | DateToPartsOp | MergeObjectsOp | SetFieldOp | UnsetFieldOp | RegexFindOp;
export type ReturnStringOps =
    | DateToStringOp
    | ConcatOp
    | LtrimOp
    | ReplaceOneOp
    | ReplaceAllOp
    | RtrimOp
    | SubstrOp
    | SubstrBytesOp
    | SubstrCPOp
    | ToLowerOp
    | ToStringOp
    | TrimOp
    | ToUpperOp
    | ConvertStringOp
    | TypeOp;
export type ReturnBooleanOps =
    | InAggOp
    | IsArrayOp
    | AndOp
    | NotOp
    | OrOp
    | EqOp
    | GtOp
    | GteOp
    | LtOp
    | LteOp
    | NeOp
    | AllElementsTrueOp
    | AnyElementTrueOp
    | SetEqualsOp
    | SetIsSubsetOp
    | RegexMatchOp
    | ConvertBoolOp
    | IsNumberOp
    | ToBoolOp;
export type ReturnObjectIdExpr = ConvertObjectIdOp | ToObjectIdOp;
