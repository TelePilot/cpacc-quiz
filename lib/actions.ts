"use server";

import { formSchema } from "@/components/question-form";
import { supabase } from "./client";
import { z } from "zod";

export async function newQuestion(v: z.infer<typeof formSchema>) {
  try {
    const res = await supabase.from("Questions").insert({
      question: v.Question,
      answers: [v["Answer 1"], v["Answer 2"], v["Answer 3"], v["Answer 4"]],
      correctAnswers: v.items,
    });
    return res.statusText;
  } catch (error) {
    return error;
  }
}
