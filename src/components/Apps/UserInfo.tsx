export function UserInfo() {
	return (
		<div className="flex items-center gap-7 p-5">
			<img className="h-30" alt="System" src="/images/system.png" />

			<div>
				<p>General info:</p>
				<p className="ml-5">Son Bram van der Burg</p>
				<p className="ml-5">Full-stack web developer</p>
				<p className="mb-5 ml-5">17 years old</p>

				<p>Contact info:</p>
				<p className="ml-5">son@vdburg.site</p>
				<p className="mb-5 ml-5">+31 6 570 466 79</p>

				<p>Links</p>
				<a
					className="ml-5 text-blue-600 underline"
					href="https://www.linkedin.com/in/son-bram/"
					target="_blank"
				>
					LinkedIn
				</a>
				<br />
				<a
					className="ml-5 text-blue-600 underline"
					href="https://github.com/Penguin-09"
					target="_blank"
				>
					GitHub
				</a>
			</div>
		</div>
	)
}
