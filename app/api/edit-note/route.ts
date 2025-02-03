import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { id, content } = await req.json();

  await db.update(notesTable).set({ content }).where(eq(notesTable.id, id));

  return NextResponse.json({ message: "Success" });
}
