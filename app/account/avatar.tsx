'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null
  url: string | null
  size: number
  onUpload: (url: string) => void
}) {
  const supabase = createClient()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase])

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert('Error uploading avatar!')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {avatarUrl ? (
        <div className="relative overflow-hidden rounded-full border-4 border-gray-800 shadow-xl" style={{ width: size, height: size }}>
          <Image
            fill
            src={avatarUrl}
            alt="Avatar"
            className="object-cover"
          />
        </div>
      ) : (
        <div 
          className="bg-gray-800 rounded-full border-4 border-gray-700 flex items-center justify-center text-gray-500 shadow-inner" 
          style={{ height: size, width: size }}
        >
          <span className="text-4xl">?</span>
        </div>
      )}
      <div className="w-full">
        <label 
          className={`
            block w-full text-center px-4 py-2 rounded-lg cursor-pointer transition-all
            ${uploading 
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
              : 'bg-brand text-white hover:bg-brand-hover hover:shadow-lg'
            }
          `}
          htmlFor="single"
        >
          {uploading ? 'Uploading ...' : 'Upload Avatar'}
        </label>
        <input
          className="hidden"
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  )
}
