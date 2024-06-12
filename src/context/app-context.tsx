'use client';

import useForceRender from '@/hooks/useForceRender';
import { useLocalStorageProfile } from '@/hooks/useLocalStorageProfile';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import Logger from '@/lib/Logger';
import { createContext } from './better-context';

const { Provider: AppProvider, useSelector: useAppSelector } = createContext(useAppData, 'AppContext');
export { AppProvider, useAppSelector };

export const useShowOptions = () => useAppSelector(state => state.showOptions);

function useAppData() {
	Logger.log('useAppData');

	const forceRender = useForceRender();

	function saveState(_profile: string = 'Default') {
		saveProfile(_profile);
	}

	function loadState(_profile: string = 'Default') {
		loadProfile(_profile);
	}

	const [profile, setProfile, loadProfile, saveProfile] = useLocalStorageProfile('profile', 'Default');
	const [showOptions, setShowOptions] = useLocalStorageState('showOptions', false);
	const toggleShowOptions = () => setShowOptions(showOptions => !showOptions);

	const app = {
		saveState,
		loadState,

		profile,
		setProfile,

		showOptions,
		toggleShowOptions,

		forceRender
	};

	return app;
}
