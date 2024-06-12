import packageInfo from '../../package.json';
const { dependencies, devDependencies } = packageInfo;

type Dependencie = { name: string; version: string; style?: 'color' | 'faded'; comment?: string };

const DEPENDENCIES: Dependencie[] = [
	{ name: '@radix-ui/react-dropdown-menu', version: dependencies['@radix-ui/react-dropdown-menu'], style: 'faded' },
	{ name: '@radix-ui/react-popover', version: dependencies['@radix-ui/react-popover'], style: 'faded' },
	{ name: '@radix-ui/react-separator', version: dependencies['@radix-ui/react-separator'], style: 'faded' },
	{ name: '@radix-ui/react-slot', version: dependencies['@radix-ui/react-slot'], style: 'faded' },
	{ name: '@radix-ui/react-tooltip', version: dependencies['@radix-ui/react-tooltip'], style: 'faded' },
	{ name: 'class-variance-authority', version: dependencies['class-variance-authority'] },
	{ name: 'clsx', version: dependencies.clsx },
	{ name: 'lucide-react', version: dependencies['lucide-react'] },
	{ name: 'next', version: dependencies.next, style: 'color' },
	{ name: 'next-themes', version: dependencies['next-themes'], style: 'color' },
	{ name: 'react', version: dependencies.react },
	{ name: 'react-dom', version: dependencies['react-dom'] },
	{ name: 'react-redux', version: dependencies['react-redux'], style: 'color', comment: 'mandatory for better context' },
	{ name: 'tailwind-merge', version: dependencies['tailwind-merge'] },
	{ name: 'tailwindcss-animate', version: dependencies['tailwindcss-animate'] },
	{ name: 'use-sync-external-store', version: dependencies['use-sync-external-store'], style: 'color', comment: 'mandatory for better context' },
	{ name: 'usehooks-ts', version: dependencies['usehooks-ts'], style: 'color', comment: 'libary of simple hooks' }
];

const DEV_DEPENDENCIES: Dependencie[] = [
	{ name: '@types/node', version: devDependencies['@types/node'], style: 'faded' },
	{ name: '@types/react', version: devDependencies['@types/react'], style: 'faded' },
	{ name: '@types/react-dom', version: devDependencies['@types/react-dom'], style: 'faded' },
	{ name: 'eslint', version: devDependencies.eslint, style: 'color' },
	{ name: 'eslint-config-next', version: devDependencies['eslint-config-next'], style: 'faded' },
	{ name: 'eslint-config-prettier', version: devDependencies['eslint-config-prettier'], style: 'faded' },
	{ name: 'postcss', version: devDependencies.postcss },
	{ name: 'prettier', version: devDependencies.prettier, style: 'color', comment: 'configured to format tailwind' },
	{ name: 'prettier-plugin-tailwindcss', version: devDependencies['prettier-plugin-tailwindcss'], style: 'faded' },
	{ name: 'tailwindcss', version: devDependencies.tailwindcss, style: 'color' },
	{ name: 'typescript', version: devDependencies.typescript, style: 'color' }
];

export default function Packages() {
	return (
		<div className='flex justify-center gap-6 font-mono'>
			<PackageGroup name='dependencies' packages={DEPENDENCIES} />
			<PackageGroup name='devDependencies' packages={DEV_DEPENDENCIES} />
		</div>
	);
}

type PackageGroupProps = { name: string; packages: Dependencie[] };

function PackageGroup({ name, packages }: Readonly<PackageGroupProps>) {
	return (
		<div className='rounded-md border border-app-accent bg-background-start p-2 dark:bg-hinted-100'>
			<p>{name + ' {'}</p>
			<ul>
				{packages.map(({ name, version, comment, style }) => {
					return (
						<li key={name} className='ml-4'>
							<span className={style == 'color' ? 'text-app-color' : style == 'faded' ? 'text-sm text-font-faded' : 'text-font-2'}>
								{'\t'} {name}
							</span>
							: <span className={style == 'faded' ? 'text-font-faded' : 'text-font-2'}>{version}</span>
							{comment && <span className='text-sm text-[hsl(102,60%,33%)] dark:text-[hsl(102,30%,50%)]'>{' // ' + comment}</span>}
						</li>
					);
				})}
			</ul>
			<p>{'}'}</p>
		</div>
	);
}
