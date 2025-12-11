'use client'

import { getUserId, isAuthenticated } from "@/utils/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const PUBLIC_ROUTES = [
  '/login',
  '/onboarding',
]

export function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const pageIsPublic =
    PUBLIC_ROUTES.some(urlPart => pathname.startsWith(urlPart));

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();

      if (!authenticated && !pageIsPublic) {
        router.push('/login');
      }
    };

    checkAuth();

  }, [router, pathname]);

  return <>{children}</>
}
