import { Question } from "@/components/question";
import { QuestionForm } from "@/components/question-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/client";

import dynamic from "next/dynamic";

const Toaster = dynamic(() => import("../components/ui/toaster"), {
  ssr: false,
});
export default async function Home() {
  const { data } = await supabase.from("Questions").select(`
    id,
    question,
    answers,
    correctAnswers
  `);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <h1>Question:</h1>
        <Carousel className="-ml-1">
          <CarouselContent className="w-[500px]">
            {data?.map((q) => (
              <CarouselItem key={q.id}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Question q={q} />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <div className="mt-10">
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex justify-center">
              <Button variant="outline">Submit Question</Button>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new Question</DialogTitle>
              <DialogDescription>
                <QuestionForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Toaster />
    </main>
  );
}
