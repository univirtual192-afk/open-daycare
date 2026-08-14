import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createClient = () =>
  createBrowserClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return document.cookie.split("; ").reduce((acc, cookie) => {
            const [name, value] = cookie.split("=");
            acc.push({ name, value });
            return acc;
          }, [] as { name: string; value: string }[]);
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            let cookie = `${name}=${value}`;
            if (options?.path) cookie += `; path=${options.path}`;
            if (options?.maxAge) cookie += `; max-age=${options.maxAge}`;
            if (options?.expires) cookie += `; expires=${options.expires.toUTCString()}`;
            if (options?.domain) cookie += `; domain=${options.domain}`;
            if (options?.secure) cookie += "; secure";
            if (options?.sameSite) cookie += `; samesite=${options.sameSite}`;
            document.cookie = cookie;
          });
        },
      },
    },
  );
