"use client";
import "~/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GeistSans } from "geist/font/sans";
import "react-toastify/dist/ReactToastify.css";
import { TRPCReactProvider } from "~/trpc/react";
import { usePathname } from "next/navigation";
import ThemeProvider from "./providers/themeProvider";
import { useState } from "react";
import NavBar from "~/_components/NavBar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [queryClient] = useState(() => new QueryClient());
  const isLoginPage =
    pathname === "/login" ||
    pathname === "/signup";

  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <title>Innovix Platform</title>
        <meta name="description" content="Manage your classes, track student progress, and communicate seamlessly with parents. Your go-to tool for efficient teaching and organization." />
        <link rel="icon" type="image/x-icon" href="/images/innovix-white-top.png" />
      </head>
      <body className="bg-bgSecondary">
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {!isLoginPage && <NavBar />}
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}