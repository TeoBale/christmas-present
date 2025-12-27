import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SceneProvider } from "@/context/scene-context";
import { headers } from "next/headers";
import { MobileBlocker } from "@/components/mobile-blocker";
import "katex/dist/katex.min.css";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Little gift",
  description: "Made with love by TeoBale",
  openGraph: {
    images: ["/og-image.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

  if (isMobile) {
    return (
      <html lang="en" className={inter.variable}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}>
          <MobileBlocker />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SceneProvider>
            {children}
        </SceneProvider>
      </body>
    </html>
  );
}
