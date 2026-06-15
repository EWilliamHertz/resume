import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const published = searchParams.get("published") === "true";

    const projects = await prisma.project.findMany({
      where: published ? { published: true } : undefined,
      orderBy: [
        { sortOrder: "asc" }, // Ascending: 0 comes first, then 1, 2, 3...
        { createdAt: "desc" }
      ],
    });

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, github, vercel, images, published, sortOrder } = await req.json();
    const project = await prisma.project.create({
      data: { 
        title, 
        description, 
        github, 
        vercel, 
        images, 
        published: published || false,
        sortOrder: parseInt(sortOrder) || 0
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, description, github, vercel, images, published, sortOrder } = await req.json();
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        github,
        vercel,
        ...(images && { images }),
        ...(published !== undefined && { published }),
        ...(sortOrder !== undefined && { sortOrder: parseInt(sortOrder) || 0 }),
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}