import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const { content, bgColor, userId, dueDate } = await req.json();

  const note = await db
    .insert(notesTable)
    .values({
      id: uuidv4(),
      content: content,
      bgColor: bgColor,
      userId: userId.id,
      dueDate: dueDate,
    })
    .returning({ id: notesTable.id });

  return NextResponse.json({ message: note });
}
