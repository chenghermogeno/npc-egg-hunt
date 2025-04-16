import "server-only";
import { cache } from "react";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session.userId) {
    redirect("/");
  }

  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async (userId) => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
