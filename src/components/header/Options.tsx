'use client';

import Logger from '@/lib/Logger';
import { CSSProperties, useState } from 'react';

export default function Options({ style }: Readonly<{ style: CSSProperties }>) {
	const [showDebug, setShowDebug] = useState(false);
	const toggleShowDebug = () => {
		const newShowDebug = !showDebug;
		setShowDebug(newShowDebug);
		Logger.showDebugs = newShowDebug;
	};

	return (
		<div style={style} className='h-9 overflow-hidden transition-all duration-300'>
			<div className='mt-1 flex gap-2 border-t-2 border-solid border-app-accent py-2'>
				<div className='flex cursor-pointer items-center gap-1 px-1 text-sm'>
					<input checked={showDebug} onChange={toggleShowDebug} type='checkbox' id='cbShowDebug' title='Show Debugging Logs' className='cursor-pointer' />
					<label htmlFor='cbShowDebug' className='cursor-pointer select-none hover:[text-shadow:_0_0_3px_rgb(31_31_35_/_80%)]'>
						Debug
					</label>
				</div>
			</div>
		</div>
	);
}
