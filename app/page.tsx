"use client";

import { Challenge } from "@/components/challenge";
import { Door } from "@/components/svgs/door";
import { Gift } from "@/components/svgs/gift";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useScene, ScenePhase } from "@/context/scene-context";

export function Page() {
    const {
        phase,
        setPhase,
        doorOneOpen,
        setDoorOneOpen,
        doorTwoOpen,
        setDoorTwoOpen,
        doorThreeOpen,
        setDoorThreeOpen,
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
            <div className="flex flex-row h-full w-full">
                <div className="h-full w-full flex flex-col items-center justify-center gap-4">
                    <div className="grid grid-cols-1 grid-rows-1 place-items-center">
                        <div className="col-start-1 row-start-1 z-0">
                            <Gift phase={phase} scale={scale[phase]} />
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
                <Challenge></Challenge>
            </div>
        </div>
    );
}
