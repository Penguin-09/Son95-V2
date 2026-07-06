import { useState } from 'react'
import { Toolbar } from '../Toolbar'

export function Cv() {
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)

	return (
		<div className="flex h-full min-h-0 flex-col gap-2">
			<Toolbar special="cv" />

			{isLoading && !hasError && (
				<p>
					Loading PDF...
					<br />
					If this doesn't work, consider opening the PDF in a new tab.
				</p>
			)}
			{hasError && <p>Could not load PDF preview.</p>}
			<embed
				src="/CV%20Son%20Bram%20van%20der%20Burg.pdf"
				type="application/pdf"
				onLoad={() => setIsLoading(false)}
				onError={() => {
					setIsLoading(false)
					setHasError(true)
				}}
				className={`${
					isLoading || hasError ? 'hidden' : ''
				} window-border-reverse min-h-0 flex-1 bg-white`}
			/>
		</div>
	)
}
