"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { vibeCategories } from "@/lib/mvp-data";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, any>>({});

  const category = vibeCategories[step];
  const isFirst = step === 0;
  const isLast = step === vibeCategories.length - 1;
  const currentSelection = category ? selections[category.id] : undefined;

  // Validation: check if all sliders in current category have a value, or if a choice is made
  const isValid = category?.type === "slider" 
    ? category.sliders?.every(s => currentSelection?.[s.id] !== undefined)
    : !!currentSelection;

  function select(optionId: string) {
    if (!category || category.type !== "choice") return;
    setSelections((prev) => ({ ...prev, [category.id]: optionId }));
  }

  function handleSliderChange(sliderId: string, value: number) {
    if (!category || category.type !== "slider") return;
    setSelections((prev) => ({
      ...prev,
      [category.id]: {
        ...(prev[category.id] || {}),
        [sliderId]: value
      }
    }));
  }

  function next() {
    if (!isValid) return;
    if (isLast) {
      localStorage.setItem("flatmate-vibe", JSON.stringify(selections));
      router.push("/app/feed");
    } else {
      setStep((s) => s + 1);
    }
  }

  function back() {
    if (!isFirst) setStep((s) => s - 1);
  }

  if (!category) return null;

  const progress = ((step + 1) / vibeCategories.length) * 100;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border/40 px-6 py-4">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <span className="text-lg font-semibold tracking-tight">
            flatmate<span className="text-primary/60">.ch</span>
          </span>
          <span className="text-sm text-muted-foreground">
            {step + 1} / {vibeCategories.length}
          </span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground text-center">
            {category.label}
          </p>
          <h1 className="mb-10 text-2xl font-bold tracking-tight md:text-3xl text-center">
            {category.description}
          </h1>

          <div className="grid gap-6">
            {category.type === "choice" ? (
              <div className="grid gap-3">
                {category.options?.map((option) => {
                  const selected = currentSelection === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => select(option.id)}
                      className={`flex items-center gap-4 rounded-xl border-2 px-5 py-4 text-left transition-all ${
                        selected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:border-primary/40 hover:bg-muted/50"
                      }`}
                    >
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="flex-1 text-base font-medium">
                        {option.label}
                      </span>
                      {selected && <Check className="size-5 text-primary" />}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="grid gap-10">
                {category.sliders?.map((slider) => {
                  const val = currentSelection?.[slider.id] ?? slider.min;
                  return (
                    <div key={slider.id} className="space-y-4">
                      <div className="flex justify-between items-end">
                        <label className="text-base font-semibold">{slider.label}</label>
                        <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {val} {slider.unit}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={slider.min}
                        max={slider.max}
                        step={slider.step}
                        value={val}
                        onChange={(e) => handleSliderChange(slider.id, parseInt(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Navigation */}
      <footer className="border-t border-border/40 px-6 py-4">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <button
            onClick={back}
            disabled={isFirst}
            className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:invisible"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
          <button
            onClick={next}
            disabled={!isValid}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40 disabled:hover:bg-primary"
          >
            {isLast ? "See matches" : "Next"}
            <ArrowRight className="size-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
