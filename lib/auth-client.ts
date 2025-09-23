// lib/auth-client.ts
// Client-side helpers
export { signIn, signOut, useSession } from "next-auth/react";

export { auth } from "@/lib/auth";
export function isAdmin(role?: string) {
  return role === "ADMIN" || role === "USER";
}
