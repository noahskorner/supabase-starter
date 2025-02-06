"use server";

import { encodedRedirect } from "@/utils/encoded-redirect";
import { createServerClient } from "@/utils/create-server-client";
import { ROUTES } from "../routes";

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createServerClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      ROUTES.resetPassword,
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect("error", ROUTES.resetPassword, "Passwords do not match");
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect("error", ROUTES.resetPassword, "Password update failed");
  }

  encodedRedirect("success", ROUTES.dashboard, "Password updated");
};
