import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-2xl text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Supabase Auth + Storage
        </h1>
        <p className="text-lg leading-8 text-gray-300">
          Experience our Auth and Storage through a simple profile management example. Create a user
          profile and upload an avatar image. Fast, simple, secure.
        </p>
      </div>
      <div className="flex gap-4">
        <Link 
          href="/login"
          className="rounded-md bg-brand px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
        >
          Go to Auth page
        </Link>
        <Link 
          href="/profiles"
          className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 transition-colors"
        >
          View profiles
        </Link>
      </div>
    </div>
  )
}
