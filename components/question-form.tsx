"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Checkbox } from "./ui/checkbox";
import { newQuestion } from "@/lib/actions";
import { toast } from "./ui/use-toast";
const items = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
] as const;

export const formSchema = z.object({
  Question: z.string().min(1, {
    message: "Question must be at least 1 characters.",
  }),
  "Answer 1": z.string().min(1, {
    message: "Answer must be at least 1 characters.",
  }),
  "Answer 2": z.string().min(1, {
    message: "Answer must be at least 1 characters.",
  }),
  "Answer 3": z.string().min(1, {
    message: "Answer must be at least 1 characters.",
  }),
  "Answer 4": z.string().min(1, {
    message: "Answer must be at least 1 characters.",
  }),
  items: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "At least one Answer must be correct",
  }),
});

export function QuestionForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Question: "",
      "Answer 1": "",
      "Answer 2": "",
      "Answer 3": "",
      "Answer 4": "",
      items: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = await newQuestion(values);
    if (res === "Created") {
      toast({
        title: "Success!",
        description: "Your question has been created, thank you!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Oh no!",
        description: "SHIT!",
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-h-svh"
      >
        <FormField
          control={form.control}
          name="Question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Input placeholder="Do you even lift?" {...field} />
              </FormControl>
              <FormDescription>Enter your question</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Answer 1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Input placeholder="Answer" {...field} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Answer 2"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{field.name}</FormLabel>
                <FormControl>
                  <Input placeholder="Answer" {...field} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="Answer 3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Input placeholder="Answer" {...field} value={field.value} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Answer 4"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Input placeholder="Answer" {...field} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p>Mark the correct answer(s)</p>
        <div className="flex gap-10">
          {items.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="items"
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormLabel>{item.id}:</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== item.id
                                )
                              );
                        }}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          ))}
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
