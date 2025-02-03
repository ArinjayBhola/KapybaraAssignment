import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { content, bgColor } = await req.json();

  const note = await db
    .insert(notesTable)
    .values({
      content: content,
      bgColor: bgColor,
    })
    .returning({ id: notesTable.id });

  return NextResponse.json({ message: note });
}
