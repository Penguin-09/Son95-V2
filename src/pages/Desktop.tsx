import { useEffect, useState, useRef } from 'react'
import { App, AppShortcut, TaskbarApp } from '../components'
import { Welcome } from '../components/Apps/Welcome'
import { Picture } from '../components/Apps/Picture'
import { AboutMe } from '../components/Apps/AboutMe'

function Desktop() {
	type OpenWindow = {
		id: number
		title: string
		zIndex: number
		x: number
		y: number
		width: number
		height: number
		minimized: boolean
	}

	const defaultWindowWidth = 320
	const defaultWindowHeight = 200

	type OpenAppOptions = {
		width?: number
		height?: number
	}

	const [currentHour, setCurrentHour] = useState(
		new Date().getHours() >= 12
			? new Date().getHours() - 12
			: new Date().getHours()
	)
	const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes())
	const [currentPeriod, setCurrentPeriod] = useState(
		new Date().getHours() >= 12 ? 'PM' : 'AM'
	)
	const [windows, setWindows] = useState<OpenWindow[]>([])

	const nextId = useRef(0)
	const nextZIndex = useRef(1)

	function openApp(title: string, options?: OpenAppOptions) {
		const width = options?.width ?? defaultWindowWidth
		const height = options?.height ?? defaultWindowHeight
		const x = Math.max(0, (window.innerWidth - width) / 2)
		const y = Math.max(0, (window.innerHeight - height) / 2)

		setWindows((prev) => [
			...prev,
			{
				id: nextId.current++,
				title,
				zIndex: nextZIndex.current++,
				x,
				y,
				width,
				height,
				minimized: false,
			},
		])
	}

	function closeApp(id: number) {
		setWindows((prev) => prev.filter((window) => window.id !== id))
	}

	function focusApp(id: number) {
		setWindows((prev) =>
			prev.map((window) =>
				window.id === id
					? {
							...window,
							zIndex: nextZIndex.current++,
							minimized: false,
						}
					: window
			)
		)
	}

	function minimizeApp(id: number) {
		setWindows((prev) =>
			prev.map((window) =>
				window.id === id ? { ...window, minimized: true } : window
			)
		)
	}

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
			<main className="relative flex min-h-0 flex-1 overflow-hidden">
				{/* App Shortcuts */}
				<div className="flex w-30 flex-col">
					<AppShortcut
						title="welcome.exe"
						iconName="executable"
						onOpen={() => openApp('Welcome', { width: 520, height: 280 })}
					/>

					<AppShortcut
						title="about-me.txt"
						iconName="text"
						onOpen={() => openApp('AboutMe', { width: 400, height: 300 })}
					/>

					<AppShortcut
						title="picture-of-me.png"
						iconName="picture"
						onOpen={() => openApp('Picture', { width: 400, height: 300 })}
					/>

					<AppShortcut
						title="projects.html"
						iconName="browser"
						onOpen={() => openApp('Projects', { width: 400, height: 300 })}
					/>
				</div>

				<div className="flex w-30 flex-col">
					<AppShortcut
						title="cv.pdf"
						iconName="document"
						onOpen={() => openApp('CV', { width: 400, height: 300 })}
					/>

					<AppShortcut
						title="User info"
						iconName="operating-system"
						onOpen={() => openApp('UserInfo', { width: 400, height: 300 })}
					/>
				</div>

				<div className="flex w-30 flex-col">
					<AppShortcut
						title="Tech Stack Folder"
						iconName="folder"
						onOpen={() =>
							openApp('TechStackFolder', { width: 400, height: 300 })
						}
					/>
				</div>

				{/* App windows */}
				{windows.map((window) => (
					<App
						key={window.id}
						title={window.title}
						x={window.x}
						y={window.y}
						width={window.width}
						height={window.height}
						zIndex={window.zIndex}
						minimized={window.minimized}
						onFocus={() => focusApp(window.id)}
						onMinimize={() => minimizeApp(window.id)}
						onClose={() => closeApp(window.id)}
					>
						{window.title === 'Welcome' && (
							<Welcome onClose={() => closeApp(window.id)} />
						)}
						{window.title === 'Picture' && <Picture />}
						{window.title === 'AboutMe' && <AboutMe />}
					</App>
				))}
			</main>

			{/* Taskbar */}
			<div className="window-border-top flex shrink-0 items-center gap-3 bg-[var(--window-background)] p-1">
				{/* Start button */}
				<button className="window-button flex w-fit shrink-0 flex-row items-center gap-1 p-1">
					<img
						src="/images/icons/operating-system.png"
						alt="Start menu"
						className="h-6 w-6"
					/>
					<p className="font-bold">Start</p>
				</button>

				{/* Open apps */}
				<div className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden">
					<div className="flex w-max gap-1">
						{windows.map((window) => (
							<TaskbarApp
								key={window.id}
								title={window.title}
								onClick={() => focusApp(window.id)}
							/>
						))}
					</div>
				</div>

				{/* Time */}
				<div className="window-border-reverse w-fit shrink-0 px-2">
					{currentHour}:{currentMinute.toString().padStart(2, '0')}{' '}
					{currentPeriod}
				</div>
			</div>
		</div>
	)
}

export default Desktop
