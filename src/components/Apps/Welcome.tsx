type WelcomeProps = {
	onClose?: () => void
}

export function Welcome({ onClose }: WelcomeProps) {
	return (
		<div className="flex flex-col gap-3">
			<p className="text-2xl font-bold">Welcome to Son95!</p>

			<p>
				Hi!, I'm Son, a recently graduated web developer with a passion for
				creating web apps.
			</p>

			<p>
				Son95 is a recreation of the classic Windows 95 experience, reimagined
				as a personal portfolio. With Son95, you can discover information about
				me and my work. Click on an app to get started!.
			</p>

			<div className="flex justify-end">
				<button type="button" className="window-button w-fit px-1" onClick={onClose}>
					Got it!
				</button>
			</div>
		</div>
	)
}
