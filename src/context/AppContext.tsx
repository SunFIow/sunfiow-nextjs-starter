'use client';

import useForceRender from '@/hooks/useForceRender';
import { useLocalStorageProfile } from '@/hooks/useLocalStorageProfile';
import Logger from '@/lib/Logger';
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef } from 'react';
import { createContext, useContextSelector } from './better-context';

const AppContext = createContext<AppState>();

export default function AppProvider({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const appState = useAppState();
	return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
}

export function useAppelector<R>(selector: (state: AppState) => R) {
	return useContextSelector(AppContext, selector);
}

export const selectStatus = (state: AppState) => state.statusRef;

type AppState = {
	saveState: (profile?: string) => void;
	loadState: (profile?: string) => void;

	profile: string;
	setProfile: Dispatch<SetStateAction<string>>;

	statusRef: MutableRefObject<string>;

	forceRender: () => void;
};

function useAppState(): AppState {
	Logger.log('useApp');

	const forceRender = useForceRender();

	function saveState(_profile: string = 'Default') {
		saveProfile(_profile);
	}

	function loadState(_profile: string = 'Default') {
		loadProfile(_profile);
	}

	const [profile, setProfile, loadProfile, saveProfile] = useLocalStorageProfile('profile', 'Default');
	const statusRef = useRef('');

	useEffect(() => {
		Logger.log('AppContext#useEffect-[]');
		forceRender();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const app = {
		saveState,
		loadState,

		profile,
		setProfile,

		statusRef,

		forceRender
	};

	return app;
}
