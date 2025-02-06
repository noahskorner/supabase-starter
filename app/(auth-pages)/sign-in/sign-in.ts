"use server";

import { encodedRedirect } from "@/utils/encoded-redirect";
import { createServerClient } from "@/utils/create-server-client";
import { redirect } from "next/navigation";
import { ROUTES } from "../../routes";

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", ROUTES.signIn, error.message);
  }

  return redirect(ROUTES.dashboard);
};
