import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";

// TODO: Add providers (Google, GitHub, credentials, etc.)
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as NextAuthOptions["adapter"],
  providers: [],
  session: { strategy: "jwt" },
  callbacks: {
    // TODO: Add session and jwt callbacks
  },
};
