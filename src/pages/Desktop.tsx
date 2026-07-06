import { useEffect, useState, useRef } from 'react'
import { App, AppShortcut, TaskbarApp } from '../components'
import { Welcome } from '../components/Apps/Welcome'
import { Picture } from '../components/Apps/Picture'
import { AboutMe } from '../components/Apps/AboutMe'
import { Cv } from '../components/Apps/Cv'
import { UserInfo } from '../components/Apps/UserInfo'
import { TechStackFolder } from '../components/Apps/TechStackFolder'
import { Projects } from '../components/Apps/Projects'

function Desktop() {
	type OpenWindow = {
		id: number
		title: string
		iconName?: string
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
		iconName?: string
		xOffset?: number
		yOffset?: number
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
	const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
	const [windows, setWindows] = useState<OpenWindow[]>([])

	const nextId = useRef(0)
	const nextZIndex = useRef(1)
	const hasOpenedInitialApps = useRef(false)

	function openApp(title: string, options?: OpenAppOptions) {
		const requestedWidth = options?.width ?? defaultWindowWidth
		const requestedHeight = options?.height ?? defaultWindowHeight
		const iconName = options?.iconName
		const xOffset = options?.xOffset ?? 0
		const yOffset = options?.yOffset ?? 0
		const viewportPadding = 12
		const taskbarReserve = 56
		const maxWidth = Math.max(220, window.innerWidth - viewportPadding * 2)
		const maxHeight = Math.max(140, window.innerHeight - taskbarReserve)
		const width = Math.min(requestedWidth, maxWidth)
		const height = Math.min(requestedHeight, maxHeight)
		const maxX = Math.max(0, window.innerWidth - width)
		const maxY = Math.max(0, window.innerHeight - taskbarReserve - height)
		const x = Math.min(
			Math.max(0, (window.innerWidth - width) / 2 + xOffset),
			maxX
		)
		const y = Math.min(
			Math.max(0, (window.innerHeight - taskbarReserve - height) / 2 + yOffset),
			maxY
		)

		setWindows((prev) => [
			...prev,
			{
				id: nextId.current++,
				title,
				iconName,
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

	function openWelcomeApp() {
		openApp('Welcome', {
			width: 520,
			height: 280,
			iconName: 'executable',
		})
	}

	function openAboutMeApp() {
		openApp('about-me.txt', {
			width: 700,
			height: 430,
			iconName: 'text',
		})
	}

	function openPictureApp() {
		openApp('picture-of-me.png', {
			width: 300,
			height: 450,
			iconName: 'picture',
		})
	}

	function openProjectsApp() {
		openApp('projects.html', {
			width: 600,
			height: 500,
			iconName: 'browser',
		})
	}

	function openCvApp() {
		openApp('cv.pdf', {
			width: 550,
			height: 600,
			iconName: 'document',
		})
	}

	function openUserInfoApp() {
		openApp('User Info', {
			width: 400,
			height: 380,
			iconName: 'operating-system',
		})
	}

	function openTechStackFolderApp() {
		openApp('Tech Stack Folder', {
			width: 400,
			height: 550,
			iconName: 'folder',
		})
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

	useEffect(() => {
		if (hasOpenedInitialApps.current) {
			return
		}

		hasOpenedInitialApps.current = true

		const viewportPadding = 12
		const taskbarReserve = 56

		const pictureRequestedWidth = 300
		const pictureRequestedHeight = 450
		const pictureWidth = Math.min(
			pictureRequestedWidth,
			Math.max(220, window.innerWidth - viewportPadding * 2)
		)
		const pictureHeight = Math.min(
			pictureRequestedHeight,
			Math.max(140, window.innerHeight - taskbarReserve)
		)
		const pictureMaxX = Math.max(0, window.innerWidth - pictureWidth)
		const pictureMaxY = Math.max(
			0,
			window.innerHeight - taskbarReserve - pictureHeight
		)
		const pictureX = Math.min(
			Math.max(0, (window.innerWidth - pictureWidth) / 2 - 200),
			pictureMaxX
		)
		const pictureY = Math.min(
			Math.max(0, (window.innerHeight - taskbarReserve - pictureHeight) / 2),
			pictureMaxY
		)

		const welcomeRequestedWidth = 520
		const welcomeRequestedHeight = 280
		const welcomeWidth = Math.min(
			welcomeRequestedWidth,
			Math.max(220, window.innerWidth - viewportPadding * 2)
		)
		const welcomeHeight = Math.min(
			welcomeRequestedHeight,
			Math.max(140, window.innerHeight - taskbarReserve)
		)
		const welcomeMaxX = Math.max(0, window.innerWidth - welcomeWidth)
		const welcomeMaxY = Math.max(
			0,
			window.innerHeight - taskbarReserve - welcomeHeight
		)
		const welcomeX = Math.min(
			Math.max(0, (window.innerWidth - welcomeWidth) / 2 + 140),
			welcomeMaxX
		)
		const welcomeY = Math.min(
			Math.max(0, (window.innerHeight - taskbarReserve - welcomeHeight) / 2),
			welcomeMaxY
		)

		setWindows((prev) => [
			...prev,
			{
				id: nextId.current++,
				title: 'picture-of-me.png',
				iconName: 'picture',
				zIndex: nextZIndex.current++,
				x: pictureX,
				y: pictureY,
				width: pictureWidth,
				height: pictureHeight,
				minimized: false,
			},
			{
				id: nextId.current++,
				title: 'Welcome',
				iconName: 'executable',
				zIndex: nextZIndex.current++,
				x: welcomeX,
				y: welcomeY,
				width: welcomeWidth,
				height: welcomeHeight,
				minimized: false,
			},
		])
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
						onOpen={openWelcomeApp}
					/>

					<AppShortcut
						title="about-me.txt"
						iconName="text"
						onOpen={openAboutMeApp}
					/>

					<AppShortcut
						title="picture-of-me.png"
						iconName="picture"
						onOpen={openPictureApp}
					/>

					<AppShortcut
						title="projects.html"
						iconName="browser"
						onOpen={openProjectsApp}
					/>
				</div>

				<div className="flex w-30 flex-col">
					<AppShortcut title="cv.pdf" iconName="document" onOpen={openCvApp} />

					<AppShortcut
						title="User info"
						iconName="operating-system"
						onOpen={openUserInfoApp}
					/>
				</div>

				<div className="flex w-30 flex-col">
					<AppShortcut
						title="Tech Stack Folder"
						iconName="folder"
						onOpen={openTechStackFolderApp}
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
						{window.title === 'picture-of-me.png' && <Picture />}
						{window.title === 'about-me.txt' && <AboutMe />}
						{window.title === 'cv.pdf' && <Cv />}
						{window.title === 'User Info' && <UserInfo />}
						{window.title === 'Tech Stack Folder' && <TechStackFolder />}
						{window.title === 'projects.html' && <Projects />}
					</App>
				))}
			</main>

			{/* Taskbar */}
			<div className="window-border-top flex shrink-0 items-center gap-3 bg-[var(--window-background)] p-1">
				{/* Start button */}
				<div className="relative shrink-0">
					{isStartMenuOpen && (
						<div className="window absolute bottom-full left-0 z-[1000] mb-1 w-62 p-1">
							<div className="window-border-reverse max-h-80 overflow-y-auto bg-[var(--window-background)] p-1">
								<button
									type="button"
									onClick={() => {
										openAboutMeApp()
										setIsStartMenuOpen(false)
									}}
									className="window-button mb-1 flex w-full items-center gap-2 px-2 py-1 text-left"
								>
									<img
										src="/images/icons/text.png"
										alt="about-me.txt"
										className="h-5 w-5"
									/>
									<p>about-me.txt</p>
								</button>
								<button
									type="button"
									onClick={() => {
										openCvApp()
										setIsStartMenuOpen(false)
									}}
									className="window-button mb-1 flex w-full items-center gap-2 px-2 py-1 text-left"
								>
									<img
										src="/images/icons/document.png"
										alt="cv.pdf"
										className="h-5 w-5"
									/>
									<p>cv.pdf</p>
								</button>
								<button
									type="button"
									onClick={() => {
										openPictureApp()
										setIsStartMenuOpen(false)
									}}
									className="window-button mb-1 flex w-full items-center gap-2 px-2 py-1 text-left"
								>
									<img
										src="/images/icons/picture.png"
										alt="picture-of-me.png"
										className="h-5 w-5"
									/>
									<p>picture-of-me.png</p>
								</button>
								<button
									type="button"
									onClick={() => {
										openProjectsApp()
										setIsStartMenuOpen(false)
									}}
									className="window-button mb-1 flex w-full items-center gap-2 px-2 py-1 text-left"
								>
									<img
										src="/images/icons/browser.png"
										alt="projects.html"
										className="h-5 w-5"
									/>
									<p>projects.html</p>
								</button>
								<button
									type="button"
									onClick={() => {
										openTechStackFolderApp()
										setIsStartMenuOpen(false)
									}}
									className="window-button mb-1 flex w-full items-center gap-2 px-2 py-1 text-left"
								>
									<img
										src="/images/icons/folder.png"
										alt="Tech Stack Folder"
										className="h-5 w-5"
									/>
									<p>Tech Stack Folder</p>
								</button>
								<button
									type="button"
									onClick={() => {
										openUserInfoApp()
										setIsStartMenuOpen(false)
									}}
									className="window-button mb-1 flex w-full items-center gap-2 px-2 py-1 text-left"
								>
									<img
										src="/images/icons/operating-system.png"
										alt="User info"
										className="h-5 w-5"
									/>
									<p>User info</p>
								</button>
								<button
									type="button"
									onClick={() => {
										openWelcomeApp()
										setIsStartMenuOpen(false)
									}}
									className="window-button flex w-full items-center gap-2 px-2 py-1 text-left"
								>
									<img
										src="/images/icons/executable.png"
										alt="welcome.exe"
										className="h-5 w-5"
									/>
									<p>welcome.exe</p>
								</button>
							</div>
						</div>
					)}

					<button
						type="button"
						onClick={() => setIsStartMenuOpen((prev) => !prev)}
						className="window-button flex w-fit flex-row items-center gap-1 p-1"
					>
						<img
							src="/images/icons/operating-system.png"
							alt="Start menu"
							className="h-6 w-6"
						/>
						<p className="font-bold">Start</p>
					</button>
				</div>

				{/* Open apps */}
				<div className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden">
					<div className="flex w-max gap-1">
						{windows.map((window) => (
							<TaskbarApp
								key={window.id}
								title={window.title}
								iconName={window.iconName}
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
