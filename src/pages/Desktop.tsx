import { useEffect, useState } from 'react'
import { Window } from '../components'

function App() {
	const [currentHour, setCurrentHour] = useState(
		new Date().getHours() >= 12
			? new Date().getHours() - 12
			: new Date().getHours()
	)
	const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes())
	const [currentPeriod, setCurrentPeriod] = useState(
		new Date().getHours() >= 12 ? 'PM' : 'AM'
	)

	/* Update the time every second */
	useEffect(() => {
		const id = window.setInterval(() => {
			const now = new Date()
			const hours = now.getHours()

			setCurrentHour(hours >= 12 ? hours - 12 : hours)
			setCurrentMinute(now.getMinutes())
			setCurrentPeriod(hours >= 12 ? 'PM' : 'AM')
		}, 3000)
		return () => window.clearInterval(id)
	}, [])

	return (
		<div className="flex h-screen w-screen flex-col overflow-hidden bg-[var(--desktop-background)]">
			{/* Desktop */}
			<main className="relative min-h-0 flex-1 overflow-hidden p-3">
				<Window title="Window">
					<div>Try dragging, resizing or maximizing this window.</div>
				</Window>
			</main>

			{/* Taskbar */}
			<div className="window-border-top flex shrink-0 items-center justify-end bg-[var(--window-background)] p-1">
				{/* Time */}
				<div className="window-border-reverse w-fit px-2">
					{currentHour}:{currentMinute.toString().padStart(2, '0')}{' '}
					{currentPeriod}
				</div>
			</div>
		</div>
	)
}

export default App
