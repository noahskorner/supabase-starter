"use server";

import { encodedRedirect } from "@/utils/encoded-redirect";
import { createServerClient } from "@/utils/create-server-client";
import { headers } from "next/headers";
import { ROUTES } from "../../routes";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createServerClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      ROUTES.signUp,
      "Email and password are required"
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", ROUTES.signUp, error.message);
  } else {
    return encodedRedirect(
      "success",
      ROUTES.signUp,
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};
