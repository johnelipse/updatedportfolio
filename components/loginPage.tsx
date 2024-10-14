"use client";
import PasswordInput from "@/components/formInputs/password";
import TextInput from "@/components/formInputs/textInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import SubmitButton from "./formInputs/submitButton";
import { useState } from "react";
import { LoginProps } from "@/types/type";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'.";

export function LoginForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function submit(data: LoginProps) {
    reset();
    try {
      setLoading(true);
      console.log("Attempting to sign in with credentials:", data);
      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      console.log("SignIn response:", loginData);
      if (loginData?.error) {
        setLoading(false);
        toast.error("Sign-in error: Check your credentials");
      } else {
        // Sign-in was successful

        reset();
        setLoading(false);
        toast.success("Login Successful");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Its seems something is wrong with your Network");
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <form action="" onSubmit={handleSubmit(submit)}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <TextInput
              register={register}
              errors={errors}
              label="Enter Email"
              name="email"
            />
          </div>
          <div className="grid gap-2">
            <PasswordInput
              register={register}
              errors={errors}
              label="Enter Password"
              name="password"
              icon={Lock}
              placeholder="password"
              forgotPasswordLink="/forgot-password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton
            size={"sm"}
            className="w-full"
            buttonIcon={LogIn}
            title="Login"
            showIcon
            loading={loading}
          />
        </CardFooter>
      </form>
    </Card>
  );
}
