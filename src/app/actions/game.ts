"use server";

import { prisma } from "@/lib/prisma";
import { getTokenFromCookies } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const addGameSchema = z.object({
  title: z.string().min(1, "Title is required"),
  genre: z.string().min(1, "Genre is required"),
  description: z.string().min(10, "Description too short"),
  imageUrl: z.string().url("Valid image URL required"),
});

export async function addGameToLibrary(gameId: number) {
  const payload = getTokenFromCookies();
  if (!payload) return { error: "You must be logged in" };

  try {
    const existing = await prisma.userGame.findUnique({
      where: { userId_gameId: { userId: payload.userId, gameId } },
    });

    if (existing) return { error: "Game already in your library" };

    await prisma.userGame.create({
      data: { userId: payload.userId, gameId, hoursPlayed: 0, score: 0 },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { error: "Failed to add game" };
  }
}

export async function removeGameFromLibrary(gameId: number) {
  const payload = getTokenFromCookies();
  if (!payload) return { error: "You must be logged in" };

  try {
    const existing = await prisma.userGame.findUnique({
      where: { userId_gameId: { userId: payload.userId, gameId } },
    });

    if (!existing) return { error: "Game not found in your library" };

    await prisma.userGame.delete({
      where: { userId_gameId: { userId: payload.userId, gameId } },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { error: "Failed to remove game" };
  }
}

export async function createGame(formData: FormData) {
  const payload = getTokenFromCookies();
  if (!payload || payload.role !== "admin") return { error: "Admin only" };

  const data = {
    title: formData.get("title") as string,
    genre: formData.get("genre") as string,
    description: formData.get("description") as string,
    imageUrl: formData.get("imageUrl") as string,
  };

  const result = addGameSchema.safeParse(data);
  if (!result.success) return { error: result.error.errors[0].message };

  try {
    await prisma.game.create({
      data: {
        title: data.title,
        genre: data.genre,
        description: data.description,
        imageUrl: data.imageUrl,
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create game" };
  }
}
