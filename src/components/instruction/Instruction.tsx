import { GITHUB_NAME, GITHUB_REPOSITORY, GITHUB_URL } from '@/constant/constants';
import CodeSection from './CodeSection';

export default function Instruction() {
	return (
		<div className='flex flex-col gap-2'>
			<CodeSection command='npx' parameters='degit' personal={`${GITHUB_NAME}/${GITHUB_REPOSITORY}`} />
			<p className='text-center'>or</p>
			<CodeSection command='npx' parameters='create-next-app --example' personal={`${GITHUB_URL}/${GITHUB_NAME}/${GITHUB_REPOSITORY}`} />
			<a
				href={`${GITHUB_URL}/${GITHUB_NAME}/${GITHUB_REPOSITORY}/generate`}
				rel='noopener noreferrer'
				target='_blank'
				className='mt-4 block rounded border-2 border-purple-950 p-1 text-center transition-colors duration-100 hover:bg-purple-700/5 hover:text-app-color'
			>
				Use This Template
			</a>
		</div>
	);
}
