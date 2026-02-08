import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  // Provide a helpful error and a safe no-op client to avoid uncaught exceptions in the UI.
  // Most likely cause: missing .env or dev server needs restart after adding env vars.
  // Log clear instructions for the developer.
  // eslint-disable-next-line no-console
  console.error(
    "Supabase keys missing: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env and restart the dev server.",
  );

  // Minimal fallback object that mirrors the supabase client interface portions used in this app.
  const noopInsert = async () => ({
    data: null,
    error: new Error("Supabase not configured"),
  });
  supabase = {
    from: () => ({ insert: noopInsert }),
    storage: {
      from: () => ({
        upload: async () => ({
          error: new Error("Supabase storage not configured"),
        }),
        getPublicUrl: () => ({ publicUrl: null }),
      }),
    },
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
export default supabase;
