import CopyButton from '../../components/CopyButton';

type CodeSectionProps = { command: string; parameters: string; personal: string; userInput?: string };

export default function CodeSection({ command, parameters, personal, userInput = '<YOUR_APP_NAME>' }: Readonly<CodeSectionProps>) {
	return (
		<code className='flex items-center justify-between gap-5 rounded-md border border-app-accent bg-background-start px-4 py-2 dark:border-app-accent dark:bg-hinted-300'>
			<div>
				<span className='font-bold'>{command}</span> {/**/}
				<span className='text-font-2'>{parameters}</span> {/**/}
				<span className='text-font-faded'>{personal}</span> {/**/}
				<span className='text-app-color'>{userInput}</span>
			</div>
			<CopyButton text={`${command} ${parameters} ${personal} ${userInput}`} />
		</code>
	);
}
