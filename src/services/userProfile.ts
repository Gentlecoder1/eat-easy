import { supabase } from "../config/supabaseClient";

interface Profile {
  username: string;
  email: string;
  password: string;
  phone_number: string;
}

export async function submitProfile(profile: Profile) {
  const { data, error } = await supabase.auth.signUp({
    email: profile.email,
    password: profile.password,
    options: {
      data: {
        username: profile.username,
        phone_number: profile.phone_number,
      },
    },
  });

  if (error) throw error;
  return data;
}

export async function creatProfile(profile: Profile, userId: string) {
  const { data, error } = await supabase
    .from("eat_easy_profile")
    .insert({
      user_id: userId,
      username: profile.username,
      email: profile.email,
      phone_number: profile.phone_number,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
