import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";

export default async function ProfilesPage() {
  const supabase = await createClient();
  
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching profiles:", error);
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-5xl mx-auto space-y-12">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          User Profiles
        </h1>
        <p className="text-lg leading-8 text-gray-300">
          Discover and connect with other users in the community.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {profiles?.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
        {(!profiles || profiles.length === 0) && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-xl">No profiles found.</p>
          </div>
        )}
      </div>

      <div className="pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function ProfileCard({ profile }: { profile: any }) {
  const avatarUrl = profile.avatar_url
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${profile.avatar_url}`
    : null;

  return (
    <div className="bg-bg-surface p-8 rounded-2xl border border-gray-800 flex flex-col items-center text-center space-y-6 transition-all hover:border-brand/50 hover:shadow-2xl hover:shadow-brand/5 group">
      <div className="relative w-28 h-28">
        {avatarUrl ? (
          <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-gray-800 shadow-xl group-hover:border-brand/30 transition-colors">
            <Image
              fill
              src={avatarUrl}
              alt={`${profile.full_name || 'User'}'s avatar`}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-800 rounded-full border-4 border-gray-700 flex items-center justify-center text-gray-500 shadow-inner group-hover:border-brand/20 transition-colors">
            <span className="text-4xl font-bold">
              {profile.username?.[0]?.toUpperCase() || profile.full_name?.[0]?.toUpperCase() || "?"}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-white group-hover:text-brand transition-colors">
          {profile.full_name || "Anonymous"}
        </h2>
        <p className="text-brand font-medium">
          {profile.username ? `@${profile.username}` : "No username"}
        </p>
      </div>

      {profile.website && (
        <a
          href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700 hover:border-gray-600 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          {profile.website.replace(/^https?:\/\//, '')}
        </a>
      )}

      {profile.updated_at && (
        <p className="text-xs text-gray-500 pt-2">
          Last active: {new Date(profile.updated_at).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
