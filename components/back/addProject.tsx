/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TextInput from "../formInputs/textInput";
import TextArea from "../formInputs/textArea";
import ImageInput from "../formInputs/imageInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../formInputs/submitButton";
import { Plus } from "lucide-react";
import addProject, { editProject } from "@/Actions/ProjectActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useProject } from "@/hooks/useProjects";

export const description =
  "A product edit page. The product edit page has a form to edit the product details, stock, product category, product status, and product images. The product edit page has a sidebar navigation and a main content area. The main content area has a form to edit the product details, stock, product category, product status, and product images. The sidebar navigation has links to product details, stock, product category, product status, and product images.";

export type ProjectProps = {
  title: string;
  description: string;
  id?: string;
  slug: string;
  gitLink?: string;
  liveLink: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
};

export function CreateProject({
  userData,
  oldId,
}: {
  userData?: ProjectProps;
  oldId?: string;
}) {
  const { project } = useProject(oldId as string);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectProps>({
    defaultValues: {
      title: project?.title,
      description: project?.description as string,
      slug: project?.slug,
      gitLink: project?.gitLink as string,
      liveLink: project?.liveLink,
      imageUrl: project?.imageUrl,
      userId: project?.userId as string,
    },
  });
  const [imageUrl, setImageUrl] = useState(
    userData?.imageUrl || "/profile2.jpg"
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const id = userData?.id;
  async function submit(data: ProjectProps) {
    data.imageUrl = imageUrl;
    data.slug = data.title.trim().split(" ").join("-").toLowerCase();
    if (userData) {
      try {
        setLoading(true);
        await editProject(
          {
            title: data.title,
            imageUrl: data.imageUrl,
            liveLink: data.liveLink,
            gitLink: data.gitLink as string,
            description: data.description,
            slug: data.slug,
          },
          id as string
        );
        toast.success("Project updated successfully.");
        router.push("/projects");
        router.refresh();
      } catch (error) {
        console.log(error);
        toast.error("failed to update Project");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        await addProject(data);
        toast.success("Project created successfully.");
        reset();
        router.push("/projects");
        router.refresh();
      } catch (error) {
        console.log(error);
        toast.error("failed to create the project.");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
          <form
            action=""
            onSubmit={handleSubmit(submit)}
            className=" grid max-w-[59rem] flex-1 auto-rows-max gap-4"
          >
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                {/* add product name and description */}
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <TextInput
                          register={register}
                          errors={errors}
                          label="Enter Project Name"
                          name="title"
                        />
                      </div>
                      <div className="grid gap-3">
                        <TextArea
                          register={register}
                          errors={errors}
                          label="Project Description"
                          name="description"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* add the project links */}
                <Card x-chunk="dashboard-07-chunk-1">
                  <CardHeader>
                    <CardTitle>Project Links</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {/* <div className="grid gap-3">
                        <TextInput
                          register={register}
                          errors={errors}
                          label="Project github Link"
                          name="gitLink"
                        />
                      </div> */}
                      <div className="grid w-full items-center gap-3">
                        <Label htmlFor="gitLink">Project github Link</Label>
                        <Input
                          type="link"
                          id="gitLink"
                          placeholder="Enter Project github Link"
                          className="w-full focus:ring-2 
                          text-sm
                          placeholder:text-gray-400 placeholder:text-sm focus:ring-inset
                          outline-none focus:ring-indigo-600"
                          {...register("gitLink")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <TextInput
                          register={register}
                          errors={errors}
                          label="Project live Link"
                          name="liveLink"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* image */}
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Project Thumbnail</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <ImageInput
                        title="Project Image"
                        imageUrl={imageUrl}
                        setImageUrl={setImageUrl}
                        endpoint="imageUploader"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card x-chunk="dashboard-07-chunk-5">
                  <CardHeader>
                    <CardTitle>Create Project</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userData ? (
                      <div>
                        <SubmitButton
                          size={"sm"}
                          className="w-full"
                          buttonIcon={Plus}
                          title="Update Project"
                          loadingTitle="updating..."
                          showIcon
                          loading={loading}
                        />
                      </div>
                    ) : (
                      <div>
                        <SubmitButton
                          size={"sm"}
                          className="w-full"
                          buttonIcon={Plus}
                          title="Create Project"
                          loadingTitle="creating..."
                          showIcon
                          loading={loading}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
