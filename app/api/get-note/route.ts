import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST() {
  const note = await db.select().from(notesTable);

  const reverseNote = note.reverse();

  return NextResponse.json({ message: reverseNote });
}
