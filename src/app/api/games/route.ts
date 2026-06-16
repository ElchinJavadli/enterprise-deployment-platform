import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTokenFromCookies } from "@/lib/auth";
import { z } from "zod";

const gameSchema = z.object({
  title: z.string().min(1),
  genre: z.string().min(1),
  description: z.string().min(10),
  imageUrl: z.string().url(),
});

export async function GET() {
  try {
    const games = await prisma.game.findMany({
      include: {
        _count: { select: { users: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ games });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const payload = getTokenFromCookies();

  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const result = gameSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const game = await prisma.game.create({ data: result.data });
    return NextResponse.json({ game }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create game" }, { status: 500 });
  }
}
