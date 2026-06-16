import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTokenFromCookies } from "@/lib/auth";
import { z } from "zod";

const achievementSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export async function GET() {
  const payload = getTokenFromCookies();

  if (!payload) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const achievements = await prisma.achievement.findMany({
      where: { userId: payload.userId },
      orderBy: { earnedAt: "desc" },
    });
    return NextResponse.json({ achievements });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const payload = getTokenFromCookies();

  if (!payload) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = achievementSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const achievement = await prisma.achievement.create({
      data: { ...result.data, userId: payload.userId },
    });

    return NextResponse.json({ achievement }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create achievement" }, { status: 500 });
  }
}
