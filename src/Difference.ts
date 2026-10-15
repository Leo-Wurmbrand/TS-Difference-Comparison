/**
 * @file Functionality to check for differences in data.
 * 
 * @version 0.0.1
 * 
 * @author Leo Wurmbrand <leo.wurmbrand@gmail.com>
 * @copyright Leo Wurmbrand 2025–2026
 * @license GPLv2
 */


/*
 * ******************************************
 * ! Difference checking
 * ******************************************
 */


/** 
 * Utility class to compare data.
 * 
 * @since 0.0.1
 * 
 * @example const isDifferent = Difference.isMeaningful({ foo: "bar" }, { foo: "bar" });
 */
export default class Difference {

	/** The first value in the comparison. */
	private a: unknown;

	/** The second value in the comparison. */
	private b: unknown;

	/**
	 * Constructs the comparison class.
	 * 
	 * @param {unknown} a - The first value to compare.
	 * @param {unknown} b - The second value to compare.
	 */
	private constructor(a: unknown, b: unknown) {

		this.a = a;
		this.b = b;

	}

	/**
	 * Compares 2 values to see if they are actually "contentfully" different (not both falsy).
	 * 
	 * E.g.: { a: null } is NOT different to { a: null, b: null }.
	 * Different types are considered different unless both are falsy.
	 * 
	 * @param {unknown} a - The first value to compare.
	 * @param {unknown} b - The second value to compare.
	 * @returns {boolean} Whether they are actually different.
	 */
	public static isMeaningful(a: unknown, b: unknown): boolean {

		const difference = new Difference(a, b);

		return difference.checkEquality() ??
			difference.checkFalsy() ??
			difference.checkTypes() ??
			difference.checkArrays() ??
			difference.checkObjects() ??
			true; // Nothing should reach here but if something does, it is treated as if it were compared using === (checked earlier, therefore must be different).

	}

	/**
	 * Checks for strict equality.
	 * 
	 * Not different if identical reference or primitive comparison equality is true.
	 * 
	 * @returns {false|undefined} `false` if they are identical (not meaningfully different), `undefined` if undetermined.
	 */
	private checkEquality(): false | undefined {

		if (this.a === this.b) return false; // eslint-disable-line no-object-comparison/loose-type
	
	}

	/**
	 * Checks if a value is empty (e.g.: falsy).
	 * 
	 * @param {unknown} value - The value to check.
	 * @returns {boolean} Whether the value is empty.
	 */
	private static isEmpty(value: unknown): boolean {

		// eslint-disable-next-line no-object-comparison/loose-type
		if (value === false || value === 0 || value === null || value === undefined) return true;
		if (typeof value === 'number') return isNaN(value);
		if (typeof value === 'string') return value.trim() === '';
		if (Array.isArray(value)) return value.length === 0;
		if (typeof value === 'object') return Object.keys(value as object).length === 0;
		return false;

	}

	/**
	 * Checks for both values being falsy.
	 * 
	 * Not different if both are falsy.
	 * 
	 * @returns {false|undefined} `false` if they are both falsy (not meaningfully different), `undefined` if undetermined.
	 */
	private checkFalsy(): false | undefined {

		if (Difference.isEmpty(this.a) && Difference.isEmpty(this.b)) return false;

	}

	/**
	 * Checks for differing types.
	 * 
	 * Considered different if types do not match.
	 * 
	 * @returns {true|undefined} `true` if they have different types (meaningfully different), `undefined` if undetermined.
	 */
	private checkTypes(): true | undefined {

		const typeA = this.a === null ? 'null' : typeof this.a;
		const typeB = this.b === null ? 'null' : typeof this.b;
		if (typeA !== typeB) return true;

	}

	/**
	 * Checks an array recursively.
	 * 
	 * @returns {boolean|undefined} Passes `true` onward if a difference is found, otherwise `false` if no difference is found, or `undefined` if it is not an array.
	 */
	private checkArrays(): boolean | undefined {

		if (Array.isArray(this.a) && Array.isArray(this.b)) {

			for (let i = 0; i < Math.max(this.a.length, this.b.length); i++) {

				if (Difference.isMeaningful(this.a[i], this.b[i])) return true;

			}
			return false;

		}

	}

	/**
	 * Checks an object recursively.
	 * 
	 * @returns {boolean|undefined} Passes `true` onward if a difference is found, otherwise `false` if no difference is found, or `undefined` if it is not an object.
	 */
	private checkObjects(): boolean | undefined {

		if (typeof this.a === 'object' && typeof this.b === 'object') {

			const keys = new Set([ ...Object.keys(this.a as object), ...Object.keys(this.b as object) ]);

			for (const key of keys) {

				if (Difference.isMeaningful((this.a as Record<string, unknown>)[key], (this.b as Record<string, unknown>)[key])) return true;
			
			}
			return false;
		
		}

	}

}