'use client';

import { IS_SERVER } from '@/constant/constants';
import { copy, reduce, reduceAction } from '@/lib/utils';
import { SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { Serializable, useLocalStorage } from './useLocalStorage';
import Logger from '@/lib/Logger';

export type UseLocalStorageStateReturn<T> = [value: T, (action: SetStateAction<T>) => void, () => T, () => void, () => T, () => void];
export type UseLocalStorageStateOptions<T> = {
	initialize?: boolean;
	load?: boolean;
	onLoad?: (value: T, fromLocalStorage: boolean) => void;
	handlers?: Serializable<T>;
	ignoreEquals?: boolean;
};

export function useLocalStorageState<T>(
	key: string,
	defaultValue: T | (() => T),
	{ initialize = false, load = true, ignoreEquals = false, handlers, onLoad }: UseLocalStorageStateOptions<T> = {}
): UseLocalStorageStateReturn<T> {
	const _options = useMemo(
		() => ({
			handlers: {
				load: (value: string) => {
					if (handlers?.load) return handlers.load(value);

					// Support 'undefined' as a value
					if (value === 'undefined') return undefined as unknown as T;

					try {
						const parsed: T = JSON.parse(value);
						return parsed;
					} catch (error) {
						Logger.error('Error parsing JSON:', error);
						return reduce(defaultValue); // Return defaultValue if parsing fails
					}
				},
				save: (value: T) => {
					if (handlers?.save) return handlers.save(value);

					return JSON.stringify(value);
				}
			}
		}),
		[defaultValue, handlers]
	);

	const [setItem, getItem, removeItem] = useLocalStorage<T>(key, _options);
	const [value, setValue] = useState(() => {
		if (IS_SERVER || !initialize) return reduce(defaultValue);
		const local = getItem();
		if (!local) return reduce(defaultValue);
		onLoad?.(local, true);
		return local;
	});
	const valueRef = useRef<T>(value);

	const _setValue = useCallback(
		(action: SetStateAction<T>) => {
			const newValue = reduceAction(action, valueRef.current);
			setValue(copy(newValue));
			if (ignoreEquals && shallowEqual(valueRef.current, newValue)) return;
			valueRef.current = newValue;
			setItem(valueRef.current);
		},
		[ignoreEquals, setItem]
	);

	const _loadValue = useCallback((): T => {
		const loadedValue = getItem();
		const fromLocalStorage = loadedValue != null;
		if (fromLocalStorage) valueRef.current = loadedValue;
		else valueRef.current = reduce(defaultValue);
		setValue(copy(valueRef.current));
		onLoad?.(valueRef.current, fromLocalStorage);
		return valueRef.current;
	}, [getItem, defaultValue, onLoad]);

	const _saveValue = useCallback(() => {
		setItem(valueRef.current);
	}, [setItem]);

	const _removeItem = useCallback(() => {
		valueRef.current = reduce(defaultValue);
		removeItem();
	}, [removeItem, defaultValue]);

	useEffect(() => {
		if (!initialize && load) _loadValue();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		_loadValue();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [key]);

	return [value, _setValue, _loadValue, _saveValue, () => valueRef.current, _removeItem];
}
