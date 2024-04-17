import { Roboto } from "next/font/google";
import localFont from "next/font/local";

export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const capitolium = localFont({
  src: [
    {
      path: "./capitolium-2-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./capitolium-2-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./capitolium-2-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-capitolium",
});
