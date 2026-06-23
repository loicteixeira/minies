// Utility for exhaustive switch statements.
// TypeScript narrows the value to `never` if all union members are handled,
// so any unhandled case becomes a compile error.
export function assertNever(value: never): never {
	throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
}
