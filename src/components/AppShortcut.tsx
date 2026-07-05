type AppShortcutProps = {
	title?: string
	iconName?: string
	onOpen?: () => void
}

export function AppShortcut({
	title = 'Window',
	iconName = 'executable',
	onOpen,
}: AppShortcutProps) {
	return (
		<button
			onClick={onOpen}
			className="m-2 flex flex-col items-center hover:cursor-pointer"
		>
			<img className="h-10" src={`/images/icons/${iconName}.png`} alt={title} />
			<p className="text-white">{title}</p>
		</button>
	)
}
