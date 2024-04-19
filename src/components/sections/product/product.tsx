"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  ProductItem,
  Range,
  priceDefault,
  weightDefault,
} from "./product-store";
import { Slider } from "@/components/ui/slider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import productFilter from "@/data/product-filter.json";
import useProductHook from "./product-hook";
import { cn, filterItemClass } from "@/lib/utils";
import { ArrowRight, XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function FilterGroupChoice({
  label,
  items,
  defaultValue,
  onValueChange,
}: {
  items: string[];
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
        className={`flex flex-wrap items-center justify-center gap-4`}
      >
        <span className="inline-flex font-heading font-bold">{label}</span>
        {items.map((item, index) => (
          <ToggleGroupItem
            key={index}
            value={item}
            className={`filter-item ${filterItemClass(item)}`}
          >
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
      <div className="flex h-7 w-11 items-center justify-center border-toggle bg-white">
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
  const {
    filter: {
      expandFilter,
      choice,
      deviceType,
      manufacturer,
      operationArea,
      price,
      weight,
      setExpandFilter,
      setChoice,
      setDeviceType,
      setManuFacturer,
      setOperationalArea,
      setPrice,
      setWeight,
      resetFilter,
    },
  } = useProductHook();

  return (
    <div className="mb-7 rounded-[20px] bg-grey px-4 py-10">
      <Collapsible open={expandFilter} onOpenChange={setExpandFilter}>
        <FilterGroupChoice
          label="Auswahl"
          items={productFilter.choice}
          defaultValue={choice}
          onValueChange={setChoice}
        />
        <FilterGroupChoice
          label="Gerätetyp"
          items={productFilter.deviceType}
          defaultValue={deviceType}
          onValueChange={setDeviceType}
        />
        <CollapsibleContent
          // forceMount
          // hidden={!isOpen}
          className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
        >
          <FilterGroupChoice
            label="Hersteller"
            items={productFilter.manufacturer}
            defaultValue={manufacturer}
            onValueChange={setManuFacturer}
          />
          <FilterGroupChoice
            label="Einsatzgebiet"
            items={productFilter.operationArea}
            defaultValue={operationArea}
            onValueChange={setOperationalArea}
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

        <div className="m-auto flex max-w-3xl items-center justify-between">
          <div>
            <p className="text-[12px] tracking-wider text-mute">
              Alle Angaben / Preise ohne Gewähr
            </p>
          </div>
          <div className="flex gap-8">
            <Button variant={"text"} shrink onClick={() => resetFilter()}>
              Filter zurücksetzen
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant={"text"} shrink>
                {expandFilter ? "Filter ausblenden" : "Mehr Filter anzeigen"}
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
      </Collapsible>
    </div>
  );
}

function Mobile() {
  return (
    <div className="container-sm block pb-[60px]">
      <h5 className="mb-4 text-[26px]">
        Hier haben wir leider nicht genug Platz ...
      </h5>
      <p className="mb-[60px]">
        ... für unseren Hardware Finder. Aber besuchen Sie diese Seite gern beim
        Morgenkaffee am Arbeitsplatz und stöbern Sie durch Empfehlungen,
        Übersichten und hilfreiche Links zu den aktuellsten mobilen Endgeräten.
      </p>

      <div className="mb-[60px]">
        <Image
          src={"/images/hardware-finder.jpg"}
          alt="hardware-finder"
          className="aspect-ratio h-auto w-full"
          sizes="100vw"
          width={900}
          height={600}
        />
      </div>
    </div>
  );
}

function ProductCard({ item }: { item: ProductItem }) {
  const [expand, setExpand] = useState(false);
  const parentRef = useRef<HTMLLIElement>(null);
  const collapseRef = useRef<HTMLDivElement>(null);

  function closeExpand() {
    setTimeout(() => {
      setExpand(false);
    }, 500);
  }

  function fakeChange(value: string[]) {
    //nothing
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        closeExpand();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (collapseRef.current && parentRef.current) {
      parentRef.current.style.setProperty(
        "--height",
        `${collapseRef.current.scrollHeight}px`,
      );
    }
  }, []);

  return (
    <li
      ref={parentRef}
      data-state={expand ? "open" : "closed"}
      className={cn(
        "inline-block align-top",
        expand
          ? "transition-height h-[calc(300px+var(--height))]"
          : "transition-height-close",
      )}
    >
      <Collapsible open={expand} onOpenChange={setExpand} className="">
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            duration: 0.5,
          }}
        >
          <div
            className="relative flex cursor-pointer flex-col space-y-3"
            onClick={() =>
              setTimeout(() => {
                setExpand(true);
              }, 950)
            }
          >
            <div className="absolute -right-1 top-0 z-10 flex gap-1">
              {item.rental && <Badge variant={"yellow"}>Mietgerat</Badge>}
              {item.favorite && <Badge>Favorit</Badge>}
            </div>
            <div className="relative before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-primary-text before:opacity-0 before:transition-opacity before:duration-200 before:ease-out hover:before:opacity-10">
              <Image
                src={item.image}
                width={212}
                height={255}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
            <h3
              className={cn(
                "text-center font-body text-sm",
                expand ? "font-medium text-primary" : "",
              )}
            >
              {item.name}
            </h3>
          </div>
        </motion.div>
        <CollapsibleContent
          ref={collapseRef}
          forceMount
          className="absolute left-0 top-auto w-full overflow-hidden data-[state=closed]:invisible data-[state=closed]:animate-collapsible-2-up data-[state=open]:animate-collapsible-2-down data-[state=closed]:overflow-hidden"
        >
          <div
            className={cn(
              "relative bg-white pt-16 transition-opacity delay-500",
              expand ? "opacity-100" : "opacity-0",
            )}
          >
            <XIcon
              className="absolute right-0 top-3 cursor-pointer"
              onClick={closeExpand}
            />
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3">
                <Image
                  src={item.image}
                  width={212}
                  height={255}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <div className="col-span-4">
                <h3 className="mb-3 font-body text-[20px] font-medium">
                  {item.name}
                </h3>
                <ul className="mb-6 pl-6">
                  {item.info.map((info, index) => (
                    <li
                      className={
                        "relative mb-[2px] text-sm tracking-wider before:absolute before:-left-5 before:top-0 before:content-['•']"
                      }
                      key={index}
                    >
                      {info}
                    </li>
                  ))}
                </ul>

                <ToggleGroup
                  type={"multiple"}
                  className={`flex flex-wrap items-center justify-start gap-4`}
                >
                  {item.operationArea.map((item, index) => (
                    <ToggleGroupItem key={index} value={item}>
                      {item}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              <div className="col-span-5 flex flex-col gap-4">
                <div className="border-4 border-primary p-5 text-primary">
                  <h4 className="mb-4 font-body text-sm font-medium tracking-wider">
                    Unsere Einschätzung
                  </h4>
                  <p className="font-heading text-[18px] tracking-wider">
                    {item.assesment}
                  </p>
                </div>

                <Button variant="link" shrink asChild className="ml-auto">
                  <Link href={item.manufacturerLink} target="_blank">
                    <span className="inline-block">Zum Hersteller</span>
                    <ArrowRight width={18} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}

function Products() {
  const { products } = useProductHook();
  return products.map((product, index) => (
    <ProductCard item={product} key={product.id} />
  ));
}

export default function Product() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  if (isMobile) {
    return <Mobile />;
  }

  return (
    <div className="container-sm mb-40">
      <Filter />
      <div className="relative">
        <motion.ul layout className="grid grid-cols-4 gap-x-4 gap-y-8">
          <AnimatePresence>
            <Products />
          </AnimatePresence>
        </motion.ul>
      </div>
    </div>
  );
}
