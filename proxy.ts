import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LANDING_APP_URL =
  process.env.NEXT_PUBLIC_LANDING_URL || "http://localhost:3001";
const SESSION_COOKIE_NAME = "session_id";

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/session",
];

// API routes that should be accessible without auth
const PUBLIC_API_PREFIXES = ["/api/auth"];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if it's a public route
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route);
  const isPublicApiPrefix = PUBLIC_API_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isPublicRoute || isPublicApiPrefix) {
    return NextResponse.next();
  }

  // Get session cookie
  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  // If no session, redirect to landing app login with return URL
  if (!sessionId) {
    const loginUrl = new URL("/login", LANDING_APP_URL);
    loginUrl.searchParams.set("redirect", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Verify session by calling the session API
  try {
    const sessionCheckUrl = new URL("/api/auth/session", request.url);
    const sessionResponse = await fetch(sessionCheckUrl, {
      headers: {
        cookie: `${SESSION_COOKIE_NAME}=${sessionId}`,
      },
    });

    if (!sessionResponse.ok) {
      // Session invalid, redirect to login
      const loginUrl = new URL("/login", LANDING_APP_URL);
      loginUrl.searchParams.set("redirect", request.url);

      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(SESSION_COOKIE_NAME);
      return response;
    }

    // Session is valid, check if user is on root path
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Session is valid, allow request to proceed
    return NextResponse.next();
  } catch (_error) {
    // If session check fails, redirect to login
    const loginUrl = new URL("/login", LANDING_APP_URL);
    loginUrl.searchParams.set("redirect", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/auth).*)",
  ],
};
