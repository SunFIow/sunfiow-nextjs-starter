import { useCallback, useState } from 'react';

export default function useForceRender() {
	const [state, setState] = useState(0);
	return useCallback(() => setState(state => state + 1), []);
}
