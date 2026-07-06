import { Toolbar } from '../Toolbar'

export function AboutMe() {
	return (
		<div className="flex h-full min-h-0 flex-col gap-2">
			<Toolbar />

			<div className="window-border-reverse min-h-0 flex-1 bg-white">
				<p>test</p>
			</div>
		</div>
	)
}
