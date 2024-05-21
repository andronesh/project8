import AuthForm from "@/components/AuthForm";

export default function Home() {
	return (
		<div className="h-full bg-gray-900 text-gray-300">
			<div className="container mx-auto p-6 sm:p-12">
				<h1 className="mb-6 text-lg text-white md:text-xl">Hello, please Log In to continue</h1>
				<div className="rounded-lg bg-gray-800 p-6 shadow-lg">
					<AuthForm appBaseUrl={process.env.APP_URL_BASE} />
				</div>
			</div>
		</div>
	);
}
