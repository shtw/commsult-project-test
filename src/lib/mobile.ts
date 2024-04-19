"use server";

import { headers } from "next/headers";
import { userAgent } from "next/server";

export const isMobileDevice = async () => {
  const req = headers();
  const { device } = userAgent({ headers: req });
  return device.type === "mobile" || device.type === "tablet";
};
