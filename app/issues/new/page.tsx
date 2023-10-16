"use client";
import React from "react";
import { useState } from "react";
import {
  Button,
  Callout,
  CalloutRoot,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  const [error, setError] = useState("");
  return (
    <div className="max-w-xl">
      <div className="bg-white">
        {error && (
          <Callout.Root color="red" className=" mb-5">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
      </div>
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("unexpected error");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input
            placeholder="Title"
            {...register("title")}
          ></TextField.Input>
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field}></SimpleMDE>
          )}
        ></Controller>
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
