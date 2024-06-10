'use client';

import { GITHUB_NAME, GITHUB_REPOSITORY, GITHUB_URL } from '@/constant/constants';
import Image from 'next/image';
import { useState } from 'react';
import Options from './Options';
import { ModeToggle } from '../ui/mode-toggle';
import { Separator } from '../ui/separator';

export default function Header() {
	const [showOptions, setShowOptions] = useState(false);
	const toggleShowOptions = () => setShowOptions(!showOptions);

	return (
		<header className='sticky left-0 top-0 z-50 w-full border-b-3 border-solid border-app-accent bg-app p-2'>
			<nav className='flex items-center justify-between'>
				{/* Options Menu Button */}
				<button title='Options' onMouseDown={toggleShowOptions} className='size-8 min-w-6 justify-self-start bg-contain bg-center bg-no-repeat'>
					<svg viewBox='0 0 15 15' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z'
							fill='currentColor'
							fillRule='evenodd'
							clipRule='evenodd'
						></path>
					</svg>
				</button>

				{/* Dark Mode Menu */}
				<a href='/' className='flex items-center gap-2'>
					<Image src='icon.png' alt='' width={24} height={24} style={{ imageRendering: 'pixelated' }} />
					{GITHUB_REPOSITORY}
				</a>

				<div className='flex items-center gap-2 justify-self-end'>
					{/* Github Link */}
					<a
						href={`${GITHUB_URL}/${GITHUB_NAME}/${GITHUB_REPOSITORY}`}
						rel='noopener noreferrer'
						target='_blank'
						className='flex flex-wrap items-center justify-center gap-3 rounded px-2 py-1.5 text-font-2 transition-colors duration-200 hover:bg-app-accent hover:text-app-color focus:text-app-color'
					>
						<svg
							stroke='currentColor'
							fill='currentColor'
							strokeWidth='0'
							viewBox='0 0 496 512'
							aria-hidden='true'
							focusable='false'
							height='1em'
							width='1em'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'></path>
						</svg>
						<span className='text-sm'>Open in Github</span>
					</a>

					<Separator orientation='vertical' className='h-6' />

					{/* DarkMode Menu Button */}
					<ModeToggle />
				</div>
			</nav>
			<Options style={showOptions ? {} : { height: 0 }} />
		</header>
	);
}
