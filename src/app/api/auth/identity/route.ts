"use server";

import { getGuidToken, isUserLoggedIn } from "@/internal/auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const next = searchParams.get("next");

  const isLoggedIn = await isUserLoggedIn();

  if (!isLoggedIn) {
    if (next) {
      redirect(`/auth/login?next=${request.url}`);
    } else {
      redirect(`/auth/login`);
    }
  }

  let guid: string;

  try {
    guid = await getGuidToken();
  } catch (error) {
    if (next) {
      redirect(`/auth/login?next=${request.url}`);
    } else {
      redirect(`/auth/login`);
    }
  }

  if (next) {
    const nextURL = new URL(next);
    redirect(
      `http://${nextURL.host}/api/auth/callback?guid=${guid}&next=${next}`,
    );
  } else {
    redirect(`/auth/login`);
  }
}
