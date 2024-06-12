import Dependencies from '@/components/dependencies';
import Header from '@/components/header/header';
import Hero from '@/components/hero';
import Instruction from '@/components/instruction/instruction';
import Logger from '@/lib/Logger';

export default function App() {
	Logger.log('App');

	return (
		<div className='relative flex min-h-screen flex-col'>
			<Header />
			<main className='flex flex-col items-center gap-20 p-14'>
				<Hero />
				<Instruction />
				<Dependencies />
			</main>
		</div>
	);
}
