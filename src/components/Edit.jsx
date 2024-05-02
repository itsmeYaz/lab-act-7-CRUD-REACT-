"use client";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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

const FormSchema = z.object({
  name: z.string(),
  age: z.string().transform((val) => Number(val)),
});

const Edit = () => {
  const { id } = useParams();
  const [data, setData] = useState({ name: "", age: "" });
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data.name,
      age: data.age,
    },
  });

  //GET REQUEST
  useEffect(() => {
    axios
      .get(
        `https://thriving-syrniki-e5a1a8.netlify.app/.netlify/functions/api/${id}`,
      )
      .then((res) => {
        console.log(res.data);
        setData({ name: res.data.name, age: res.data.age });
        form.reset({ name: res.data.name, age: res.data.age.toString() });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  function onSubmit(datas) {
    console.log("btn click");

    axios
      .put(
        `https://thriving-syrniki-e5a1a8.netlify.app/.netlify/functions/api/${id}`,
        data,
      )
      .then((res) => {
        toast({
          title: "You updated the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(datas, null, 2)}
              </code>
            </pre>
          ),
        });
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  console.log(typeof data.age);

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
                    value={data.name}
                    onChange={(e) => {
                      // This will update the field value using react-hook-form
                      field.onChange(e);
                      // This will update your local state
                      setData((prevData) => ({
                        ...prevData,
                        name: e.target.value,
                      }));
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
                    value={data.age.toString()}
                    onChange={(e) => {
                      // This will update the field value using react-hook-form
                      field.onChange(e);
                      // This will update your local state
                      setData((prevData) => ({
                        ...prevData,
                        age: Number(e.target.value),
                      }));
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

export default Edit;
