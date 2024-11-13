/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Satisfies } from "@ldb/utils";

{
    type U = { a: number; b: string };
    type T1 = { a: number; b: string };
    type T2 = { a: number; b: string; c: symbol };
    type T3 = { a: number };
    type T4 = { a: number; b: number };
    type T5 = { a: number; b: number; c: symbol };

    /** This is OK */
    {
        type Test1 = Satisfies<T1, U>;
        type Test2 = Satisfies<T2, U>;
    }

    /** Expect ERROR */
    {
        type Test3 = Satisfies<T3, U>;
        type Test4 = Satisfies<T4, U>;
        type Test5 = Satisfies<T5, U>;
    }
}
