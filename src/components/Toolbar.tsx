type ToolbarProps = {
	special?: string
	isBackToProjectsDisabled?: boolean
	onBackToProjects?: () => void
}

export function Toolbar({
	special = '',
	isBackToProjectsDisabled = false,
	onBackToProjects,
}: ToolbarProps) {
	return (
		<div className="flex gap-2 text-gray-400">
			{special === 'projects' && (
				<button
					type="button"
					onClick={onBackToProjects}
					disabled={isBackToProjectsDisabled}
					className={
						isBackToProjectsDisabled
							? 'text-gray-400'
							: 'cursor-pointer text-black'
					}
				>
					<span className="underline">B</span>ack to projects
				</button>
			)}
			<p>
				<span className="underline">F</span>ile
			</p>
			<p>
				<span className="underline">E</span>dit
			</p>
			<p>
				<span className="underline">V</span>iew
			</p>
			<p>
				<span className="underline">T</span>ools
			</p>
			<p>
				<span className="underline">H</span>elp
			</p>
			{special === 'cv' && (
				<a
					className="cursor-pointer text-black"
					href="/CV%20Son%20Bram%20van%20der%20Burg.pdf"
					target="_blank"
				>
					<span className="underline">O</span>pen in new tab
				</a>
			)}
		</div>
	)
}
