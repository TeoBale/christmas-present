"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, FormEvent } from "react";
import { useScene } from "@/context/scene-context";

interface ChallengeInputProps {
    href: string;
    solution: string;
}

export const ChallengeInput = ({ href, solution }: ChallengeInputProps) => {
    const [input, setInput] = useState("");
    const [status, setStatus] = useState<"idle" | "correct" | "incorrect">("idle");

    const {nextPhase} = useScene();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (input.trim() === solution.trim()) {
            setStatus("correct");
            setTimeout(() => {
                nextPhase();
            }, 1000);

        } else {
            setStatus("incorrect");
        }
    };

    return (
        <div className="flex flex-col gap-4 items-start">
            <Button variant="link" onClick={() => window.open(href, "_blank")}>
                Get your puzzle input
                <ArrowUpRight />
            </Button>
            <form 
                onSubmit={onSubmit}
                className={`w-full flex flex-row items-center justify-center border rounded-md transition-all duration-300 ${
                status === "correct" ? "border-green-500 ring-2 ring-green-500/20" : 
                status === "incorrect" ? "border-red-500 ring-2 ring-red-500/20" : 
                "border-border"
            }`}>
                <Input
                    placeholder="Place your solution here..."
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        if (status !== "idle") setStatus("idle");
                    }}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                />
                <Button 
                    type="submit"
                    size="lg" 
                    className={`rounded-l-none m-0 border-l border-black transition-colors ${
                        status === "correct" ? "bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600" : 
                        status === "incorrect" ? "bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600" : 
                        "bg-black hover:bg-black/90"
                    }`}
                >
                    Submit
                </Button>
            </form>
            <div className="h-20"></div>
        </div>
    );
};
