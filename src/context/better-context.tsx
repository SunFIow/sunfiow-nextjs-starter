// import { useSyncExternalStoreWithSelector } from '@/util/useSESWS';
import { Context, createContext as createContextOrig, useContext as useContextOrig, useEffect, useRef } from 'react';
import { shallowEqual } from 'react-redux';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';

type Callable = () => void;
type Store<T> = { value: T; subscribe: (subscriber: Callable) => Callable; notify: Callable };

type BetterContext<T> = {
	Provider: ({ children }: { children: React.ReactNode }) => JSX.Element;
	useSelector: <R>(selector: (state: T) => R) => R;
};

export function createContext<T>(useStoreData: () => T, displayName: string = 'BetterContext'): BetterContext<T> {
	const StoreContext = createContextOrig<Store<T> | undefined>(undefined);
	StoreContext.displayName = displayName;

	function Provider({ children }: { children?: React.ReactNode }) {
		const store = useStore(useStoreData);
		return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
	}

	return { Provider, useSelector: selector => useSelector(StoreContext, selector) };
}

function useStore<T>(useStoreData: () => T) {
	const value = useStoreData();

	const storeRef = useRef<Store<T>>();
	let store = storeRef.current;

	if (!store) {
		const subscribers = new Set<Callable>();
		store = storeRef.current = {
			value,
			subscribe: callback => {
				subscribers.add(callback);
				return () => subscribers.delete(callback);
			},
			notify: () => {
				subscribers.forEach(callback => callback());
			}
		};
	}

	useEffect(() => {
		// if (!shallowEqual(storeRef.current.value, value)) {
		if (!Object.is(store.value, value)) {
			store.value = value;
			store.notify();
		}
	});

	return store;
}

function useSelector<T, R>(StoreContext: Context<Store<T> | undefined>, selector: (state: T) => R) {
	const store = useContextOrig(StoreContext);
	if (!store) throw new Error(`No Context Provider found for {${StoreContext.displayName}}`);

	// Breaks when selector returns non primitives
	// return useSyncExternalStore(store.subscribe, () => selector(store.value));

	return useSyncExternalStoreWithSelector(
		store.subscribe,
		() => store.value,
		() => store.value,
		selector,
		shallowEqual
	);
}
