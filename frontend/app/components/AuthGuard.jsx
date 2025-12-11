'use client'

import { getUserId } from "@/utils/auth";
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
      const userId = await getUserId();

      if (!userId && !pageIsPublic) {
        router.push('/login');
      }
    };

    checkAuth();

  }, [router, pathname]);

  return <>{children}</>
}
