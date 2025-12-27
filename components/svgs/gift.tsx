"use client";

import { useScene } from "@/context/scene-context";
import { motion, Variants } from "motion/react";
import { useState } from "react";

interface GiftProps {
    scale: number;
    onOpenComplete?: () => void;
}

export const Gift = ({ scale, onOpenComplete }: GiftProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const { phase, setPhase } = useScene();

    const handleClick = () => {
        switch (phase) {
            case "win":
                if (clickCount >= 3) {
                    setClickCount(0);
                    setIsOpen(true);
                } else {
                    setClickCount((prev) => prev + 1);
                }
                break;
            case "idle":
                if (clickCount >= 3) {
                    setClickCount(0);
                    setPhase("challenge1");
                } else {
                    setClickCount((prev) => prev + 1);
                }
                break;
            default:
                break;
        }
    };


    const boxVariants: Variants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: {
            scale: 0.95,
            rotate: [0, -2, 2, 0],
            transition: { duration: 0.1 },
        },
        idle: {
            scale: 1,
            rotate: 0,
            transition: { type: "spring", delay: 2 }, // TODO: animate scale hover delay
        },
        challenge: {
            scale: 0.3 * scale,
            rotate: 0,
            transition: {
                type: "spring",
                visualDuration: 0.5,
                bounce: 0.33,
            },
        },
    };

    const lidVariants: Variants = {
        closed: { y: 0, rotate: 0, opacity: 1 },
        opened: {
            y: -150, // Move lid Up
            rotate: 10, // Tilt it slightly
            opacity: 0, // Optional: fade it out
            transition: { duration: 0.5, ease: "backIn" },
        },
    };
    const baseVariants: Variants = {
        closed: { y: 0, rotate: 0, opacity: 1 },
        opened: {
            y: 150, // Move lid Up
            rotate: -10, // Tilt it slightly
            opacity: 0, // Optional: fade it out
            transition: { duration: 0.5, ease: "backIn" },
        },
    };

    return (
        <motion.svg
            width="354"
            height="406"
            viewBox="0 0 354 406"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pacchetto"
            style={{ cursor: "pointer", overflow: "visible" }} // Overflow visible lets the lid fly out of bounds
            variants={boxVariants}
            animate={
                phase === "win"
                    ? "idle"
                    : phase !== "idle"
                    ? "challenge"
                    : "idle"
            }
            whileHover={
                phase === "win"
                    ? "hover"
                    : phase !== "idle"
                    ? undefined
                    : "hover"
            }
            whileTap={
                phase === "win" ? "tap" : phase !== "idle" ? undefined : "tap"
            }
            onClick={handleClick}
        >
            <motion.g
                id="scatola"
                variants={baseVariants}
                initial="closed"
                animate={isOpen ? "opened" : "closed"}
                style={{ transformOrigin: "center bottom" }}
            >
                <path
                    id="scatola-base"
                    d="M323.68 161.414H25.1899V379.894C25.1899 393.884 38.5798 405.224 55.0898 405.224H293.79C310.3 405.224 323.69 393.884 323.69 379.894V161.414H323.68Z"
                    fill="#FF514A"
                />
                <path
                    id="ombra"
                    d="M323.67 161.414H25.1799V214.604H323.67V161.414Z"
                    fill="#E43B38"
                />
                <path
                    id="nastro-scatola"
                    d="M207.77 161.414H145.41V405.234H207.77V161.414Z"
                    fill="#FDC80A"
                />
            </motion.g>
            <motion.g
                onAnimationComplete={(definition) => {
                    if (definition === "opened" && onOpenComplete) {
                        onOpenComplete();
                    }
                }}
                id="coperchio"
                variants={lidVariants}
                initial="closed"
                animate={isOpen ? "opened" : "closed"}
                style={{ transformOrigin: "center bottom" }}
            >
                <path
                    id="coperchio-base"
                    d="M336.26 113.974H16.9299C7.57975 113.974 0 121.554 0 130.904V174.784C0 184.134 7.57975 191.714 16.9299 191.714H336.26C345.61 191.714 353.19 184.134 353.19 174.784V130.904C353.19 121.554 345.61 113.974 336.26 113.974Z"
                    fill="#FF514A"
                />
                <path
                    id="nastro-coperchio"
                    d="M207.77 113.974H145.41V191.714H207.77V113.974Z"
                    fill="#FDC80A"
                />
                <motion.g id="fiocco">
                    <motion.g id="fioccoSx">
                        <path
                            d="M135.67 77.014C128.74 72.784 127.3 74.974 115.72 69.884C108.55 66.734 88.7098 54.484 88.0198 41.184C87.7198 35.404 90.2198 36.164 88.5698 33.244C84.9498 26.804 60.9999 27.534 51.6299 40.444C42.9899 52.354 50.1999 69.874 51.6299 73.134C69.4199 113.654 143.6 111.734 154.86 107.664C162.47 104.924 147.83 84.444 135.65 77.004L135.67 77.014Z"
                            fill="#F59E01"
                        />
                        <path
                            d="M168.55 72.214C161.9 53.634 154.36 41.554 148.97 33.054C144.88 26.604 139.19 18.384 130.13 10.344C123.99 4.89402 120.39 3.16402 117.94 2.22402C107.86 -1.67598 98.64 0.604029 95.96 1.29403C90.5 2.71403 85.6698 6.11403 76.0198 12.924C74.0098 14.344 67.59 18.914 58.66 26.584C47.84 35.884 42.3899 40.644 40.5599 45.974C38.0499 53.314 39.6599 60.024 40.5599 63.884C42.8899 73.964 48.6099 80.294 52.5599 84.574C60.0499 92.674 67.79 96.534 75.46 100.274C87.01 105.894 96.4901 108.124 105 110.064C111.43 111.534 126.68 114.634 146.93 114.314C162.55 114.064 170.44 113.844 174.07 109.324C179.43 102.664 175.54 91.794 168.53 72.204L168.55 72.214ZM146.38 102.684C144.25 106.364 134.86 104.524 116.09 100.834C110.59 99.754 96.28 96.724 79.71 89.384C73.62 86.684 68.0199 83.754 62.5299 78.484C57.5299 73.684 55.2799 69.474 54.7799 68.514C52.5899 64.324 49.3498 58.104 51.2698 50.784C53.0898 43.844 58.48 40.084 60.13 38.964C66.09 34.944 72.17 35.014 74.72 35.084C82.38 35.284 88.1798 38.644 93.0098 41.914C105.72 50.534 113.56 59.854 122 69.794C144.3 96.074 148 99.864 146.38 102.664V102.684Z"
                            fill="#FCC810"
                        />
                    </motion.g>
                    <motion.g id="fioccoDx">
                        <path
                            d="M217.5 77.0141C224.43 72.7841 225.87 74.9741 237.45 69.8841C244.62 66.7341 264.46 54.4841 265.15 41.1841C265.45 35.4041 262.95 36.1641 264.6 33.2441C268.22 26.8041 292.17 27.5341 301.54 40.4441C310.18 52.3541 302.97 69.8741 301.54 73.1341C283.75 113.654 209.57 111.734 198.31 107.664C190.7 104.924 205.34 84.4441 217.52 77.0041L217.5 77.0141Z"
                            fill="#F59E01"
                        />
                        <path
                            d="M179.09 109.324C182.72 113.844 190.61 114.064 206.23 114.314C226.47 114.644 241.73 111.534 248.16 110.064C256.67 108.124 266.16 105.904 277.7 100.274C285.37 96.544 293.11 92.674 300.6 84.574C304.56 80.294 310.27 73.964 312.6 63.884C313.5 60.024 315.11 53.314 312.6 45.974C310.78 40.634 305.32 35.884 294.5 26.584C285.56 18.904 279.15 14.3341 277.14 12.9241C267.48 6.11406 262.66 2.71405 257.2 1.29405C254.52 0.594054 245.3 -1.67595 235.22 2.22405C232.77 3.16405 229.17 4.90404 223.03 10.344C213.97 18.384 208.28 26.6041 204.19 33.0541C198.8 41.5541 191.27 53.624 184.61 72.214C177.61 91.804 173.72 102.674 179.07 109.334L179.09 109.324ZM231.17 69.8041C239.61 59.8641 247.45 50.5341 260.16 41.9241C264.98 38.6441 270.79 35.294 278.45 35.094C281 35.024 287.08 34.944 293.04 38.974C294.69 40.094 300.08 43.8541 301.9 50.7941C303.82 58.1041 300.57 64.334 298.39 68.524C297.89 69.484 295.64 73.6941 290.64 78.4941C285.16 83.7641 279.55 86.694 273.46 89.394C256.88 96.734 242.57 99.764 237.08 100.844C218.31 104.524 208.93 106.374 206.79 102.694C205.17 99.894 208.86 96.094 231.17 69.824V69.8041Z"
                            fill="#FCC810"
                        />
                    </motion.g>
                    <path
                        id="nodo"
                        d="M186.08 65.4641H167.09C155.138 65.4641 145.45 75.1527 145.45 87.1041V94.8841C145.45 106.836 155.138 116.524 167.09 116.524H186.08C198.031 116.524 207.72 106.836 207.72 94.8841V87.1041C207.72 75.1527 198.031 65.4641 186.08 65.4641Z"
                        fill="#FDAC03"
                    />
                </motion.g>
            </motion.g>
        </motion.svg>
    );
};
