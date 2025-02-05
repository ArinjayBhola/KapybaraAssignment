import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (existingUser.length === 0) {
    const newUser = await db
      .insert(usersTable)
      .values({
        id: uuidv4(),
        name: name,
        email: email,
        password: password,
      })
      .returning({ id: usersTable.id });
    return NextResponse.json({ message: "User created successfully", newUser });
  }
  return NextResponse.json({ message: "Try Different Email" }, { status: 400 });
}
