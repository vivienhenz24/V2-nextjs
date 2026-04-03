import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const family = localFont({
  src: [
    {
      path: "../fonts/family/test-family-vf-roman.woff2",
      style: "normal",
    },
    {
      path: "../fonts/family/test-family-vf-italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "V2",
  description: "Voice AI for edge devices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${family.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
