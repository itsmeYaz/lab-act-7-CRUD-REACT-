"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  age: z
    .string()
    .transform((val) => Number(val))
    .refine((value) => value >= 7, {
      message: "you must be at least 7 years old.",
    }),
});

const Add = () => {
  const [inputData, setInputData] = useState({ name: "", age: 0 });
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      age: 7,
    },
  });

  function onSubmit(data) {
    console.log("btn click");

    axios
      .post(
        "https://thriving-syrniki-e5a1a8.netlify.app/.netlify/functions/api/",
        inputData,
      )
      .then((res) => {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="w-[70%] grid place-items-center mt-16">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Juan Dela Cruz"
                    {...field}
                    onChange={(e) => {
                      // This will update the field value using react-hook-form
                      field.onChange(e);
                      // This will update your local state
                      setInputData({ ...inputData, name: e.target.value });
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    placeholder="7"
                    {...field}
                    onChange={(e) => {
                      // This will update the field value using react-hook-form
                      field.onChange(e);
                      // This will update your local state
                      setInputData({
                        ...inputData,
                        age: Number(e.target.value),
                      });
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Add;
