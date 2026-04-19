import { Window } from '../components'

function App() {
	return (
		<div>
			<Window title="Window">
				<div>test</div>
			</Window>

			{/* Taskbar */}
			<div className="window-border-top absolute right-0 bottom-0 left-0 h-10 bg-[var(--window-background)]"></div>
		</div>
	)
}

export default App
