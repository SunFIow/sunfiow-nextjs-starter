'use client';

import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';

const TOOLTIP_TIME = 1500;
const FADING_TIME = TOOLTIP_TIME + 100;
const FADE_OUT_TIME = FADING_TIME + 100;

type TooltipState = {
	open: boolean;
	message: string;
	color: string;
};
const COPIED_STATE = { open: true, message: 'Copied!', color: 'text-app-color' };
const FAILED_STATE = { open: true, message: 'Failed!', color: 'text-destructive' };

export default function CopyButton({ text }: Readonly<{ text: string }>) {
	const [, copy] = useCopyToClipboard();
	const [state, setState] = useState<TooltipState>(() => ({ open: false, message: '', color: '' }));

	async function handleCopy() {
		const copied = await copy(text);
		if (copied) return showStatus('copied');
		else showStatus('failed');
	}

	function showStatus(status: 'copied' | 'failed') {
		setState(status == 'copied' ? COPIED_STATE : FAILED_STATE);
		setTimeout(() => setState(state => ({ ...state, open: false })), TOOLTIP_TIME);
		setTimeout(() => setState(state => ({ ...state, color: '' })), FADING_TIME);
		setTimeout(() => setState(state => ({ ...state, message: '' })), FADE_OUT_TIME);
	}

	return (
		<TooltipProvider>
			<Tooltip open={state.open} delayDuration={FADE_OUT_TIME}>
				<TooltipTrigger asChild>
					<button
						type='button'
						aria-haspopup='menu'
						title='Copy'
						onClick={handleCopy}
						className={
							state.color +
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
					<p className={state.color}>{state.message}</p>
					<TooltipArrow className='h-2 w-3 border-sky-500 fill-app' />
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
