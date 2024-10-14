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
import ImageInput from "./formInputs/imageInput";
import { createUser, editUserData } from "@/Actions/userActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

export function SignupForm({ initialData }: { initialData?: UserProps }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProps>({ defaultValues: initialData });

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    initialData?.imageUrl || "/profile2.jpg"
  );
  const [userErr, setUserErr] = useState("");
  const router = useRouter();
  const id = initialData?.id;

  async function submit(data: UserProps) {
    data.imageUrl = imageUrl;
    if (initialData) {
      try {
        setLoading(true);
        await editUserData(
          {
            firstName: data.firstName,
            lastName: data.lastName,
            imageUrl: data.imageUrl,
            email: data.email,
            password: data.password,
          },
          id as string
        );
        toast.success("updated successfullly..");
      } catch (error) {
        console.log(error);
        toast.error("failed to update your data");
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        reset();
        setLoading(true);
        const res = await createUser(data);
        if (res && res.status === 409) {
          setUserErr("Email already exists");
          toast.error("Email already exists..");
        } else if (res && res.status === 201) {
          toast.success("user created successfully..");
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Card className="mx-auto ">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action="" onSubmit={handleSubmit(submit)} className="grid gap-4">
          <div className="grid gap-2">
            <ImageInput
              title="Project Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="imageUploader"
            />
          </div>
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
          {initialData ? (
            ""
          ) : (
            <div className="">
              <TextInput
                register={register}
                errors={errors}
                label="Enter Email"
                name="email"
              />
              {userErr && (
                <span className="text-xs my-2 text-red-600">{userErr}</span>
              )}
            </div>
          )}
          {initialData ? (
            ""
          ) : (
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
          )}
          <SubmitButton
            size={"sm"}
            className="w-full"
            buttonIcon={UserRoundPlus}
            title={initialData ? "Update User" : "Signup"}
            showIcon
            loading={loading}
          />
        </form>
        {initialData ? (
          ""
        ) : (
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
