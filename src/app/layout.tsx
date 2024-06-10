import { ThemeProvider } from '@/context/theme-provider';
import AppProvider from '@/context/AppContext';
import Logger from '@/lib/Logger';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'SunFIow Next.js Starter',
	description: 'Template for a Next.js-powered React app starter',
	icons: '/img/icon.png'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	Logger.log('Layout');

	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className}>
				<AppProvider>
					<ThemeProvider defaultTheme='system' enableSystem disableTransitionOnChange>
						{children}
					</ThemeProvider>
				</AppProvider>
			</body>
		</html>
	);
}
