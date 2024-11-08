import type { Binary, ObjectId, Timestamp } from "bson";
import type { ReturnArrayOps, ReturnBooleanOps, ReturnDateOps, ReturnNumberOps, ReturnObjectIdExpr, ReturnObjectOps, ReturnStringOps, ReturnUnknownOps } from "./operators.js";
import type { ReturnObjectVars, ReturnUnknownVars } from "./variables.js";

export type Expr = NumberExpr | ArrayExpr | DateExpr | StringExpr | BooleanExpr | ObjectExpr | BinaryExpr | TimestampExpr | ObjectIdExpr | RegexExpr | FieldExpr | UnknownExpr;

export type NumberExpr = (number & NonNullable<unknown>) | ReturnNumberOps | UnknownExpr;

export type ArrayExpr = (unknown[] & NonNullable<unknown>) | ReturnArrayOps | UnknownExpr;

export type DateExpr = Date | ReturnDateOps | UnknownExpr;

export type StringExpr = (string & NonNullable<unknown>) | ReturnStringOps | UnknownExpr;

export type BooleanExpr = boolean | ReturnBooleanOps | UnknownExpr;

export type ObjectExpr = object | ReturnObjectOps | UnknownExpr;

export type BinaryExpr = Binary | UnknownExpr;

export type TimestampExpr = Timestamp | UnknownExpr;

export type ObjectIdExpr = ObjectId | ReturnObjectIdExpr | UnknownExpr;

export type RegexExpr = RegExp | UnknownExpr;

export type FieldExpr = `$${string}` | `${ReturnObjectVars}.${string}`;

export type UnknownExpr = ReturnUnknownOps | ReturnUnknownVars | FieldExpr;
