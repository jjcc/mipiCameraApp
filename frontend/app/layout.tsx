import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "CamVista – Advanced MIPI Camera Modules",
  description:
    "High-performance MIPI camera module solutions for industrial automation, medical devices, automotive ADAS, and embedded vision systems.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
