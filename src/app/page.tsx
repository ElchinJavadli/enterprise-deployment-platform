import Link from "next/link";

export default function HomePage() {
  return (
    

    
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">

      <h1 className="text-5xl font-bold text-white mb-4">
        Welcome to <span className="text-purple-400">GameVault</span>
      </h1>
      <p className="text-gray-400 text-lg mb-8 max-w-xl">
        Build your personal game library, track achievements, and compete on the leaderboard.
      </p>
      <div className="flex gap-4">
        <Link
          href="/register"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Get Started
        </Link>
        <Link
          href="/login"
          className="border border-gray-600 hover:border-gray-400 text-gray-300 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}