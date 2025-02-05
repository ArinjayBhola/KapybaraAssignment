import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await db.select().from(usersTable).where(eq(usersTable.email, email));

  if (user.length === 0) {
    return NextResponse.json({ message: "Try Different Email" }, { status: 400 });
  }

  if (user[0].password !== password) {
    return NextResponse.json({ message: "Incorrect Password" }, { status: 400 });
  }

  return NextResponse.json({ id: user[0].id });
}
