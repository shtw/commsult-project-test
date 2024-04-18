"use client";
import { Filter } from "./product";

export default function Product() {
  const isMobile = useMediaQuery("(min-width: 768px)");

  return (
    <div className="container-sm ">
      <Filter />
    </div>
  );
}
