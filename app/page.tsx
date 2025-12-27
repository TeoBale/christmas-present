import { Challenge } from "@/components/challenge";
import { HomePage } from "@/components/home-page";
import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ChallengeInput } from "@/components/challengeInput";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function Page() {
    const challengeOnePath = path.join(
        process.cwd(),
        "content",
        "challengeOne.mdx"
    );
    const challengeOneContent = fs.readFileSync(challengeOnePath, "utf8");

    const challengeTwoPath = path.join(
        process.cwd(),
        "content",
        "challengeTwo.mdx"
    );
    const challengeTwoContent = fs.readFileSync(challengeTwoPath, "utf8");

    const challengeThreePath = path.join(
        process.cwd(),
        "content",
        "challengeThree.mdx"
    );
    const challengeThreeContent = fs.readFileSync(challengeThreePath, "utf8");

    const mdxContents = {
        challenge1: (
            <MDXRemote
                source={challengeOneContent}
                components={{ ChallengeInput }}
                options={{
                    mdxOptions: {
                        remarkPlugins: [remarkGfm, remarkMath],
                        rehypePlugins: [rehypeKatex],
                    },
                }}
            />
        ),
        challenge2: (
            <MDXRemote
                source={challengeTwoContent}
                components={{ ChallengeInput }}
                options={{
                    mdxOptions: {
                        remarkPlugins: [remarkGfm, remarkMath],
                        rehypePlugins: [rehypeKatex],
                    },
                }}
            />
        ),
        challenge3: (
            <MDXRemote
                source={challengeThreeContent}
                components={{ ChallengeInput }}
                options={{
                    mdxOptions: {
                        remarkPlugins: [remarkGfm, remarkMath],
                        rehypePlugins: [rehypeKatex],
                    },
                }}
            />
        ),
    };

    return <HomePage challenge={<Challenge mdxContents={mdxContents} />} />;
}
