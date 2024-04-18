"use client";

import { useMemo, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import productFilter from "@/data/product-filter.json";
import {
  useProduct,
  Range,
  priceDefault,
  weightDefault,
} from "./product-store";
import { Slider } from "@/components/ui/slider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";

function FilterGroupChoice({
  label,
  items,
  defaultValue,
  onValueChange,
}: {
  items: any;
  label: string;
  defaultValue: string[];
  onValueChange: (value: string[]) => void;
}) {
  return (
    <div className="mb-10">
      <ToggleGroup
        value={defaultValue}
        onValueChange={(value) => onValueChange(value)}
        type={"multiple"}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <span className="inline-flex font-heading font-bold">{label}</span>
        {items.map((item: any, index: number) => (
          <ToggleGroupItem key={index} value={item}>
            {item}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

function FilterRangeInput({
  prefix,
  value,
}: {
  prefix: string;
  value: number;
}) {
  const formatValue = useMemo(() => {
    return new Intl.NumberFormat("id-Id", {
      maximumSignificantDigits: 3,
    }).format(value);
  }, [value]);

  return (
    <div className="flex items-center gap-1 text-[12px]">
      <div className="border-toggle flex h-7 w-11 items-center justify-center bg-white">
        {formatValue}
      </div>
      <div className="tracking-wider text-mute">{prefix}</div>
    </div>
  );
}

function FilterRange({
  label,
  min,
  max,
  step,
  prefix,
  value,
  onValueChange,
}: {
  label: string;
  min: number;
  max: number;
  prefix: string;
  step: number;
  value: Range;
  onValueChange: (value: number[]) => void;
}) {
  return (
    <div>
      <div className="text-center font-heading font-bold">{label}</div>
      <div className="flex items-center gap-3">
        <FilterRangeInput prefix={prefix} value={value.min} />
        <div className="flex-1">
          <Slider
            defaultValue={[value.min, value.max]}
            onValueChange={(value) => onValueChange(value)}
            step={step}
            min={min}
            max={max}
            minStepsBetweenThumbs={0}
          />
        </div>
        <FilterRangeInput prefix={prefix} value={value.max} />
      </div>
    </div>
  );
}

function Filter() {
  const [isOpen, setIsOpen] = useState(true);

  const choice = useProduct.use.choice();
  const deviceType = useProduct.use.deviceType();
  const manufacturer = useProduct.use.manufacturer();
  const operationArea = useProduct.use.operationArea();
  const price = useProduct.use.price();
  const weight = useProduct.use.weight();
  const resetFilter = useProduct.use.reset();
  const setPrice = useProduct.use.setPrice();
  const setWeight = useProduct.use.setWeight();

  return (
    <div className="mb-7 rounded-[20px] bg-grey px-4 py-10">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <FilterGroupChoice
          label="Auswahl"
          items={productFilter.choice}
          defaultValue={choice}
          onValueChange={useProduct.use.setChoice()}
        />
        <FilterGroupChoice
          label="Gerätetyp"
          items={productFilter.deviceType}
          defaultValue={deviceType}
          onValueChange={useProduct.use.setDeviceType()}
        />
        <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden transition-all">
          <FilterGroupChoice
            label="Hersteller"
            items={productFilter.manufacturer}
            defaultValue={manufacturer}
            onValueChange={useProduct.use.setManuFacturer()}
          />
          <FilterGroupChoice
            label="Einsatzgebiet"
            items={productFilter.operationArea}
            defaultValue={operationArea}
            onValueChange={useProduct.use.setOperationalArea()}
          />

          <div className="mx-auto mb-10 flex max-w-xl justify-center gap-6">
            <div className="w-1/2">
              <FilterRange
                label="Listenpreis"
                prefix="€"
                value={price}
                min={priceDefault.min}
                max={priceDefault.max}
                step={10}
                onValueChange={setPrice}
              />
            </div>
            <div className="w-1/2">
              <FilterRange
                label="Gewicht"
                prefix="g"
                value={weight}
                min={weightDefault.min}
                max={weightDefault.max}
                step={10}
                onValueChange={setWeight}
              />
            </div>
          </div>
        </CollapsibleContent>

        <div className="m-auto flex max-w-3xl justify-between">
          <div>
            <p className="text-[12px] tracking-wider text-mute">
              Alle Angaben / Preise ohne Gewähr
            </p>
          </div>
          <div className="flex gap-8">
            <button
              className="font-medium text-primary"
              onClick={() => resetFilter()}
            >
              Filter zurücksetzen
            </button>
            <CollapsibleTrigger className="font-medium text-primary">
              {isOpen ? "Filter ausblenden" : "Mehr Filter anzeigen"}
            </CollapsibleTrigger>
          </div>
        </div>
      </Collapsible>
    </div>
  );
}

function Mobile() {
  return (
    <div className="container-sm">
      <h5>Hier haben wir leider nicht genug Platz ...</h5>
      <p>
        ... für unseren Hardware Finder. Aber besuchen Sie diese Seite gern beim
        Morgenkaffee am Arbeitsplatz und stöbern Sie durch Empfehlungen,
        Übersichten und hilfreiche Links zu den aktuellsten mobilen Endgeräten.
      </p>

      <Image
        src={"/images/hardware-finder.jpg"}
        alt="hardware-finder"
        className="aspect-ratio"
        sizes="100vw"
        width={900}
        height={600}
        // Make the image display full width
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </div>
  );
}

export default function Product() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return <Mobile />;
  }

  return (
    <div className="container-sm">
      <Filter />
    </div>
  );
}
