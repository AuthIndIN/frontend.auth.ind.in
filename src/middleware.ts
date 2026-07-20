import { NextRequest, NextResponse } from "next/server";
import { isUserLoggedIn } from "./internal/auth";

export async function middleware(request: NextRequest) {
	const isLoggedIn = await isUserLoggedIn();

	const path = request.nextUrl.pathname

	const isPublicPath = path === "/" || path === "/auth/login"

	if(isPublicPath && isLoggedIn) {
		return NextResponse.redirect(new URL("/auth/logout", request.nextUrl));
	}

	if(!isPublicPath && !isLoggedIn) {
		return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
	}
}

export const config = {
  	matcher: [
		"/",
		"/auth/login",
    "/auth/logout",
	]
}