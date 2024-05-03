import { NextResponse } from "next/server";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";

export async function GET() {
  const { user } = useUser();
  if (user) {
    const { accessToken } = await getAccessToken();
    return NextResponse.json({ user: accessToken });
  }
}
