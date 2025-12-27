"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useMemo, useEffect } from "react";

export type ScenePhase = "idle" | "challenge1" | "challenge2" | "challenge3" | "win";

const PHASES: ScenePhase[] = ["idle", "challenge1", "challenge2", "challenge3", "win"];

interface SceneContextType {
  phase: ScenePhase;
  setPhase: (phase: ScenePhase) => void;
  doorOneOpen: boolean;
  setDoorOneOpen: (doorOneOpen: boolean) => void;
  doorTwoOpen: boolean;
  setDoorTwoOpen: (doorTwoOpen: boolean) => void;
  doorThreeOpen: boolean;
  setDoorThreeOpen: (doorThreeOpen: boolean) => void;
  nextPhase: () => void;
  resetScene: () => void;
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export const SceneProvider = ({ children }: { children: ReactNode }) => {
  const [phase, setPhase] = useState<ScenePhase>("idle");
  const [doorOneOpen, setDoorOneOpen] = useState<boolean>(true);
  const [doorTwoOpen, setDoorTwoOpen] = useState<boolean>(true);
  const [doorThreeOpen, setDoorThreeOpen] = useState<boolean>(true);

  // New state to track if we've loaded from localStorage
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedPhase = localStorage.getItem("scene_phase");
    const savedDoorOne = localStorage.getItem("scene_doorOne");
    const savedDoorTwo = localStorage.getItem("scene_doorTwo");
    const savedDoorThree = localStorage.getItem("scene_doorThree");

    if (savedPhase) setPhase(savedPhase as ScenePhase);
    if (savedDoorOne) setDoorOneOpen(savedDoorOne === "true");
    if (savedDoorTwo) setDoorTwoOpen(savedDoorTwo === "true");
    if (savedDoorThree) setDoorThreeOpen(savedDoorThree === "true");

    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever state changes, but only after initialization
  useEffect(() => {
    if (!isInitialized) return;

    localStorage.setItem("scene_phase", phase);
    localStorage.setItem("scene_doorOne", String(doorOneOpen));
    localStorage.setItem("scene_doorTwo", String(doorTwoOpen));
    localStorage.setItem("scene_doorThree", String(doorThreeOpen));
  }, [phase, doorOneOpen, doorTwoOpen, doorThreeOpen, isInitialized]);

  const nextPhase = useCallback(() => {
    setPhase((current) => {
      const currentIndex = PHASES.indexOf(current);
      const nextIndex = currentIndex + 1;
      return nextIndex < PHASES.length ? PHASES[nextIndex] : current;
    });
  }, []);

  const resetScene = useCallback(() => {
    localStorage.removeItem("scene_phase");
    localStorage.removeItem("scene_doorOne");
    localStorage.removeItem("scene_doorTwo");
    localStorage.removeItem("scene_doorThree");

    setPhase("idle");
    setDoorOneOpen(true);
    setDoorTwoOpen(true);
    setDoorThreeOpen(true);
  }, []);

  useEffect(() => {
    // Only run this logic if we are NOT loading from storage to avoid overwriting logic
    // Actually, this side effect enforces consistency based on phase. 
    // If we load "challenge1" from storage, we want this to run to ensuring doors are correct.
    // However, if we blindly run this, it might override manual door toggles if they existed?
    // The previous code had this effect running on `phase` change.
    // Let's keep it, as it seems to define the "rules" of the phase.
    // If persistence loads a phase, this effect will run and enforce the doors.
    // BUT we also persist doors. If the effect enforces doors, persisting doors might be redundant 
    // UNLESS the user can toggle doors independently of phase (which setters imply).
    // If the effect forces doors based on phase, then `setDoorOneOpen` call manually might be overwritten if `phase` doesn't change?
    // No, `useEffect` runs when `phase` changes.
    switch (phase) {
      case "idle":
        setDoorOneOpen(true);
        setDoorTwoOpen(true);
        setDoorThreeOpen(true);
        break;
      case "challenge1":
        setDoorOneOpen(false);
        setDoorTwoOpen(false);
        setDoorThreeOpen(false);
        break;
      case "challenge2":
        setDoorOneOpen(false);
        setDoorTwoOpen(false);
        setDoorThreeOpen(true);
        break;
      case "challenge3":
        setDoorOneOpen(false);
        setDoorTwoOpen(true);
        setDoorThreeOpen(true);
        break;
      case "win":
        setDoorOneOpen(true);
        setDoorTwoOpen(true);
        setDoorThreeOpen(true);
        break;
    }
  }, [phase]);

  const value = useMemo(() => ({
    phase,
    setPhase,
    doorOneOpen,
    setDoorOneOpen,
    doorTwoOpen,
    setDoorTwoOpen,
    doorThreeOpen,
    setDoorThreeOpen,
    nextPhase,
    resetScene, 
  }), [phase, doorOneOpen, doorTwoOpen, doorThreeOpen, nextPhase, resetScene]);

  return (
    <SceneContext.Provider value={value}>
      {children}
    </SceneContext.Provider>
  );
};

export const useScene = () => {
  const context = useContext(SceneContext);
  if (context === undefined) {
    throw new Error("useScene must be used within a SceneProvider");
  }
  return context;
};
