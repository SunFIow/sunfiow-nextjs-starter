// import { useSyncExternalStoreWithSelector } from '@/util/useSESWS';
import { Context, createContext as createContextOrig, useContext as useContextOrig, useEffect, useRef } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';
import { shallowEqual } from 'react-redux';

type Callable = () => void;
type Store<T> = { value: T; subscribe: (l: Callable) => Callable; notify: Callable };
type ContextWrapper<T> = { ContextOrig: Context<Store<T> | undefined>; Provider: (props: { value: T; children: React.ReactNode }) => JSX.Element };

function ContextProvider<T>(Context: Context<Store<T> | undefined>, { value, children }: { value: T; children: React.ReactNode }, defaultValue?: T) {
	const storeRef = useRef<Store<T>>();
	let store = storeRef.current;

	if (!store) {
		const listeners = new Set<Callable>();
		store = {
			value,
			subscribe: listener => {
				listeners.add(listener);
				return () => listeners.delete(listener);
			},
			notify: () => {
				listeners.forEach(listener => listener());
			}
		};
		storeRef.current = store;
	}

	useEffect(() => {
		if (!Object.is(store.value, value)) {
			// if (!shallowEqual(store.value, value)) {
			store.value = value;
			store.notify();
		}
	});

	return <Context.Provider value={store}>{children}</Context.Provider>;
}

export function createContext<T>(options?: { defaultValue?: T; displayName?: string }): ContextWrapper<T> {
	const ContextOrig = createContextOrig<Store<T> | undefined>(undefined);
	ContextOrig.displayName = options?.displayName ?? 'BetterContext';
	function ContextProviderWrapper(props: { value: T; children: React.ReactNode }) {
		return ContextProvider(ContextOrig, props, options?.defaultValue);
	}
	return { ContextOrig, Provider: ContextProviderWrapper };
}

export function useContextSelector<T, R>(Context: ContextWrapper<T>, selector: (state: T) => R) {
	const store = useContextOrig(Context.ContextOrig);
	if (!store) throw new Error(`No Context Provider found for {${Context.ContextOrig.displayName}}`);
	return useSyncExternalStoreWithSelector(
		l => store.subscribe(l),
		() => store.value,
		() => store.value,
		selector,
		shallowEqual
	);
}
