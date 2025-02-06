"use server";

import { createServerClient } from "@/utils/create-server-client";
import { redirect } from "next/navigation";
import { ROUTES } from "../routes";

export const signOutAction = async () => {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  return redirect(ROUTES.signIn);
};
