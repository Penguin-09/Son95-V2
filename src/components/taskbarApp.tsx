type TaskbarAppProps = {
	title?: string
	iconName?: string
	onClick?: () => void
}

export function TaskbarApp({
	title = 'Window',
	iconName = 'executable',
	onClick,
}: TaskbarAppProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="window-button flex shrink-0 flex-row items-center gap-1 px-2 py-1 whitespace-nowrap"
		>
			<img
				className="h-5 w-5"
				src={`/images/icons/${iconName}.png`}
				alt={title}
			/>
			<p>{title}</p>
		</button>
	)
}
