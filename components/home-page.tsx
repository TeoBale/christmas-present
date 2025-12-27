"use client";

import { Door } from "@/components/svgs/door";
import { Gift } from "@/components/svgs/gift";
import { Button, buttonVariants } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useScene, ScenePhase } from "@/context/scene-context";
import { MouseEvent, ReactNode, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "motion/react";
import Image from "next/image";
import ticketImg from "@/assets/ticket.jpg";
import { RotateCcw } from "lucide-react";

interface HomePageProps {
    challenge: ReactNode;
}

const DEBUG = false;

export function HomePage({ challenge }: HomePageProps) {
    const [showTicket, setShowTicket] = useState(false);
    const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

    const cardRef = useRef<HTMLDivElement>(null);

    // Valori di movimento per tracciare il mouse
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring per rendere il movimento fluido e "pesante"
    const springConfig = { damping: 25, stiffness: 150 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Trasformazione delle coordinate in rotazione e traslazione (Magnitudo)
    const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
    const translateX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
    const translateY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

    // Gestione del movimento del mouse
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const x = (e.clientX - rect.left) / width - 0.5;
        const y = (e.clientY - rect.top) / height - 0.5;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const {
        phase,
        setPhase,
        doorOneOpen,
        setDoorOneOpen,
        doorTwoOpen,
        setDoorTwoOpen,
        doorThreeOpen,
        setDoorThreeOpen,
        resetScene,
    } = useScene();

    const phases: ScenePhase[] = [
        "idle",
        "challenge1",
        "challenge2",
        "challenge3",
        "win",
    ];

    const scale = {
        idle: 1,
        challenge1: 1 / 3,
        challenge2: 1 / 2,
        challenge3: 1,
        win: 1,
    };

    return (
        <div className="w-full h-screen overflow-hidden flex flex-col">
            <AlertDialog
                open={isResetDialogOpen}
                onOpenChange={setIsResetDialogOpen}
            >
                <AlertDialogTrigger 
                    className={buttonVariants({
                        variant: "ghost",
                        size: "icon",
                        className:
                            "absolute top-4 left-4 z-50 rounded-full text-gray-500",
                    })}
                >
                    <motion.div
                        whileTap={{ rotate: -360 }}
                        transition={{ duration: 0.5 }}
                    >
                        <RotateCcw className="w-5 h-5" />
                    </motion.div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Reset Status?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will reset your progress to the beginning. Are you
                            sure you want to continue?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            variant="destructive"
                            onClick={() => {
                                resetScene();
                                setIsResetDialogOpen(false);
                            }}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {DEBUG && (
                <div className="w-full flex flex-row items-center gap-4 justify-center h-16 border-b border-border z-50 bg-white">
                    <ButtonGroup>
                        {phases.map((p) => (
                            <Button
                                size="sm"
                                key={p}
                                onClick={() => setPhase(p)}
                                variant={phase === p ? "default" : "outline"}
                            >
                                {p.charAt(0).toUpperCase() + p.slice(1)}
                            </Button>
                        ))}
                        <Button
                            size="sm"
                            onClick={resetScene}
                            variant="destructive"
                        >
                            Reset
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button
                            size="sm"
                            onClick={() => setDoorOneOpen(!doorOneOpen)}
                            variant={doorOneOpen ? "default" : "outline"}
                        >
                            Door 1
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => setDoorTwoOpen(!doorTwoOpen)}
                            variant={doorTwoOpen ? "default" : "outline"}
                        >
                            Door 2
                        </Button>

                        <Button
                            size="sm"
                            onClick={() => setDoorThreeOpen(!doorThreeOpen)}
                            variant={doorThreeOpen ? "default" : "outline"}
                        >
                            Door 3
                        </Button>
                    </ButtonGroup>
                </div>
            )}
            <div className="flex flex-row h-full w-full">
                <div className="h-full w-full flex flex-col items-center justify-center gap-4">
                    <div className="grid grid-cols-1 grid-rows-1 place-items-center">
                        <div className="col-start-1 row-start-1 z-0">
                            <Gift
                                scale={scale[phase]}
                                onOpenComplete={() => setShowTicket(true)}
                            />
                        </div>
                        <div
                            className={`col-start-1 row-start-1 z-10 ${
                                doorOneOpen ? "pointer-events-none" : ""
                            }`}
                        >
                            <Door
                                isOpen={doorOneOpen}
                                phase={phase}
                                scale={1 * scale[phase]}
                                scaleDelay={0}
                                phaseDelay={1}
                            />
                        </div>
                        <div
                            className={`col-start-1 row-start-1 z-11 ${
                                doorTwoOpen ? "pointer-events-none" : ""
                            }`}
                        >
                            <Door
                                isOpen={doorTwoOpen}
                                phase={phase}
                                scale={2 * scale[phase]}
                                scaleDelay={1}
                                phaseDelay={2}
                            />
                        </div>
                        <div
                            className={`col-start-1 row-start-1 z-12 ${
                                doorThreeOpen ? "pointer-events-none" : ""
                            }`}
                        >
                            <Door
                                isOpen={doorThreeOpen}
                                phase={phase}
                                scale={3 * scale[phase]}
                                scaleDelay={2}
                                phaseDelay={3}
                            />
                        </div>
                    </div>
                </div>
                {challenge}
                <AnimatePresence>
                    {showTicket && (
                        <motion.div
                            ref={cardRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            // Reazione al click (contrazione)
                            whileTap={{ scale: 0.94 }}
                            style={{
                                rotateX,
                                rotateY,
                                x: translateX,
                                y: translateY,
                                transformStyle: "preserve-3d",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 flex items-center justify-center"
                        >
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        type: "spring",
                                        damping: 20,
                                        stiffness: 300,
                                    },
                                }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                className="relative max-w-4xl max-h-[80vh] w-full p-4"
                            >
                                <Image
                                    src={ticketImg}
                                    alt="Ticket"
                                    className="w-[80vw] h-[80vh] object-contain rounded-lg select-none"
                                    draggable={false}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
