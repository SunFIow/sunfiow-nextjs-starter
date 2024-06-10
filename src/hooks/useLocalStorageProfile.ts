'use client';

import Logger from '@/lib/Logger';
import { reduce, reduceAction } from '@/lib/utils';
import { SetStateAction, useCallback, useMemo, useRef } from 'react';
import { shallowEqual } from 'react-redux';
import { UseLocalStorageStateOptions } from './useLocalStorageState';
import { useLocalStorageVersion } from './useLocalStorageVersion';

export type ProfileStorage<T> = {
	profile: string;
	value: T;
};

export function findProfile<T>(storage: ProfileStorage<T>[], profile: string) {
	for (const profileStorage of storage) if (profileStorage.profile === profile) return profileStorage;
}

export type UseLocalStorageProfileReturn<T> = [value: T, (action: SetStateAction<T>) => void, (profile?: string) => T, (profile?: string) => void, () => T, () => void];

export function useLocalStorageProfile<T>(key: string, defaultValue: T | (() => T), options?: UseLocalStorageStateOptions<T>): UseLocalStorageProfileReturn<T> {
	type _T = ProfileStorage<T>[] | null;

	const handleLoad = useCallback(
		(profile: string, item: _T, fromLocalStorage?: boolean): T => {
			let loadedValue: T | null = null;

			const storage = item;
			if (storage) {
				const profileStorage = findProfile<T>(storage, profile);
				if (profileStorage) loadedValue = profileStorage.value;
			}

			if (fromLocalStorage == undefined) fromLocalStorage = loadedValue != null;
			if (loadedValue != null) valueRef.current = loadedValue;
			else valueRef.current = reduce(defaultValue);

			options?.onLoad?.(valueRef.current, fromLocalStorage);

			return valueRef.current;
		},
		[defaultValue, options]
	);

	const _options: UseLocalStorageStateOptions<_T> = useMemo(
		() => ({
			load: options?.load,
			onLoad: (item: _T, fromLocalStorage: boolean) => handleLoad('Default', item, fromLocalStorage),
			ignoreEquals: options?.ignoreEquals,
			handlers: !options?.handlers
				? undefined
				: {
						load: value => {
							Logger.debug('custom-profileStorages-loader for', key, value);
							return JSON.parse(value).map((storage: ProfileStorage<string>) => ({
								profile: storage.profile,
								value: options?.handlers?.load(storage.value) ?? JSON.parse(storage.value)
							}));
						},
						save: profileStorages => {
							Logger.debug('custom-profileStorages-saver for', key, profileStorages);
							return JSON.stringify(
								(profileStorages ?? []).map(storage => ({
									profile: storage.profile,
									value: options?.handlers?.save(storage.value) ?? storage.value
								}))
							);
						}
					}
		}),
		[handleLoad, key, options?.handlers, options?.ignoreEquals, options?.load]
	);

	const [, setItem, loadItem, saveItem, currentItem, removeItem] = useLocalStorageVersion<_T>(key, null, _options);
	const valueRef = useRef<T>(reduce(defaultValue));

	const _saveItem = useCallback(
		(profile: string = 'Default') => {
			Logger.debug(`save-item-with-profile for ${key}-${profile}:  (${JSON.stringify(valueRef.current)})`);

			let storage = currentItem();
			Logger.debug('profileStorages for', key, storage);
			if (!storage) storage = [];

			let profileStorage = findProfile<T>(storage, profile);
			Logger.debug('profileStorage for', key, profileStorage);

			if (!profileStorage) {
				profileStorage = { profile } as ProfileStorage<T>;
				storage.push(profileStorage);
			}
			profileStorage.value = valueRef.current;

			setItem(storage);
			saveItem();
		},
		[currentItem, key, saveItem, setItem]
	);

	const _setItem = useCallback(
		(action: SetStateAction<T>) => {
			const newValue = reduceAction(action, valueRef.current);
			valueRef.current = newValue;
			if (options?.ignoreEquals && shallowEqual(valueRef.current, newValue)) return;

			Logger.debug('');
			Logger.debug(`setting-p ${key}: (${JSON.stringify(valueRef.current)} => ${JSON.stringify(newValue)})`);

			_saveItem('Default');
		},
		[_saveItem, key, options?.ignoreEquals]
	);

	const _loadItem = useCallback(
		(profile: string = 'Default'): T => {
			return handleLoad(profile, loadItem());
		},
		[handleLoad, loadItem]
	);

	const _removeItem = useCallback(() => {
		valueRef.current = reduce(defaultValue);
		removeItem();
	}, [removeItem, defaultValue]);

	return [valueRef.current, _setItem, _loadItem, _saveItem, () => valueRef.current, _removeItem];
}
