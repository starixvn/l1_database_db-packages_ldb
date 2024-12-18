import type { Locale, Strength } from "./modules/collation.ts";

declare module "mongodb" {
    interface CollationOptions {
        locale: Locale;
        caseLevel?: boolean;
        caseFirst?: string;
        strength?: Strength;
        numericOrdering?: boolean;
        alternate?: string;
        maxVariable?: string;
        backwards?: boolean;
        normalization?: boolean;
    }
}
