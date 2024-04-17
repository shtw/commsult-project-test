import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { roboto, capitolium } from "@/fonts";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollTop from "@/components/scroll-top";

export const metadata: Metadata = {
  title: "Die beste Wahl für mobile SAP Anwendungen",
  description:
    "Ontego für SAP bringt Logistik- und Service-Prozesse auf robuste mobile Endgeräte. Die Software Suite mit dem besonderen Plus der intuitiven Benutzerführung erleichtert das Leben von Arbeitern in aller Welt.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(roboto.variable, capitolium.variable)}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollTop />
      </body>
    </html>
  );
}
