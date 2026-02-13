import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Hema",
  description: "Hema Launch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
