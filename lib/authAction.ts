"use server";

import { signIn } from "@/auth";
import { signOut } from "next-auth/react";

export const login = async () => {
  await signIn("google", { redirectTo: "/dashboard" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
