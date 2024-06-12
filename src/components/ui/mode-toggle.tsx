'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ModeToggle() {
	const { theme, setTheme } = useTheme();
	const [highlightColor, setHighlightColor] = useState('');

	useEffect(() => setHighlightColor('text-app-color'), []);

	const lightColor = theme == 'light' ? highlightColor : '';
	const darkColor = theme == 'dark' ? highlightColor : '';
	const systemColor = theme == 'system' ? highlightColor : '';

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon'>
					<Sun className={lightColor + ' h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'} />
					<Moon className={darkColor + ' absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'} />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem className={lightColor} onClick={() => setTheme('light')}>
					Light
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className={darkColor} onClick={() => setTheme('dark')}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className={systemColor} onClick={() => setTheme('system')}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
