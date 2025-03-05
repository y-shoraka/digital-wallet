import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasWallet = req.cookies.get("hasWallet")?.value === "true";

  if (pathname === "/" || pathname == "/home") {
    if (hasWallet) {
      return NextResponse.redirect(new URL("/wallet", req.url));
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (pathname === "/login") {
    if (hasWallet) {
      return NextResponse.redirect(new URL("/wallet", req.url));
    }
  }

  if (pathname === "/wallet") {
    if (!hasWallet) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/", "/wallet", "/login"],
};
