import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  const note = await db.select().from(notesTable).where(eq(notesTable.userId, userId.id));

  const reverseNote = note.reverse();

  return NextResponse.json({ message: reverseNote });
}
