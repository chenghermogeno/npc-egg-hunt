"use server";

import { SignupFormSchema } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signup(formData) {
  const validatedFields = SignupFormSchema.safeParse({
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, email } = validatedFields.data;

  // Check if the email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      errors: {
        email: "This email is already in use. Please use a different email.",
      },
    };
  }

  // Create the new user
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
    },
  });

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  await createSession(user.id);

  redirect("/"); // Redirect after successful signup
}

export async function addStamp(userId, categoryName) {
  // Step 1: Find the category by name
  const category = await prisma.category.findUnique({
    where: { name: categoryName },
  });

  if (!category) {
    throw new Error("Category does not exist.");
  }

  // Step 2: Count how many stamps the user already has for this category
  const existingCount = await prisma.stamp.count({
    where: {
      userId,
      categoryId: category.id,
    },
  });

  // Step 3: Prevent adding if count is already 8
  if (existingCount >= 8) {
    console.warn(`User ${userId} already has 8 stamps in ${categoryName}`);
    return {
      message: "Max stamps reached for this category.",
    };
  }

  // Step 4: Add new stamp
  await prisma.stamp.create({
    data: {
      userId,
      categoryId: category.id,
    },
  });

  revalidatePath("/");

  return { message: "Stamp added successfully." };
}
