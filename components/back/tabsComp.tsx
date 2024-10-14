"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignupForm } from "../signupPage";
import { UserProps } from "@/types/type";
import { useState } from "react";
import { updateUserPassword } from "@/Actions/userActions";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { Loader, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import PasswordInput from "../formInputs/password";

export function TabsComp({ data }: { data: UserProps }) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const id = data.id;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<any>();

  const handlePasswordChange = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    setError("");
    setIsLoading(true);

    try {
      const result = await updateUserPassword(
        id as string,
        data.currentPassword,
        data.newPassword
      );
      if (result.success) {
        reset();
        setIsLoading(false);
        toast.success("Password successfully updated.");
        // Optionally, redirect to login page or show a message about logging out
        // router.push('/login')
        signOut({ callbackUrl: "/login" });
      }
    } catch (error) {
      setError("An error occurred while updating the password");
      toast.error("Failed to update the password.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="account" className="max-w-xl mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <SignupForm initialData={data} />
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you{"'"}ll be logged out.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(handlePasswordChange)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <PasswordInput
                  register={register}
                  errors={errors}
                  label="Current Password"
                  name="currentPassword"
                  icon={Lock}
                  placeholder="Current password"
                />
              </div>
              <div className="space-y-2">
                <PasswordInput
                  register={register}
                  errors={errors}
                  label="New Password"
                  name="newPassword"
                  icon={Lock}
                  placeholder="New password"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </CardContent>
            <CardFooter>
              {isLoading ? (
                <Button
                  disabled
                  className="flex gap-1 items-center"
                  type="button"
                >
                  <Loader className="h-4 w-4 animate-spin text-white" />
                  updating...
                </Button>
              ) : (
                <Button type="submit">Update password</Button>
              )}
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
