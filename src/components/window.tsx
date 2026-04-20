import type { ReactNode } from 'react'
import { useRef, useState } from 'react'
import { Rnd } from 'react-rnd'
import type { Position } from 'react-rnd'

type WindowProps = {
	title?: string
	children: ReactNode
	width?: number
	height?: number
}

type WindowSize = {
	width: number | string
	height: number | string
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

export function Window({
	title = 'Window',
	children,
	width = 320,
	height = 200,
}: WindowProps) {
	const rndRef = useRef<Rnd>(null)
	const [isMaximized, setIsMaximized] = useState(false)
	const [windowPosition, setWindowPosition] = useState<Position>({ x: 0, y: 0 })
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width,
		height,
	})

	const [restoreRect, setRestoreRect] = useState<{
		position: Position
		size: WindowSize
	} | null>(null)

	function handleMaximizeToggle() {
		const rnd = rndRef.current
		if (!rnd) return
		if (!isMaximized) {
			// Save current size + position before maximizing.
			setRestoreRect({
				position: windowPosition,
				size: windowSize,
			})
			rnd.updatePosition({ x: 0, y: 0 })
			rnd.updateSize({ width: '100%', height: '100%' })
			setWindowPosition({ x: 0, y: 0 })
			setWindowSize({ width: '100%', height: '100%' })
			setIsMaximized(true)
		} else {
			// Restore prior rectangle.
			if (restoreRect) {
				rnd.updateSize(restoreRect.size)
				rnd.updatePosition(restoreRect.position)
				setWindowSize(restoreRect.size)
				setWindowPosition(restoreRect.position)
			}
			setIsMaximized(false)
		}
	}

	return (
		<Rnd
			ref={rndRef}
			bounds="parent"
			className="box-border"
			default={{
				x: 0,
				y: 0,
				width,
				height,
			}}
			position={windowPosition}
			size={windowSize}
			minWidth={160}
			minHeight={120}
			dragHandleClassName="window-titlebar"
			cancel=".window-button"
			enableResizing={resizeHandles}
			onDragStop={(_event, data) => {
				if (!isMaximized) {
					setWindowPosition({ x: data.x, y: data.y })
				}
			}}
			onResizeStop={(_event, _direction, ref, _delta, position) => {
				if (!isMaximized) {
					setWindowSize({
						width: ref.offsetWidth,
						height: ref.offsetHeight,
					})
					setWindowPosition(position)
				}
			}}
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
						>
							-
						</button>

						<div className="flex items-center gap-1">
							{/* Maximize Button */}
							<button
								aria-label="Maximize window"
								type="button"
								className="window-button flex h-6 w-6 cursor-pointer items-center justify-center font-bold"
								onClick={() => handleMaximizeToggle()}
							>
								<img src="/icons/window-maximize.svg" alt="Maximize window" />
							</button>

							{/* Close Button */}
							<button
								aria-label="Close window"
								type="button"
								className="window-button flex h-6 w-6 cursor-pointer items-center justify-center font-bold"
							>
								X
							</button>
						</div>
					</div>
				</div>

				{/* Content */}
				<div className="min-h-0 flex-1 overflow-auto p-3">{children}</div>
			</div>
		</Rnd>
	)
}
