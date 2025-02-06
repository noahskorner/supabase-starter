import { hasEnvVars } from "@/utils/check-env-vars";
import Link from "next/link";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { createServerClient } from "@/utils/create-server-client";
import { signOutAction } from "./(auth-pages)/sign-out";
import { ROUTES } from "./routes";

export default async function Header() {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={ROUTES.home}>Next.js Supabase Starter</Link>
        </div>
        {!hasEnvVars ? (
          <>
            <div className="flex gap-4 items-center">
              <div>
                <Badge
                  variant={"default"}
                  className="font-normal pointer-events-none"
                >
                  Please update .env.local file with anon key and url
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  asChild
                  size="sm"
                  variant={"outline"}
                  disabled
                  className="opacity-75 cursor-none pointer-events-none"
                >
                  <Link href={ROUTES.signIn}>Sign in</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant={"default"}
                  disabled
                  className="opacity-75 cursor-none pointer-events-none"
                >
                  <Link href={ROUTES.signUp}>Sign up</Link>
                </Button>
              </div>
            </div>
          </>
        ) : user ? (
          <div className="flex items-center gap-4">
            Hey, {user.email}!
            <form action={signOutAction}>
              <Button type="submit" variant={"outline"}>
                Sign out
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button asChild size="sm" variant={"outline"}>
              <Link href={ROUTES.signIn}>Sign in</Link>
            </Button>
            <Button asChild size="sm" variant={"default"}>
              <Link href={ROUTES.signUp}>Sign up</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
