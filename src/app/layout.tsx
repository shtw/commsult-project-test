import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { roboto, capitolium } from "@/fonts";
import { Header } from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";
import ScrollTop from "@/components/scroll-top";
import Main from "@/components/main";
import "./globals.css";
import { isMobileDevice } from "@/lib/mobile";

export const metadata: Metadata = {
  title: "Die beste Wahl für mobile SAP Anwendungen",
  description:
    "Ontego für SAP bringt Logistik- und Service-Prozesse auf robuste mobile Endgeräte. Die Software Suite mit dem besonderen Plus der intuitiven Benutzerführung erleichtert das Leben von Arbeitern in aller Welt.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = await isMobileDevice();
  return (
    <html lang="de-DE">
      <body className={cn(roboto.variable, capitolium.variable)}>
        <Header />
        <Main mobile={isMobile}>{children}</Main>
        <Footer />
        <ScrollTop />
      </body>
    </html>
  );
}
