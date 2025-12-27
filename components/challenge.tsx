"use client";

import { ScrollArea } from "./ui/scroll-area";
import { useScene } from "@/context/scene-context";
import { ReactNode, useRef, useEffect, ElementRef } from "react";


interface ChallengeProps {
    mdxContents: Record<string, ReactNode>;
}

export const Challenge = ({ mdxContents }: ChallengeProps) => {
    const { phase } = useScene();
    const viewportRef = useRef<ElementRef<typeof ScrollArea>>(null);

    const content = mdxContents[phase];

    useEffect(() => {
        if (viewportRef.current) {
            viewportRef.current.scrollTop = 0;
        }
    }, [phase]);

    if (!content) {
        return null;
    }

    return (
        <div className="border-l border-border z-40 bg-white">
            <ScrollArea ref={viewportRef} className="w-7xl h-full font-mono prose prose-zinc px-8 prose-pre:leading-4 prose-pre:mt-0.5 prose-pre:mb-0.5">
                <div className="mt-8 selection:bg-green-200 selection:text-black">
                    {content}            
                </div>
            </ScrollArea>
        </div>
    );
};
