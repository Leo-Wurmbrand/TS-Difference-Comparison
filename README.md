# TS Difference Comparison
TypeScript utility function to compare data for a difference.

- Checks for a meaningful difference

## Example usage

```ts
import Difference from './Difference';

// Comparing the same value is not considered meaningfully different
console.log(Difference.isMeaningful('foo', 'foo');); // false

// Comparing different (non-falsy) types is considered meaningfully different
console.log(Difference.isMeaningful('1', 1)); // true

// Comparing two empty values are not considered meaningfully different
console.log(Difference.isMeaningful([], {})); // false

// Comparing two falsy values is not considered meaningfully different
console.log(Difference.isMeaningful(0, '')); // false

// Comparing different instances of objects is not considered meaningfully differnt if all keys/values are not meaningfully different (checks recursively)
console.log(Difference.isMeaningful({ foo: "bar" }, { foo: "bar" })); // false

// Comparing different objects ignores falsy keys
console.log(Difference.isMeaningful({ foo: "bar" }, { foo: "bar", bar: null })); // false
```

## Documentation

### `Difference.isMeaningful(a, b): boolean`

Static method to determine if there is a meaningful difference between two data.

| Parameter | Type | Description |
|-----------|------|-------------|
| `a` | `unknown` | The first piece of data. |
| `b` | `unknown` | The second piece of data. |

Returns `boolean` (whether there is a meaningful difference or not).

Note that all falsy values are considered equal. Comparing `false` to `null` will therefore not result as being considered a meaningful difference.

## License

GPLv2 © Leo Wurmbrand 2025–2026