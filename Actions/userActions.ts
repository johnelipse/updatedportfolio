"use server";
import { db } from "@/lib/db";
import { UserProps } from "@/types/type";
import { hashSync, compareSync } from "bcrypt-ts";
import toast from "react-hot-toast";

export async function createUser(data: UserProps) {
  const { firstName, lastName, email, imageUrl, password } = data;
  const existingUser = await db.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return {
      data: null,
      error: "user already exists",
      status: 409,
    };
  }
  const hashedPassword = hashSync(password, 10);
  const newUser = await db.user.create({
    data: { firstName, lastName, email, imageUrl, password: hashedPassword },
  });
  return {
    data: newUser,
    error: null,
    status: 201,
  };
}

export async function fetchSingleUser(id: string) {
  try {
    const userFetched = await db.user.findUnique({
      where: {
        id,
      },
    });
    return userFetched;
  } catch (error) {
    console.log(error);
  }
}

export async function editUserData(data: UserProps, id: string) {
  // console.log(id, data);
  try {
    const updatedUser = await db.user.update({
      where: {
        id,
      },

      data,
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserPassword(
  userId: string,
  currentPassword: string,
  newPassword: string
) {
  try {
    // Fetch the user
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Verify current password
    const isPasswordValid = compareSync(currentPassword, user.password);

    if (!isPasswordValid) {
      toast.error("Current password is incorrect");
      return { success: false, message: "Current password is incorrect" };
    }

    // Check if the new password is different from the current password
    const isNewPasswordSame = compareSync(newPassword, user.password);

    if (isNewPasswordSame) {
      toast.error("New password must be different from the current password");
      return {
        success: false,
        message: "New password must be different from the current password",
      };
    }

    // Hash the new password
    const hashedPassword = hashSync(newPassword, 10);

    // Update the user's password
    await db.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    toast.error("Error updating password");
    console.error("Error updating password:", error);
    return {
      success: false,
      message: "An error occurred while updating the password",
    };
  }
}
