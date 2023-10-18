"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue){
        await axios.patch(`/api/issues/${issue.id}`, data);
      } 
      else{
        await axios.post("/api/issues", data);
        router.push("/issues");
        router.refresh()
      }
    } catch (error) {
      setSubmitting(false);
      setError("unexpected error");
      console.log("unexpected error", error);
    }
  });
  return (
    <div className="max-w-xl">
      <div className="bg-white">
        {error && (
          <Callout.Root color="red" className=" mb-5">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
      </div>
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          ></TextField.Input>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          defaultValue={issue?.description}
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field}></SimpleMDE>
          )}
        ></Controller>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner></Spinner>}{" "}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
