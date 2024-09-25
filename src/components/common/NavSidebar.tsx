import Link from "next/link";
import ProjectsSidebarList from "../project/ProjectsSidebarList";

export default async function NavSidebar() {
	return (
		<>
			<button
				data-drawer-target="default-sidebar"
				data-drawer-toggle="default-sidebar"
				aria-controls="default-sidebar"
				type="button"
				className="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			>
				<span className="sr-only">Open sidebar</span>
				<svg
					className="h-6 w-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clipRule="evenodd"
						fillRule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
					></path>
				</svg>
			</button>
			<aside
				id="default-sidebar"
				className="fixed left-0 top-0 z-10 h-screen w-44 -translate-x-full transition-transform sm:translate-x-0"
				aria-label="Sidebar"
			>
				<div className="h-full overflow-y-auto bg-gray-50 p-2 dark:bg-gray-800">
					<ul className="space-y-2 font-medium">
						<li>
							<Link
								href="/dashboard"
								className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
							>
								<svg
									className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 22 21"
								>
									<path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
									<path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
								</svg>
								<span className="ms-3">Dashboard</span>
							</Link>
						</li>
						<li>
							<Link
								href="/dashboard"
								className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 616"
									fill="currentColor"
									aria-hidden="true"
									className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								>
									<path d="M32 32H480c17.7 0 32 14.3 32 32V96c0 17.7-14.3 32-32 32H32C14.3 128 0 113.7 0 96V64C0 46.3 14.3 32 32 32zm0 128H480V416c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V160zm128 80c0 8.8 7.2 16 16 16H336c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z" />
								</svg>
								<span className="ms-3 flex-1 whitespace-nowrap">Projects</span>
							</Link>
							<ProjectsSidebarList />
						</li>
						<li>
							<Link
								href="/rescueTiktokLinks"
								className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
							>
								<svg
									fill="currentColor"
									className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
									viewBox="0 0 32 32"
									version="1.1"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
									<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
									<g id="SVGRepo_iconCarrier">
										<title>tiktok</title>
										<path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path>{" "}
									</g>
								</svg>
								<span className="ms-3">TT Links</span>
							</Link>
						</li>
						<li>
							<Link
								href="/sync"
								className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
							>
								<svg
									fill="currentColor"
									className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
									viewBox="0 0 22 22"
									version="1.1"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M9 13.2222L10.8462 15L15 11M8.4 19C5.41766 19 3 16.6044 3 13.6493C3 11.2001 4.8 8.9375 7.5 8.5C8.34694 6.48637 10.3514 5 12.6893 5C15.684 5 18.1317 7.32251 18.3 10.25C19.8893 10.9449 21 12.6503 21 14.4969C21 16.9839 18.9853 19 16.5 19L8.4 19Z"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
								</svg>
								<span className="ms-3">Events Sync</span>
							</Link>
						</li>
					</ul>
					<ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 font-medium dark:border-gray-700">
						<li>
							<form action="/auth/signout" method="post">
								<button
									type="submit"
									className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
										fill="currentColor"
										aria-hidden="true"
										className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
									>
										<path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
									</svg>
									<span className="ms-3 flex-1 whitespace-nowrap">Sign Out</span>
								</button>
							</form>
						</li>
					</ul>
				</div>
			</aside>
		</>
	);
}
