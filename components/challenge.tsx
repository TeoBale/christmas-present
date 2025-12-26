import { motion } from "motion/react";
import { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import path from "path";

export const Challenge = () => {
    const filePath = path.join(process.cwd(), "content", "challenge.mdx");
    const fileContent = fs.readFileSync(filePath, "utf8");

    return (
        <motion.div className="w-7xl border-l border-border z-40 bg-white">
            <article className="prose prose-slate p-4">
                <MDXRemote source={fileContent} />
            </article>
        </motion.div>
    );
};
