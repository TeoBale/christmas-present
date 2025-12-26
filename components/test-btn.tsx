"use client";
import React, { useState, useEffect, useRef } from "react";
import { createTimeline, animate, remove } from "animejs";

// Helper to replace anime.setDashoffset in v4
const setDashoffset = (el: SVGPathElement | null) => {
  if (!el) return 0;
  const pathLength = el.getTotalLength();
  el.setAttribute('stroke-dasharray', `${pathLength}`);
  return pathLength;
};

export default function TestBtn() {
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success'
  
  // Refs to target elements
  const btnRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLElement>(null);
  const loaderRef = useRef<SVGSVGElement>(null);
  const checkRef = useRef<SVGSVGElement>(null); // Ref for the SVG
  const checkPathRef = useRef<SVGPathElement>(null); // Ref specifically for the path

  useEffect(() => {
    // Safety check for refs
    if (!btnRef.current || !textRef.current || !loaderRef.current || !checkRef.current) return;

    const btn = btnRef.current;
    const text = textRef.current;
    const loader = loaderRef.current;
    const check = checkRef.current;
    const checkPath = checkPathRef.current;

    // 1. CLEANUP: Stop any running animations
    remove([btn, text, loader, check]);

    // 2. LOGIC: Switch based on state
    if (status === "loading") {
      
      // Create a Timeline (Sequence)
      const tl = createTimeline({
        defaults: {
            ease: 'easeOutExpo',
            duration: 500
        }
      });

      tl
      // Step 1: Fade out text
      .add(text, {
        opacity: 0,
        duration: 200
      })
      // Step 2: Shrink button to a circle (Simultaneously)
      .add(btn, {
        width: "50px", // Morph from rectangle to circle
        borderRadius: "50%",
        backgroundColor: "#e0e0e0",
        duration: 400
      }, "-=200") // Offset: Start 200ms before previous step ends
      // Step 3: Fade in Loader
      .add(loader, {
        opacity: 1,
        rotate: '1turn', // Spin 360 degrees
        loop: true, // Make the spinner loop indefinitely
        duration: 800,
        ease: 'linear'
      });

    } else if (status === "success") {

      const tl = createTimeline({ defaults: { ease: 'spring(1, 80, 10, 0)' } });

      tl
      // Step 1: Stop spinner & fade it out
      .add(loader, {
        opacity: 0,
        duration: 200
      })
      // Step 2: Turn button Green & Scale up slightly (Bounce effect)
      .add(btn, {
        scale: [1, 1.2, 1], // Keyframes: Normal -> Big -> Normal
        backgroundColor: "#10B981", // Green
        duration: 800
      }, "-=100")
      // Step 3: Draw the Checkmark
      .add(check, {
        opacity: 1,
        duration: 100 // Quick fade in of the SVG container
      }, "-=600");
      
      if (checkPath) {
          tl.add(checkPath, {
              strokeDashoffset: [setDashoffset(checkPath), 0], // The "Draw Line" Magic
              duration: 600,
              ease: 'easeInOutSine'
          }, "-=600");
      }
    }
    
    // Reset logic (optional) if user clicks again
    if (status === "idle") {
        animate(btn, {
            width: "160px",
            borderRadius: "8px",
            backgroundColor: "#3B82F6",
            scale: 1,
            duration: 500
        });
        animate(text, { opacity: 1, duration: 500 });
        animate([check, loader], { opacity: 0, duration: 0 });
    }

  }, [status]); // Trigger whenever 'status' changes

  return (
    <div className="p-20 flex flex-col items-center gap-4">
      <div 
        className="relative h-12 flex items-center justify-center cursor-pointer overflow-hidden"
        style={{ width: '160px', backgroundColor: '#3B82F6', borderRadius: '8px' }}
        ref={btnRef}
        onClick={() => setStatus("loading")}
      >
        {/* Text */}
        <span ref={textRef} className="text-white font-bold absolute">Download</span>

        {/* Loading Spinner SVG */}
        <svg ref={loaderRef} className="absolute w-6 h-6 opacity-0" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" stroke="#333" strokeWidth="4" strokeDasharray="30 100" />
        </svg>

        {/* Checkmark SVG */}
        <svg ref={checkRef} className="absolute w-6 h-6 opacity-0" viewBox="0 0 50 50">
           {/* 'path' needs a stroke to be drawn */}
           <path ref={checkPathRef} d="M 10 25 L 20 35 L 40 10" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Helper controls */}
      <div className="flex gap-2">
         <button onClick={() => setStatus("idle")}>Reset</button>
         <button onClick={() => setStatus("success")}>Trigger Success</button>
      </div>
    </div>
  );
}