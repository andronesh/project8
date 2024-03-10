export default function Home() {
  return (
    <div className="main-h-screen bg-gray-900 text-gray-300">
      <div className="container mx-auto p-6 sm:p-12">
        <div className="flex justify-between items-start">
          <h1 className="text-4xl md:text-4xl text-white mb-6">
            Project<b>8</b>
          </h1>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
