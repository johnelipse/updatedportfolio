"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TextInput from "./formInputs/textInput";
import PasswordInput from "./formInputs/password";
import SubmitButton from "./formInputs/submitButton";
import { Lock, UserRoundPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { UserProps } from "@/types/type";
import { useState } from "react";

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

export function SignupForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProps>();

  const [loading, setLoading] = useState(false);

  function submit(data: UserProps) {
    console.log(data);
    reset();
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action="" onSubmit={handleSubmit(submit)} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              register={register}
              errors={errors}
              label="First Name"
              name="firstName"
            />
            <TextInput
              register={register}
              errors={errors}
              label="Last Name"
              name="lastName"
            />
          </div>
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
            />
          </div>
          <SubmitButton
            size={"sm"}
            className="w-full"
            buttonIcon={UserRoundPlus}
            title="Signup"
            showIcon
            loading={loading}
          />
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
