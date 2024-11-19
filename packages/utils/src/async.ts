type Duration$ms = number & {};
export const wait = (ms: Duration$ms) => new Promise((resolve) => setTimeout(resolve, ms));
