"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function isUserLoggedIn(): Promise<boolean> {
  return (
    (await isAuthTokensExists()) &&
    (await isAuthTokensValid(await getAuthTokens()))
  );
}

export async function isAuthTokensExists(): Promise<boolean> {
  const cookiesStore = await cookies();
  return (
    cookiesStore.has("accessToken") &&
    cookiesStore.has("refreshToken") &&
    cookiesStore.has("guid")
  );
}

export async function getAuthTokens(): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  if (!(await isAuthTokensExists())) {
    throw new Error("Auth tokens doesn't exists.");
  }

  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken");
  const refreshToken = cookiesStore.get("refreshToken");

  if (accessToken == undefined || refreshToken == undefined) {
    throw new Error("Auth tokens doesn't exits.");
  }

  return {
    accessToken: accessToken.value,
    refreshToken: refreshToken.value,
  };
}

export async function isAuthTokensValid(authTokens: {
  accessToken: string;
  refreshToken: string;
}): Promise<boolean> {
  return true;
}

export async function getGuidToken() {
  const cookiesStore = await cookies();
  if (!cookiesStore.has("guid")) throw new Error("Guid doesn't exists.");

  const guid = cookiesStore.get("guid");
  if (guid == undefined) throw new Error("Guid doesn't exists.");
  return guid.value;
}

export async function loginUser(credentials: {
  username: string;
  password: string;
}) {
  const reqPayload = {
    username: credentials.username,
    password: credentials.password,
  };

  const reqConfig = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  try {
    const res = await axios.post(
      "https://dummyjson.com/auth/login",
      reqPayload,
      reqConfig,
    );

    if (res.status != 200) {
      return false;
    }

    const cookieStore = await cookies();
    cookieStore.set("accessToken", res.data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    cookieStore.set("refreshToken", res.data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    cookieStore.set("guid", crypto.randomUUID(), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
  } catch (error) {
    return false;
  }

  return true;
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("guid");
}
