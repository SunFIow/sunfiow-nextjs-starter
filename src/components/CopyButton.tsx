'use client';

import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { selectStatus, useAppelector } from '@/context/AppContext';
import { useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';

export default function CopyButton({ text }: Readonly<{ text: string }>) {
	const [, copy] = useCopyToClipboard();
	const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
	const statusRef = useAppelector(selectStatus);

	async function handleCopy() {
		const copied = await copy(text);
		if (!copied) return showStatus('failed');
		showStatus('copied');
	}

	function showStatus(state: 'idle' | 'copied' | 'failed') {
		setState(state);
		statusRef.current = state.charAt(0).toUpperCase() + state.slice(1) + '!';
		setTimeout(() => setState('idle'), 1500);
	}

	const color = state == 'copied' ? 'text-app-color' : state == 'failed' ? 'text-destructive' : '';

	return (
		<TooltipProvider>
			<Tooltip open={state !== 'idle'}>
				<TooltipTrigger asChild>
					<button
						type='button'
						id='radix-:R2tnnlbpda:'
						aria-haspopup='menu'
						aria-expanded='false'
						data-state='closed'
						title='Copy'
						onMouseDown={handleCopy}
						className={
							color +
							' rounded-md p-3 ring-offset-background transition-colors hover:bg-app-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
						}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className=''
						>
							<rect width='14' height='14' x='8' y='8' rx='2' ry='2'></rect>
							<path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'></path>
						</svg>
					</button>
				</TooltipTrigger>
				<TooltipContent arrowPadding={-10}>
					<p className={color}>{statusRef.current}</p>
					<TooltipArrow className='h-2 w-3 border-sky-500 fill-app' />
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
