/** Get the string type of the keys of a record */
export type StringKeyOf<T> = T extends Record<infer K, unknown> ? K & string : never;

/** Add autocomplete suggestion on string type */
export type IntelliString<T> = T | (string & NonNullable<unknown>);

/** Check if T can be extended from U */
export type Satisfies<T extends U, U> = T;

export type KeyOf<T> = T extends Record<infer K, unknown> ? K : never;
