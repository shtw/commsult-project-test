import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/hero";
import Paragraph from "@/components/sections/paragraph";
import { promises as fs } from "fs";
import path from "path";

const Product = dynamic(() => import("@/components/sections/product/product"));

export const metadata: Metadata = {
  title: "Ontego Hardware Finder",
  description:
    "Mobilcomputer, mobile Scanner, Terminals und Handhelds von Zebra, Honeywell und Samsung für die mobile Datenerfassung.",
};

export default async function MobilGerate() {
  const productFile = await fs.readFile(
    path.join(process.cwd(), "public", "products.json"),
    "utf8",
  );
  const filterFile = await fs.readFile(
    path.join(process.cwd(), "public", "product-filter.json"),
    "utf8",
  );

  const products = JSON.parse(productFile);
  const filter = JSON.parse(filterFile);

  return (
    <>
      <Hero
        title="Wie finde ich die <u>besten mobilen</u> <u>Geräte</u> für meine Mitarbeiter?"
        image="/images/hero.jpg"
      />
      <Paragraph
        text="
    Mobile Anwendungen gehören heute zum Alltag in Unternehmen: in der Produktion, in
    der Lagerlogistik,
    der Instandhaltung oder der Auslieferung. Wir geben Ihnen einen Überblick über
    mobile Hardware
    vom Handheld-Computer über mobile Scanner, Stapler-Terminals und Tablets bis zu
    robusten Smartphones
    und mobilen Druckern."
      />
      <Product data={products} filter={filter} />
    </>
  );
}
