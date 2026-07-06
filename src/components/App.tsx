import type { ReactNode } from 'react'
import { useRef } from 'react'
import { Rnd } from 'react-rnd'

type AppProps = {
	title?: string
	children: ReactNode
	width?: number
	height?: number
	onClose?: () => void
	onMinimize?: () => void
	zIndex?: number
	onFocus?: () => void
	x?: number
	y?: number
	minimized?: boolean
}

const resizeHandles = {
	top: true,
	right: true,
	bottom: true,
	left: true,
	topRight: true,
	bottomRight: true,
	bottomLeft: true,
	topLeft: true,
} as const

export function App({
	title = 'App',
	children,
	width = 320,
	height = 200,
	onClose,
	onMinimize,
	zIndex,
	onFocus,
	x = 0,
	y = 0,
	minimized = false,
}: AppProps) {
	const rndRef = useRef<Rnd>(null)
	const isMaximizedRef = useRef(false)

	/**
	 * If the window is not maximized, maximize it. If the window is already maximized, restore it to its original size and position.
	 */
	function handleMaximizeToggle() {
		const rnd = rndRef.current
		if (!rnd) return

		if (isMaximizedRef.current) {
			rnd.updateSize({ width, height })
			rnd.updatePosition({ x: 0, y: 0 })
			isMaximizedRef.current = false
		} else {
			rnd.updateSize({ width: '100%', height: '100%' })
			rnd.updatePosition({ x: 0, y: 0 })
			isMaximizedRef.current = true
		}
	}

	return (
		<Rnd
			ref={rndRef}
			bounds="parent"
			className="box-border"
			style={{ zIndex, display: minimized ? 'none' : undefined }}
			default={{
				x,
				y,
				width,
				height,
			}}
			minWidth={160}
			minHeight={120}
			maxWidth="100%"
			maxHeight="100%"
			dragHandleClassName="window-titlebar"
			cancel=".window-button"
			enableResizing={resizeHandles}
			onMouseDown={onFocus}
			onDragStart={onFocus}
		>
			<div className="window flex h-full min-h-0 w-full flex-col overflow-hidden">
				{/* Header */}
				<div className="window-titlebar flex shrink-0 cursor-grab items-center justify-between gap-3 bg-[var(--header-active)] p-[3px] text-black active:cursor-grabbing">
					<span className="flex-1 truncate text-white">{title}</span>

					<div className="flex shrink-0 items-center">
						{/* Minimize Button */}
						<button
							aria-label="Minimize window"
							type="button"
							className="window-button flex h-6 w-6 cursor-pointer items-center justify-center font-bold"
							onClick={onMinimize}
						>
							-
						</button>

						<div className="flex items-center gap-1">
							{/* Maximize Button */}
							<button
								aria-label="Maximize window"
								type="button"
								className="window-button flex h-6 w-6 cursor-pointer items-center justify-center font-bold"
								onClick={handleMaximizeToggle}
							>
								<img
									src="/images/icons/window-maximize.svg"
									alt="Maximize window"
								/>
							</button>

							{/* Close Button */}
							<button
								aria-label="Close window"
								type="button"
								className="window-button flex h-6 w-6 cursor-pointer items-center justify-center font-bold"
								onClick={onClose}
							>
								X
							</button>
						</div>
					</div>
				</div>

				{/* Content */}
				<div className="min-h-0 flex-1 overflow-auto p-3 pt-2">{children}</div>
			</div>
		</Rnd>
	)
}
