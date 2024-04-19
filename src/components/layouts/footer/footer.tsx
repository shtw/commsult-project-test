"use client";

import Commsult from "@/icons/commsult";
import Link from "next/link";
import Image from "next/image";
import { Drawer } from "@/components/ui/drawer";
import Imprint from "./imprint";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const [imprint, setImprint] = useState<boolean>(false);

  return (
    <>
      <footer className="bg-secondary-text py-12">
        <div className="container-sm">
          <div className="flex flex-wrap space-y-10 md:space-y-0 md:divide-x md:divide-white">
            <div className="flex w-full flex-col justify-between sm:w-1/2 md:w-4/12">
              <div className="flex w-full flex-col max-sm:mb-7 md:flex-row">
                <div className="max-lg:mb-[10px] md:w-5/12">
                  <Link
                    href={"#"}
                    className="font-sm mb-[10px] font-heading font-bold text-primary-lighten"
                  >
                    Kontakt
                  </Link>
                </div>
                <div className="md:w-7/12">
                  <p className="font-heading text-sm italic tracking-wide text-mute-200">
                    Lindenstraße 6<br />
                    14467 Potsdam
                    <br />
                    Telefon: 0331-730 73-0
                    <br />
                    Telefax: 0331-730 73-99
                    <br />
                    <a className="link" href="mailto:office@commsult.de">
                      office@commsult.de
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  variant={"link-secondary"}
                  size={"sm"}
                  shrink
                  onClick={() => setImprint(true)}
                >
                  Impressum
                </Button>
                <Button variant={"link-secondary"} size={"sm"} shrink>
                  Datenschutz
                </Button>
              </div>
            </div>
            <div className="w-full sm:!mt-0 sm:w-1/2 md:w-4/12 md:pl-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Link
                    href={"#"}
                    className="font-sm mb-[10px] font-heading font-bold text-primary-lighten"
                  >
                    Aktuelle Termine
                  </Link>
                  <p className="font-heading text-sm italic tracking-wide text-mute-200">
                    Lernen Sie die Experten für mobile Lösungen kennen!
                  </p>
                </div>

                <div>
                  <a
                    href="https://info.ontego.de/ontegogl-vlb-logistikfachkongress-2024"
                    target="_blank"
                    className="text-sm tracking-wider text-white"
                  >
                    Kongress <br />
                    VLB Logistikfachkongress 2024 <br />
                    4. – 6. März 2024 in Chemnitz
                  </a>
                </div>
                <div>
                  <a
                    href="https://info.ontego.de/ontegogl-vlb-logistikfachkongress-2024"
                    target="_blank"
                    className="text-sm tracking-wider text-white"
                  >
                    Messe <br />
                    LogiMAT 2024 <br />
                    19. – 21. März 2024 in Stuttgart
                  </a>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col space-y-10 sm:flex-row md:w-4/12 md:flex-col md:justify-between md:pl-6">
              <div className="w-full space-y-3 sm:w-1/2 md:w-full">
                <Commsult />
                <p className="font-heading text-sm italic tracking-wide text-mute-200">
                  Die Spezialisten <br />
                  für mobile Software in <br /> Unternehmensprozessen.
                </p>
                <Link
                  href={"#"}
                  className="link inline-block text-sm text-white"
                >
                  www.commsult.de
                </Link>
              </div>

              <div className="w-full sm:!mt-0 sm:w-1/2">
                <Image
                  src={"/images/sap-logo.png"}
                  width={50}
                  height={29}
                  alt="sap logo"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Drawer open={imprint} setOpen={setImprint}>
        <Imprint />
      </Drawer>
    </>
  );
}
