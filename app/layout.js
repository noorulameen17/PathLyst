import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PathLyst",
  description:
    "PathLyst helps you discover and manage your career opportunities. Find jobs, track applications, and optimize your job search.",
  keywords: [
    "job search",
    "career",
    "job tracking",
    "PathLyst",
    "job applications",
    "employment",
    "job board",
  ],
  author: "PathLyst Team",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "PathLyst",
    description: "Discover and manage your career opportunities with PathLyst.",
    url: "https://path-lyst.vercel.app/",
    siteName: "PathLyst",
    type: "website",
    images: [
      {
        url: "https://pathlyst.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "PathLyst Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PathLyst",
    description: "Discover and manage your career opportunities with PathLyst.",
    site: "@pathlyst",
    images: ["https://pathlyst.com/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
