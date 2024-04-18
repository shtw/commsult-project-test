import { useEffect, useMemo, useState } from "react";
import { ProductItem, useProduct } from "./product-store";
import productData from "@/data/products.json";
import productFilter from "@/data/product-filter.json";
import { filterItemClass } from "@/lib/utils";

export default function useProductHook() {
  const [expandFilter, setExpandFilter] = useState<boolean>(false);

  const choice = useProduct.use.choice();
  const deviceType = useProduct.use.deviceType();
  const manufacturer = useProduct.use.manufacturer();
  const operationArea = useProduct.use.operationArea();
  const price = useProduct.use.price();
  const { min: minPrice, max: maxPrice } = useProduct.use.price();
  const weight = useProduct.use.weight();
  const { min: minWeight, max: maxWeight } = useProduct.use.weight();
  const setChoice = useProduct.use.setChoice();
  const setDeviceType = useProduct.use.setDeviceType();
  const setManuFacturer = useProduct.use.setManuFacturer();
  const setOperationalArea = useProduct.use.setOperationalArea();
  const setPrice = useProduct.use.setPrice();
  const setWeight = useProduct.use.setWeight();
  const resetFilter = useProduct.use.reset();

  const products = useMemo(() => {
    function choiceFilter(item: ProductItem) {
      return choice.some((c) => {
        if (c === "Unsere Favoriten") {
          return item.favorite === true;
        } else if (c === "Mietgeräte") {
          return item.rental === true;
        } else if (c === "Alle Geräte") {
          return true;
        }
      });
    }

    function deviceTypeFilter(item: ProductItem) {
      return deviceType.length > 0
        ? deviceType.some((c) => item.deviceType.includes(c))
        : true;
    }

    function manufacturerFilter(item: ProductItem) {
      return manufacturer.length > 0
        ? manufacturer.some((c) => item.manufacturer.includes(c))
        : true;
    }

    function operationAreaFilter(item: ProductItem) {
      return operationArea.length > 0
        ? operationArea.some((c) => item.operationArea.includes(c))
        : true;
    }

    function priceFilter(item: ProductItem) {
      return minPrice <= item.price && maxPrice >= item.price;
    }

    function weightFilter(item: ProductItem) {
      return minWeight <= item.weight && maxWeight >= item.weight;
    }

    return productData
      .filter(choiceFilter)
      .filter(deviceTypeFilter)
      .filter(manufacturerFilter)
      .filter(operationAreaFilter)
      .filter(priceFilter)
      .filter(weightFilter);
  }, [
    choice,
    deviceType,
    manufacturer,
    operationArea,
    minPrice,
    maxPrice,
    minWeight,
    maxWeight,
  ]);

  useEffect(() => {
    let categorized = new Set(
      products
        .map((product) => {
          return [
            ...product.deviceType,
            ...product.manufacturer,
            ...product.operationArea,
          ];
        })
        .flat(),
    );

    const allFilter = [
      ...productFilter.deviceType,
      ...productFilter.manufacturer,
      ...productFilter.operationArea,
    ];

    const missingCategory = new Map<string, string>();

    for (let index = 0; index < allFilter.length; index++) {
      const item = allFilter[index];
      const transform = filterItemClass(item);
      if (!categorized.has(item)) {
        missingCategory.set(item, transform);
      }
    }

    Array.from(document.querySelectorAll(".filter-item")).map((el) => {
      (el as HTMLButtonElement).disabled = false;
    });

    Array.from(missingCategory.values()).map((item) => {
      const el = document.querySelector(`.${item}`) as HTMLButtonElement;
      if (el) {
        el.disabled = true;
      }
    });
  }, [products, expandFilter]);

  return {
    products,
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
  };
}
