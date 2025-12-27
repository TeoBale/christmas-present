"use client";

import { motion } from "framer-motion";
import { Gift } from "lucide-react";

export function MobileBlocker() {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black p-6 text-center text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex max-w-md flex-col items-center space-y-6"
      >
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-white/10 blur-xl" />
          <Gift className="relative h-16 w-16 text-white" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Serve il computer !
          </h1>
          <p className="text-white/60">
            Questa esperienza interattiva è progettata per schermi più grandi. Apri questo link sul tuo computer per giocare.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
