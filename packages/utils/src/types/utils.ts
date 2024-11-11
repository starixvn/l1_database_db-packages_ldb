/** Add autocomplete suggestion on string type */
type IntelliString$1<T> = T | (string & NonNullable<unknown>);

/** Check if T can be extended from U */
type Satisfies$1<T extends U, U> = T;

declare global {
    /** Add autocomplete suggestion on string type */
    type IntelliString<T> = IntelliString$1<T>;

    /** Check if T can be extended from U */
    type Satisfies<T extends U, U> = Satisfies$1<T, U>;
}

export type { IntelliString$1 as IntelliString, Satisfies$1 as Satisfies };
