import { getUserId } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const userId = await getUserId();

  console.log(userId);

  const publicRoutes: string[] = [
    '/login',
    '/onboarding',
  ]

  const path = request.nextUrl.pathname;
  const pageIsPublic =
    publicRoutes.some(urlPart => path.startsWith(urlPart));

  if (pageIsPublic) {
    console.log("PUBLIC PAGE NO REDIRECT");
  }

  if (!userId && !pageIsPublic) {
    console.log("LOGIN REDIRECT");
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (userId) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', userId);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Explicitly exclude login and static assets
    '/((?!login|_next/static|_next/image|favicon.ico).*)',
  ]
}
