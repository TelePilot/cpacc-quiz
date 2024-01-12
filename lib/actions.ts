"use server";

import { formSchema } from "@/components/question-form";
import { z } from "zod";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function newQuestion(v: z.infer<typeof formSchema>) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
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
