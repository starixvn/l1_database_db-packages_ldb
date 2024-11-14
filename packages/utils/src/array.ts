/**
 * Return a [shallow copy][1] of array A that contains element that exists in array B. The order of result array is following A array.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy
 */
export const subtractArrays = <A, B>(arrayA: A[], arrayB: B[]) => {
    return arrayA.filter((itemA) => (arrayB as unknown[]).includes(itemA)) as (A & B)[];
};
