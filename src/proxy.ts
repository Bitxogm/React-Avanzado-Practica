import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log("🍪 Session:", request.cookies.get("session-token"));
  const session = request.cookies.get("session-token");

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/ads/create"],
};
