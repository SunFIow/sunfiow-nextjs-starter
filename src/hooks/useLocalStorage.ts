'use client';

import Logger from '@/lib/Logger';
import { useCallback } from 'react';

export type Serializable<T> = {
	save(value: T): string;
	load(obj: string): T;
};

export type UseLocalStorageReturn<T> = [(newValue: T) => void, () => T | null, () => void];
export type UseLocalStorageOptions<T> = { handlers?: Serializable<T> };

export function useLocalStorage<T>(key: string, { handlers }: UseLocalStorageOptions<T>): UseLocalStorageReturn<T> {
	const setItem = useCallback(
		(newValue: T) => {
			const item = handlers ? handlers.save(newValue) : JSON.stringify(newValue);
			Logger.debug(`set-local-storage-item for ${key} handlers?(${handlers != undefined}) : ${item}`);
			localStorage.setItem(key, item);
		},
		[key, handlers]
	);

	const getItem = useCallback((): T | null => {
		const item = localStorage.getItem(key);
		if (!item) return null;
		if (handlers) return handlers.load(item);
		return JSON.parse(item);
	}, [key, handlers]);

	const removeItem = useCallback(() => {
		localStorage.removeItem(key);
	}, [key]);

	return [setItem, getItem, removeItem];
}
