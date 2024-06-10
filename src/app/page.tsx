import Logger from '@/lib/Logger';
import Packages from '@/components/Packages';
import { Hero } from '@/components/Hero';
import Header from '@/components/header/Header';
import Instruction from '@/components/instruction/Instruction';

export default function HomePage() {
	Logger.log('HomePage');

	return (
		<div className='relative flex min-h-screen flex-col'>
			<Header />
			<main className='flex flex-col items-center gap-20 p-14'>
				<Hero />
				<Instruction />
				<Packages />
			</main>
		</div>
	);
}
