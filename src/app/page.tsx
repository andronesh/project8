import AuthForm from "@/components/AuthForm";

export default function Home() {
  return (
    <div className="h-full bg-gray-900 text-gray-300">
      <div className="container mx-auto p-6 sm:p-12">
        <h1 className="text-lg md:text-xl text-white mb-6">
          Hello, please Log In to continue
        </h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
