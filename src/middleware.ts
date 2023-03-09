import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const verrifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log(err);
    }));
  if (req.nextUrl.pathname.startsWith("/login") && !verrifiedToken) {
    return;
  }

  const url = req.url;

  if (url.includes("/login") && verrifiedToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!verrifiedToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/obavijesti", "/login"],
};
