import { useRef, type ReactNode } from 'react'
import Draggable from 'react-draggable'

type WindowProps = {
	title?: string
	children: ReactNode
}

export function Window({ title = 'Window', children }: WindowProps) {
	const nodeRef = useRef<HTMLDivElement>(null)

	return (
		<Draggable
			nodeRef={nodeRef}
			handle=".window-header"
			bounds="parent"
			cancel=".window-button"
		>
			<div ref={nodeRef} className="window w-fit">
				{/* Header */}
				<div className="window-header flex cursor-grab items-center justify-center gap-3 bg-[var(--window-header-background)] p-[3px] text-center text-black active:cursor-grabbing">
					<span className="text-white">{title}</span>

					<div className="flex items-center">
						{/* Minimize Button */}
						<button
							aria-label="Minimize window"
							type="button"
							className="window-button active:cursor-point flex h-6 w-6 cursor-pointer font-bold justify-center"
						>
							-
						</button>

						<div className="flex items-center gap-1">
							{/* Maximize Button */}
							<button
								aria-label="Maximize window"
								type="button"
								className="window-button active:cursor-point flex h-6 w-6 cursor-pointer items-center justify-center font-bold"
							>
								<img src="/icons/window-maximize.svg" alt="Maximize window" />
							</button>

							{/* Close Button */}
							<button
								aria-label="Close window"
								type="button"
								className="window-button active:cursor-point flex h-6 w-6 cursor-pointer items-center justify-center font-bold"
							>
								X
							</button>
						</div>
					</div>
				</div>

				{/* Content */}
				<div className="p-3">{children}</div>
			</div>
		</Draggable>
	)
}
