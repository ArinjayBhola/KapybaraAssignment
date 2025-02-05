import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);

  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  await db.delete(notesTable).where(eq(notesTable.id, id as string));

  return NextResponse.json({ message: "Success" });
}
