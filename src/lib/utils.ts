import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SetStateAction } from 'react';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function nf_fixed(value: number, precision: number) {
	return value.toFixed(precision);
}

export function nf_commas(value: number, precision?: number) {
	if (!precision) return value.toLocaleString('en-US');
	else return value.toLocaleString('en-US', { minimumFractionDigits: precision });
}

export function nf(value: number, precision: number) {
	const fixed = value.toFixed(precision);
	const ret = parseFloat(fixed);
	return ret;
}

export function reduce<T>(value: T | (() => T)) {
	return value instanceof Function ? value() : value;
}
export function reduceAction<T>(action: SetStateAction<T>, prevState: T) {
	return action instanceof Function ? action(prevState) : action;
}

export function copy<T>(value: T) {
	if (typeof value === 'object') return { ...value };
	// TODO: What about Functions?
	return value;
}

export function isDeepEqual(object1: any, object2: any) {
	const objKeys1 = Object.keys(object1);
	const objKeys2 = Object.keys(object2);

	if (objKeys1.length !== objKeys2.length) return false;

	for (const key of objKeys1) {
		const value1 = object1[key];
		const value2 = object2[key];

		const isObjects = isObject(value1) && isObject(value2);

		if ((isObjects && !isDeepEqual(value1, value2)) || (!isObjects && value1 !== value2)) {
			return false;
		}
	}
	return true;
}

export function isObject(object: any) {
	return object != null && typeof object === 'object';
}
