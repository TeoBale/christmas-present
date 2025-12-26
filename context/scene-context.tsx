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
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export const SceneProvider = ({ children }: { children: ReactNode }) => {
  const [phase, setPhase] = useState<ScenePhase>("idle");
  const [doorOneOpen, setDoorOneOpen ] = useState<boolean>(true);
  const [doorTwoOpen, setDoorTwoOpen ] = useState<boolean>(true);
  const [doorThreeOpen, setDoorThreeOpen ] = useState<boolean>(true);

  const nextPhase = useCallback(() => {
    setPhase((current) => {
      const currentIndex = PHASES.indexOf(current);
      const nextIndex = currentIndex + 1;
      return nextIndex < PHASES.length ? PHASES[nextIndex] : current;
    });
  }, []);

  useEffect(() => {
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
  }), [phase, doorOneOpen, doorTwoOpen, doorThreeOpen]);

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
