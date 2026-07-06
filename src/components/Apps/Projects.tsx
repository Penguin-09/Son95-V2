import { useState } from 'react'
import { Toolbar } from '../Toolbar'

type ProjectKey = 'kwoatle' | 'fighting-game' | 'type-it-down' | 'coach'

export function Projects() {
	const [selectedProject, setSelectedProject] = useState<ProjectKey | null>(
		null
	)

	return (
		<div className="flex h-full min-h-0 flex-col gap-2">
			<Toolbar
				special="projects"
				isBackToProjectsDisabled={selectedProject === null}
				onBackToProjects={() => setSelectedProject(null)}
			/>

			<div className="project-container window-border-reverse relative min-h-0 flex-1 overflow-y-auto">
				<style>{`
                    .project-container {
                        container-type: inline-size;
                    }
                    .project-media-row {
                        flex-direction: row;
                    }
                    @container (max-width: 420px) {
                        .project-media-row {
                            flex-direction: column;
                        }
                    }
                `}</style>

				<div
					className="relative z-10 flex min-h-full flex-col items-center bg-[length:150%_auto] bg-top bg-repeat-y p-2 px-5 text-center"
					style={{ backgroundImage: 'url(/images/clouds.png)' }}
				>
					{selectedProject === null ? (
						<div className="flex flex-col items-center gap-2">
							<p className="text-bold text-2xl">
								Welcome to Internet Explorer!
							</p>

							<p className="mb-5">
								Below is a list of links to some of the projects i have worked
								on during my time as a web developer.
							</p>

							<button
								type="button"
								onClick={() => setSelectedProject('kwoatle')}
								className="cursor-pointer text-blue-600 underline"
							>
								Kwoatle Mobile App
							</button>

							<button
								type="button"
								onClick={() => setSelectedProject('fighting-game')}
								className="cursor-pointer text-blue-600 underline"
							>
								Untitled Fighting Game
							</button>

							<button
								type="button"
								onClick={() => setSelectedProject('type-it-down')}
								className="cursor-pointer text-blue-600 underline"
							>
								Type It Down Project
							</button>

							<button
								type="button"
								onClick={() => setSelectedProject('coach')}
								className="cursor-pointer text-blue-600 underline"
							>
								Programming Camp Coach
							</button>

							<img className="w-80 pt-5" src="images/ad.png" />
						</div>
					) : null}

					{selectedProject === 'kwoatle' && (
						<div className="max-w-2xl">
							<h2 className="mb-2 text-2xl font-bold">Kwoatle Mobile App</h2>
							<p>
								With{' '}
								<a
									className="text-blue-600 underline"
									href="https://snev.dev/"
									target="_blank"
								>
									Sven Hoeksema
								</a>
							</p>
							<p>February 2025 - April 2025</p>
							<p>TypeScript / CSS / React / Expo</p>
							<div className="project-media-row flex items-center gap-2 p-3">
								<p>
									A mobile app developed together with a fellow student. This
									personal project was aimed at strengthening our skills in
									TypeScript and the React framework. The app is available to
									install for free on Google Play.
								</p>

								<img
									className="h-40 shadow"
									src="images/projects/kwoatle.png"
								/>
							</div>
							<a
								className="text-blue-600 underline"
								href="https://play.google.com/store/apps/details?id=com.snevver.Kwoatle&pcampaignid=web_share"
								target="_blank"
							>
								Google Play Store Page
							</a>{' '}
							|{' '}
							<a
								href="https://github.com/Snevver/Kwoatle"
								className="text-blue-600 underline"
								target="_blank"
							>
								GitHub Repository
							</a>{' '}
							|{' '}
							<a
								href="https://snev.dev/"
								className="text-blue-600 underline"
								target="_blank"
							>
								Sven Hoeksema
							</a>
						</div>
					)}

					{selectedProject === 'fighting-game' && (
						<div className="max-w-2xl">
							<h2 className="mb-2 text-2xl font-bold">
								Untitled Fighting Game
							</h2>
							<p>May 2026 - Now</p>
							<p>C# / Unity</p>
							<div className="project-media-row flex items-center gap-2 p-3">
								<p>
									I'm currently developing an arcade fighting game in Unity,
									inspired by titles like Tekken 8 and Sclash. It features 2D
									combat and original characters. The project is still in its
									early stages, but I plan to release it on Itch.io once it's
									complete.
								</p>

								<img
									className="h-40 shadow"
									src="images/projects/fighting-game.png"
								/>
							</div>
						</div>
					)}

					{selectedProject === 'type-it-down' && (
						<div className="max-w-2xl">
							<h2 className="mb-2 text-2xl font-bold">Type It Down Project</h2>
							<p>
								For{' '}
								<a
									className="text-blue-600 underline"
									href="https://www.assistive-innovations.com/"
									target="_blank"
								>
									Assistive Innovations
								</a>
							</p>
							<p>January 2025 - March 2025</p>
							<p>C++ / Arduino</p>
							<div className="project-media-row flex items-center gap-2 p-3">
								<p>
									I helped Assistive Innovations with the "Type It Down"
									research project. This project aims to develop a device that
									helps people with Parkinson's disease perform tasks like
									typing by stimulating muscles with vibrations. I assisted with
									the programming of these devices.
								</p>

								<img
									className="h-40 shadow"
									src="images/projects/type-it-down.png"
								/>
							</div>
							<a
								className="text-blue-600 underline"
								href="https://www.assistive-innovations.com/"
								target="_blank"
							>
								Assistive Innovations
							</a>{' '}
							|{' '}
							<a
								href="https://www.parkinson.nl/"
								className="text-blue-600 underline"
								target="_blank"
							>
								Parkinson.nl
							</a>
						</div>
					)}

					{selectedProject === 'coach' && (
						<div className="max-w-2xl">
							<h2 className="mb-2 text-2xl font-bold">
								Programming Camp Coach
							</h2>
							<p>
								For{' '}
								<a
									className="text-blue-600 underline"
									href="https://iqbegrijp.nl/"
									target="_blank"
								>
									IQ Begrijp
								</a>
							</p>
							<p>May 2025</p>
							<div className="project-media-row flex items-center gap-2 p-3">
								<p>
									I attended many programming camps throughout my childhood. In
									may 2025, i returned to one of these camps, not as a
									participant, but as a coach. Using the skills and knowledge i
									learned during my studies at Bit Academy, I helped guide
									participants through the fundamentals of programming.
								</p>

								<img
									className="h-40 shadow"
									src="images/projects/programming-camp.png"
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
