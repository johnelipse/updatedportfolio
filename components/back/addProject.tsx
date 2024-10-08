"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TextInput from "../formInputs/textInput";
import TextArea from "../formInputs/textArea";
import ImageInput from "../formInputs/imageInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectProps } from "@/types/type";
import SubmitButton from "../formInputs/submitButton";
import { Plus } from "lucide-react";

export const description =
  "A product edit page. The product edit page has a form to edit the product details, stock, product category, product status, and product images. The product edit page has a sidebar navigation and a main content area. The main content area has a form to edit the product details, stock, product category, product status, and product images. The sidebar navigation has links to product details, stock, product category, product status, and product images.";

export function CreateProject() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectProps>();
  const [imageUrl, setImageUrl] = useState("/profile2.jpg");
  const [loading, setLoading] = useState(false);

  function submit(data: ProjectProps) {
    data.imageUrl = imageUrl;
    console.log(data);
    reset();
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
                      <div className="grid gap-3">
                        <TextInput
                          register={register}
                          errors={errors}
                          label="Project github Link"
                          name="gitLink"
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
