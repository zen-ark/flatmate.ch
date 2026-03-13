"use client";

import Link from "next/link";
import { ArrowRight, MessageCircleHeart, Sparkles, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const steps = [
  {
    title: "Share your vibe",
    description:
      "Answer a fast set of lifestyle questions: cleanliness, social energy, noise, schedule, and food habits.",
    icon: Sparkles,
  },
  {
    title: "Meet the people",
    description:
      "Browse WGs through current flatmates and group dynamics, not only room photos and square meters.",
    icon: Users,
  },
  {
    title: "Find your fit",
    description:
      "Start with a chemistry-first shortlist, then evaluate practical room details as a secondary filter.",
    icon: MessageCircleHeart,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <p className="text-lg font-semibold tracking-tight">flatmate.ch</p>
          <Link href="/app" className={buttonVariants({ variant: "outline" })}>
            Open MVP
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20 md:py-24">
          <p className="text-sm font-medium text-muted-foreground">
            Chemistry-first WG search in Switzerland
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Find your people, not just a room.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Traditional listings optimize for furniture and floor plans. We
            optimize for the humans you live with every day.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/app" className={buttonVariants({ size: "lg" })}>
              Start vibe onboarding
              <ArrowRight />
            </Link>
            <Link
              href="/app/feed"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              View sample matches
            </Link>
          </div>
        </section>

        <section className="border-y border-border/60 bg-muted/20">
          <div className="mx-auto grid w-full max-w-6xl gap-4 px-6 py-12 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.title}
                className="rounded-xl border border-border bg-card p-5"
              >
                <step.icon className="mb-3 size-5 text-primary" />
                <h2 className="mb-2 text-base font-semibold">{step.title}</h2>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
            <p className="text-sm text-muted-foreground">MVP now live</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              Landing page to onboarding to anti-listing feed
            </h3>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              The current MVP includes a quick vibe quiz and a feed seeded with
              10 mock WG listings, sorted by vibe match.
            </p>
            <div className="mt-6">
              <Link href="/app" className={buttonVariants({ size: "lg" })}>
                Enter the application
                <ArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
