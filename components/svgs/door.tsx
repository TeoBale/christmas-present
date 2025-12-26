"use client";
import { motion, Variants } from "framer-motion";

interface DoorProps {
    scale?: number;
    scaleDelay?: number;
    phaseDelay?: number;
    isOpen?: boolean;
    phase?: string;
}

export const Door = ({
    scale,
    scaleDelay,
    phaseDelay,
    isOpen = false,
    phase,
}: {
    scale: number;
    scaleDelay: number;
    phaseDelay: number;
    isOpen?: boolean;
    phase?: string;
}) => {
    // Sync door state with phase if needed
    // User said: "shrinks closing" in challenge1. So it should end up closed.
    // If it starts "from a larger ladder", we handle that in root variants.

    const rootVariants: Variants = {
        idle: {
            scale: 2 * scale,
            opacity: 0,
            //transition: { duration: 0.5 },
            transition: {
                delay: 1,
                type: "spring",
                bounce: 0.24,
            },
            pointerEvents: "none",
        },
        challenge: {
            scale: scale,
            opacity: 1,
            transition: {
                delay: 1 + scaleDelay,
                type: "spring",
                bounce: 0.24,
            },
        },
        // Fallback for other phases if needed
        default: { scale: 1, opacity: 1 },
    };

    const doorInternalVariants: Variants = {
        closed: {
            scaleX: 1,
            originX: 0,
            transition: {
                type: "spring",
                delay: 0.5 + phaseDelay,
                stiffness: 822,
                damping: 39,
                mass: 1.7,
            },
        },
        opened: {
            scaleX: 0,
            originX: 0,
            transition: {
                type: "spring",
                stiffness: 822,
                damping: 39,
                mass: 1.7,
            },
        },
    };

    // Determine target state for door leaves
    // In challenge1, it closes.
    //const currentDoorState = phase === "challenge1" ? "closed" : (isDoorOpen ? "opened" : "closed");
    const currentDoorState = isOpen ? "opened" : "closed";

    return (
        <motion.svg
            width="503"
            height="764"
            viewBox="0 0 503 764"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            //onClick={() => setIsDoorOpen(!isDoorOpen)}
            style={{ cursor: "pointer", overflow: "visible" }} // Overflow visible lets the lid fly out of bounds
            variants={rootVariants}
            animate={isOpen ? "idle" : "challenge"}
        >
            <motion.g
              id="root"
              style={{ cursor: "pointer", overflow: "visible" }} // Overflow visible lets the lid fly out of bounds
            >
                <motion.g
                    id="porta"
                    variants={doorInternalVariants}
                    animate={currentDoorState}
                >
                    <path
                        d="M429.98 47.45H75.95V749.72H429.98V47.45Z"
                        fill="#BE7B46"
                    />
                    <path
                        d="M113.25 364.83V82.49L130.07 99.3H219.21L235.23 83.28V364.83H113.25Z"
                        fill="#A76430"
                    />
                    <path
                        d="M113.25 364.83L128.99 349.1H219.6L235.28 364.78L113.25 364.83Z"
                        fill="#965724"
                    />
                    <path
                        d="M267.23 364.83V82.49L284.04 99.3H373.18L389.2 83.28V364.83H267.23Z"
                        fill="#A76430"
                    />
                    <path
                        d="M267.23 364.83L282.96 349.1H373.58L389.26 364.78L267.23 364.83Z"
                        fill="#965724"
                    />
                    <path
                        d="M113.25 707.09V468.24L130.07 485.05H219.21L235.23 469.03V707.09H113.25Z"
                        fill="#A76430"
                    />
                    <path
                        d="M113.25 707.09L128.99 691.36H219.6L235.28 707.04L113.25 707.09Z"
                        fill="#965724"
                    />
                    <path
                        d="M267.23 707.09V468.24L284.04 485.05H373.18L389.2 469.03V707.09H267.23Z"
                        fill="#A76430"
                    />
                    <path
                        d="M267.23 707.09L282.96 691.36H373.58L389.26 707.04L267.23 707.09Z"
                        fill="#965724"
                    />
                    <path
                        d="M383.97 451.57C399.456 451.57 412.01 439.016 412.01 423.53C412.01 408.044 399.456 395.49 383.97 395.49C368.484 395.49 355.93 408.044 355.93 423.53C355.93 439.016 368.484 451.57 383.97 451.57Z"
                        fill="#965724"
                    />
                    <path
                        d="M383.97 441.81C399.456 441.81 412.01 429.256 412.01 413.77C412.01 398.284 399.456 385.73 383.97 385.73C368.484 385.73 355.93 398.284 355.93 413.77C355.93 429.256 368.484 441.81 383.97 441.81Z"
                        fill="#E9A418"
                    />
                    <path
                        d="M374.69 412.97C379.815 412.97 383.97 408.815 383.97 403.69C383.97 398.565 379.815 394.41 374.69 394.41C369.565 394.41 365.41 398.565 365.41 403.69C365.41 408.815 369.565 412.97 374.69 412.97Z"
                        fill="#FCC96E"
                    />
                </motion.g>
                <motion.g id="frame">
                    <path
                        d="M473.65 9.94V749.71H429.98V44.25H72.54V749.71H28.8601V9.94C28.8601 4.45 33.31 0 38.8 0H463.7C469.19 0 473.64 4.45 473.64 9.94H473.65Z"
                        fill="#BE7B46"
                    />
                    <path
                        d="M429.98 749.71V55.53C429.98 49.3 424.93 44.25 418.7 44.25H83.8203C77.5903 44.25 72.5403 49.3 72.5403 55.53V749.71"
                        stroke="#9B5925"
                        strokeWidth="9"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M75.9502 47.4501L37.5002 8.71008"
                        stroke="#9B5925"
                        strokeWidth="9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M426.6 47.29L465.04 8.55005"
                        stroke="#9B5925"
                        strokeWidth="9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M498.52 749.71H4C1.79086 749.71 0 751.501 0 753.71V759.53C0 761.739 1.79086 763.53 4 763.53H498.52C500.729 763.53 502.52 761.739 502.52 759.53V753.71C502.52 751.501 500.729 749.71 498.52 749.71Z"
                        fill="#E7C9AD"
                    />
                </motion.g>
            </motion.g>
        </motion.svg>
    );
};
