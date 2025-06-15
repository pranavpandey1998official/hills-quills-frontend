import { AuthProvider } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/redux/provider";

// Initialize the Inter font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hills & Quills",
  description: "Hills & Quills Frontend Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <Providers>
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              {children}
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
