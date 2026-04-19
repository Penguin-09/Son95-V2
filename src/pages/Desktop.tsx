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
			setCurrentHour(
				new Date().getHours() >= 12
					? new Date().getHours() - 12
					: new Date().getHours()
			)
			setCurrentMinute(new Date().getMinutes())
			setCurrentPeriod(new Date().getHours() >= 12 ? 'PM' : 'AM')
		}, 1000)
		return () => window.clearInterval(id)
	}, [])

	return (
		<div className="h-screen w-screen p-3">
			<Window title="Window">
				<div>test</div>
			</Window>

			{/* Taskbar */}
			<div className="window-border-top absolute right-0 bottom-0 left-0 flex items-center justify-end bg-[var(--window-background)] p-1">
				{/* Time */}
				<div className="window-border-reverse w-fit px-2">
					{currentHour}:{currentMinute} {currentPeriod}
				</div>
			</div>
		</div>
	)
}

export default App
