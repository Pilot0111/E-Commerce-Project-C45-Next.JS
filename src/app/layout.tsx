import type { Metadata } from "next";
import { Poppins } from "next/font/google";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import {Toaster} from "@/components/ui/sonner";
import Providers from "@/Providers";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextCart Online Store",
  description: "By Eng. Ahmed Mahmoud Omar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}  antialiased`}>
   <Providers>
        <Navbar />
        <main>{children}</main>
        <Toaster/>
        {/* <Footer/> */}
        </Providers>
      </body>
    </html>
  );
}
