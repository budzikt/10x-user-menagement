import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm p-8 bg-bg-surface rounded-xl shadow-2xl border border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            required 
            className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
            placeholder="you@example.com"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-400">Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            required 
            className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
            placeholder="••••••••"
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button 
            formAction={login}
            className="flex-1 px-4 py-2 bg-brand text-white font-medium rounded-lg hover:bg-brand-hover transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-brand focus:ring-offset-gray-900"
          >
            Log in
          </button>
          <button 
            formAction={signup}
            className="flex-1 px-4 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 focus:ring-offset-gray-900"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  )
}