import type { ReactNode } from 'react'

type WindowProps = {
	title: string
	children: ReactNode
}

export function Window({ title = 'Window', children }: WindowProps) {
	return (
		<div className="window m-3 w-fit">
			{/* Header */}
			<div className="flex items-center justify-center gap-3 bg-[var(--window-header-background)] p-[3px] text-center text-white">
				{title}

				<button className="window-button flex h-6 w-6 cursor-pointer items-center justify-center font-bold text-black">
					X
				</button>
			</div>

			{/* Content */}
			<div className="p-3">{children}</div>
		</div>
	)
}
