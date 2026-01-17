'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { type User } from '@supabase/supabase-js'
import Avatar from './avatar'

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 bg-bg-surface rounded-xl shadow-2xl border border-gray-800 space-y-6">
      <div className="flex justify-center">
        <Avatar
          uid={user?.id ?? null}
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url)
            updateProfile({ fullname, username, website, avatar_url: url })
          }}
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
          <input 
            id="email" 
            type="text" 
            value={user?.email} 
            disabled 
            className="w-full px-4 py-2 bg-black/30 border border-gray-800 rounded-lg text-gray-500 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-sm font-medium text-gray-400">Full Name</label>
          <input
            id="fullName"
            type="text"
            value={fullname || ''}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-medium text-gray-400">Username</label>
          <input
            id="username"
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="website" className="text-sm font-medium text-gray-400">Website</label>
          <input
            id="website"
            type="url"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all text-white"
          />
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-gray-800">
        <button
          className="w-full px-4 py-2 bg-brand text-white font-medium rounded-lg hover:bg-brand-hover transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-brand focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => updateProfile({ fullname, username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update Profile'}
        </button>

        <form action="/auth/signout" method="post">
          <button 
            className="w-full px-4 py-2 bg-transparent border border-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 focus:ring-offset-gray-900" 
            type="submit"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}
