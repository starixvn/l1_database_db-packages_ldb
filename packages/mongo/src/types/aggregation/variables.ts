export type az = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";

export type UserVarName = `${az}${string}`;
export type UserVars = `$$${UserVarName}`;

export type SystemVars = NowVar | ClusterTimeVar | RootVar | CurrentVar | RemoveVar | DescendVar | PruneVar | KeepVar | SearchMetaVar | UserRolesVar;

/** @todo Check return type */
export type NowVar = "$$NOW";
/** @todo Check return type */
export type ClusterTimeVar = "$$CLUSTER_TIME";
export type RootVar = "$$ROOT";
export type CurrentVar = "$$CURRENT";
export type RemoveVar = "$$REMOVE";
export type DescendVar = "$$DESCEND";
export type PruneVar = "$$PRUNE";
export type KeepVar = "$$KEEP";
export type SearchMetaVar = "$$SEARCH_META";
export type UserRolesVar = "$$USER_ROLES";

export type RedactVars = DescendVar | PruneVar | KeepVar;

export type ReturnUnknownVars = UserVars;
export type ReturnDateVars = NowVar;
export type ReturnNumberVars = ClusterTimeVar;
export type ReturnObjectVars = RootVar | CurrentVar;
