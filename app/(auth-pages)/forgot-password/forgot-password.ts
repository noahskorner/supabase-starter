"use server";

import { encodedRedirect } from "@/utils/encoded-redirect";
import { createServerClient } from "@/utils/create-server-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES } from "../../routes";

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createServerClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", ROUTES.forgotPassword, "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}${ROUTES.auth.callback}?redirect_to=${ROUTES.resetPassword}`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      ROUTES.forgotPassword,
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    ROUTES.forgotPassword,
    "Check your email for a link to reset your password."
  );
};
