import { useRef, type ReactNode } from 'react'
import Draggable from 'react-draggable'

type WindowProps = {
	title: string
	children: ReactNode
}

export function Window({ title = 'Window', children }: WindowProps) {
	const nodeRef = useRef<HTMLDivElement>(null)

	return (
		<Draggable nodeRef={nodeRef} handle="#window-header" bounds="parent" cancel=".window-button">
			<div ref={nodeRef} className="window w-fit">
				{/* Header */}
				<div
					id="window-header"
					className="flex cursor-grab items-center justify-center gap-3 bg-[var(--window-header-background)] p-[3px] text-center text-white active:cursor-grabbing"
				>
					{title}

					<button className="window-button active:cursor-point flex h-6 w-6 cursor-pointer items-center justify-center font-bold text-black">
						X
					</button>
				</div>

				{/* Content */}
				<div className="p-3">{children}</div>
			</div>
		</Draggable>
	)
}
