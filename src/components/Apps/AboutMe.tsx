import { Toolbar } from '../Toolbar'

export function AboutMe() {
	return (
		<div className="flex h-full min-h-0 flex-col gap-2">
			<Toolbar />

			<div className="window-border-reverse min-h-0 flex-1 overflow-y-auto bg-white p-3">
				<p>
					-------------------
					<br />
					ABOUT ME
					<br />
					-------------------
					<br />
					I've been coding from a young age and have always been fascinated by
					websites and applications. In my free time, you’ll probably find me
					bouldering, gaming, or working on one of my own side projects.
					<br />
					<br />
					After a two-year journey studying Software Development at Bit Academy,
					followed by an eight-month internship, I graduated cum laude and can
					now proudly call myself a web developer. During my education,
					internship, and many personal projects, i learned a lot about
					everything that goes into building applications. I'm excited to apply
					those skills in a professional environment and continue growing as a
					developer.
					<br />
					<br />
					Check out my CV to learn more about me!
				</p>
			</div>
		</div>
	)
}
