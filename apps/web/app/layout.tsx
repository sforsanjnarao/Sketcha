
import {Providers} from "./providers";
import type { Metadata } from "next";
import './globals.css';



export const metadata:Metadata = {
  title: 'Sketcha',
  description: 'Playful Excalidraw-style canvas — Sketcha',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="
          bg-linear-to-br
          from-[#FFD6E8]
          via-[#D6EFFF]
          to-[#FFECC7]
          min-h-screen
        "
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
