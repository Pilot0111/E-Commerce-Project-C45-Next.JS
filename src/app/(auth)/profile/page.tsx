"use client";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";


interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user?.id) {
      setLoading(false);
      return;
    }
    setProfile({
      _id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role,
    });

    setLoading(false);
  }, [session, status]);

  if (loading) {
    return (
      <section className="py-20 text-center">
        <div className="text-lg">Loading profile...</div>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="py-20 text-center">
        <div className="text-lg mb-4">You must be logged in</div>
        <Button asChild variant="destructive">
          <Link href="/login">Sign In</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-lg bg-white rounded-2xl shadow p-8">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${profile.name}&background=random`}
              alt={profile.name}
            />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <h2 className="text-2xl font-semibold">{profile.name}</h2>
          <p className="text-gray-500">{profile.email}</p>
          <p className="text-sm text-gray-400 mt-1">Role: {profile.role}</p>

          <div className="mt-6 flex gap-4">
            <Button asChild>
              <Link href="/reset-password">Reset Password</Link>
            </Button>
            <Button variant="outline" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
