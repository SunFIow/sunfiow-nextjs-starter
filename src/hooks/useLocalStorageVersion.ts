'use client';

import Logger from '@/lib/Logger';
import { reduce, reduceAction } from '@/lib/utils';
import { SetStateAction, useCallback, useMemo, useRef } from 'react';
import { shallowEqual } from 'react-redux';
import { UseLocalStorageStateOptions, UseLocalStorageStateReturn, useLocalStorageState } from './useLocalStorageState';

export const VERSION = 'vG-0.0.1';

export type VERSIONS = 'vG-0.0.1'; // | 'vG-0.0.2';

export type VersionStorage<T> = {
	version: VERSIONS;
	date: string;
	date_time: number;
	value: T;
};

export function findVersion<T>(storage: VersionStorage<T>[], version: VERSIONS) {
	for (const versionStorage of storage) if (versionStorage.version === version) return versionStorage;
}

export type UseLocalStorageVersionReturn<T> = [value: T, (action: SetStateAction<T>) => void, (version?: VERSIONS) => T, (version?: VERSIONS) => void, () => T, () => void];

function useBla() {
	const foo = useLocalStorageVersion('foo', '');
}

export function useLocalStorageVersion<T>(
	key: string,
	defaultValue: T | (() => T),
	{ initialize, load, ignoreEquals, handlers, onLoad }: UseLocalStorageStateOptions<T> = {}
): UseLocalStorageStateReturn<T> {
	type _T = VersionStorage<T>[] | null;

	const handleLoad = useCallback(
		(version: VERSIONS, item: _T, fromLocalStorage?: boolean): T => {
			let loadedValue: T | null = null;
			const storage = item;
			if (storage) {
				const versionStorage = findVersion<T>(storage, version);
				if (versionStorage) loadedValue = versionStorage.value;
			}

			if (fromLocalStorage == undefined) fromLocalStorage = loadedValue != null;
			if (loadedValue != null) valueRef.current = loadedValue;
			else valueRef.current = reduce(defaultValue);

			onLoad?.(valueRef.current, fromLocalStorage);

			return valueRef.current;
		},
		[defaultValue, onLoad]
	);

	const _options: UseLocalStorageStateOptions<_T> = useMemo(
		() => ({
			initialize,
			load,
			ignoreEquals: ignoreEquals,
			onLoad: (item: _T, fromLocalStorage: boolean) => handleLoad(VERSION, item, fromLocalStorage),
			handlers: !handlers
				? undefined
				: {
						load: (obj: string) => {
							Logger.debug('custom-versionStorages-loader for', key, obj);
							return JSON.parse(obj).map((storage: VersionStorage<string>) => ({
								version: storage.version,
								date: storage.date,
								date_time: storage.date_time,
								value: handlers.load(storage.value)
							}));
						},
						save: (versionStorages: VersionStorage<T>[]) => {
							Logger.debug('custom-versionStorages-saver for', key, versionStorages);
							return JSON.stringify(
								versionStorages.map(storage => ({
									version: storage.version,
									date: storage.date,
									date_time: storage.date_time,
									value: handlers.save(storage.value)
								}))
							);
						}
					}
		}),
		[initialize, load, ignoreEquals, handlers, handleLoad, key]
	);

	const [, setItem, loadItem, saveItem, currentItem, removeItem] = useLocalStorageState<_T>(key, null, _options);
	const valueRef = useRef<T>(reduce(defaultValue));

	const _saveItem = useCallback(
		(version: VERSIONS = VERSION) => {
			Logger.debug(`save-item-with-version for ${key}-${version}:  (${JSON.stringify(valueRef.current)})`);

			let storage = currentItem();
			Logger.debug('versionStorages for', key, storage);
			if (!storage) storage = [];

			let versionStorage = findVersion<T>(storage, version);
			Logger.debug('versionStorage for', key, versionStorage);

			if (!versionStorage) {
				versionStorage = { version } as VersionStorage<T>;
				storage.push(versionStorage);
			}
			const date = new Date();
			versionStorage.date = date.toDateString() + ' ' + date.toLocaleTimeString();
			versionStorage.date_time = date.getTime();
			versionStorage.value = valueRef.current;

			setItem(storage);
			saveItem();
		},
		[currentItem, key, saveItem, setItem]
	);

	const _setItem = useCallback(
		(action: SetStateAction<T>) => {
			const newValue = reduceAction(action, valueRef.current);
			valueRef.current = newValue;
			if (ignoreEquals && shallowEqual(valueRef.current, newValue)) return;

			Logger.debug(`set-item-with-version for ${key}: (${JSON.stringify(valueRef.current)} => ${JSON.stringify(newValue)})`);

			_saveItem(VERSION);
		},
		[_saveItem, key, ignoreEquals]
	);

	const _loadItem = useCallback(
		(version: VERSIONS = VERSION): T => {
			return handleLoad(version, loadItem());
		},
		[handleLoad, loadItem]
	);

	const _removeItem = useCallback(() => {
		valueRef.current = reduce(defaultValue);
		removeItem();
	}, [removeItem, defaultValue]);

	return [valueRef.current, _setItem, _loadItem, _saveItem, () => valueRef.current, _removeItem];
}
