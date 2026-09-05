import { createClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client, for the admin panel only.
 *
 * Uses the ANON key, which is designed to be public and ships in the bundle
 * like any other client config. It is not a secret and it is not a
 * vulnerability: the table has row level security enabled with no policy for
 * the anon role, so an anonymous request reads nothing. Access comes from
 * signing in, and the policies decide what a signed-in user may see.
 *
 * The SERVICE ROLE key is the opposite in every respect — it bypasses RLS
 * entirely and must never appear in anything under src/. It lives only in the
 * serverless function's environment.
 */
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** Whether the panel can work at all. Lets the page explain itself rather than
    throwing a blank screen when the project has not been wired up yet. */
export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;

export default supabase;
