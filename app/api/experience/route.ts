import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const published = searchParams.get("published") === "true";

    const experiences = await prisma.workExperience.findMany({
      where: published ? { published: true } : undefined,
      orderBy: [
        { sortOrder: "asc" },
        { startDate: "desc" }
      ],
    });
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Extract 'id' so it isn't passed to Prisma during creation
    const { id, ...data } = await req.json();
    const exp = await prisma.workExperience.create({ data });
    return NextResponse.json(exp, { status: 201 });
  } catch (error) {
    console.error("Experience POST Error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Separate 'id' for the where clause to prevent payload conflicts
    const { id, ...data } = await req.json();
    const exp = await prisma.workExperience.update({ where: { id }, data });
    return NextResponse.json(exp);
  } catch (error) {
    console.error("Experience PUT Error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.workExperience.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}