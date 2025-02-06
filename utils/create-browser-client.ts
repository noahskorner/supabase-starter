import { createBrowserClient as c } from "@supabase/ssr";

export const createBrowserClient = () =>
  c(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
