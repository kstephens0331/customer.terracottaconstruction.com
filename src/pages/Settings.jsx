import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { supabase } from "../supabase";
import Sidebar from "../components/Sidebar";

function Settings() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const { data } = await supabase
        .from("customers")
        .select("*")
        .eq("email", user.email)
        .single();

      setProfile(data);
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 min-h-screen p-8">
        <div className="bg-white shadow rounded-xl p-6 max-w-xl mx-auto">
          <h1 className="text-2xl font-semibold text-[#c1440e] mb-6 border-b pb-2">Your Profile</h1>

          {profile ? (
            <ul className="space-y-3 text-sm text-gray-700">
              <li><strong>Full Name:</strong> {profile.name}</li>
              <li><strong>Email:</strong> {profile.email}</li>
              <li><strong>Phone:</strong> {profile.phone}</li>
              <li><strong>Address:</strong> {profile.address}</li>
              <li><strong>Account #:</strong> {profile.account_number}</li>
              <li><strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}</li>
            </ul>
          ) : (
            <p className="text-gray-500">Loading profile...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Settings;
