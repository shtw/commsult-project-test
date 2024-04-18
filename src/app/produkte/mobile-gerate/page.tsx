import Hero from "@/components/sections/hero";
import Paragraph from "@/components/sections/paragraph";
import dynamic from "next/dynamic";

const Product = dynamic(() => import("@/components/sections/product/product"));

export default function MobilGerate() {
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
      <Product />
    </>
  );
}
