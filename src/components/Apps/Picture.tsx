import { useState } from 'react'
import { Toolbar } from '../Toolbar'

export function Picture() {
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)

	return (
		<div className="flex h-full min-h-0 flex-col gap-2 text-white">
			<Toolbar />

			<div className="window-border-reverse relative min-h-0 flex-1 bg-black">
				{isLoading && !hasError && <p>Loading image...</p>}
				{hasError && <p>Could not load image.</p>}
				<img
					src="/images/portrait.JPG"
					alt="Portrait"
					onLoad={() => setIsLoading(false)}
					onError={() => {
						setIsLoading(false)
						setHasError(true)
					}}
					className={
						isLoading || hasError ? 'hidden' : 'h-full w-full object-contain'
					}
				/>
			</div>
		</div>
	)
}
