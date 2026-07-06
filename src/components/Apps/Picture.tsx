import { Toolbar } from '../Toolbar'

export function Picture() {
	return (
		<div className="flex flex-col gap-2">
			<Toolbar />

			<img src="/images/portrait.JPG" />
		</div>
	)
}
