import { createSelectors } from "@/lib/utils";
import { create } from "zustand";

export type Range = {
  min: number;
  max: number;
};

export interface ProductItem {
  id: string;
  name: string;
  image: string;
  price: number;
  weight: number;
  favorite: boolean;
  rental: boolean;
  deviceType: string[];
  manufacturer: string[];
  operationArea: string[];
  info: string[];
  assesment: string;
  manufacturerLink: string;
}

type State = {
  productData: ProductItem[];
  productFilterData: any;
  choice: string[];
  deviceType: string[];
  manufacturer: string[];
  operationArea: string[];
  price: Range;
  weight: Range;
};

type Action = {
  setProductData: (value: ProductItem[]) => void;
  setProductFilterData: (value: any) => void;
  setChoice: (value: string[]) => void;
  setDeviceType: (value: string[]) => void;
  setManuFacturer: (value: string[]) => void;
  setOperationalArea: (value: string[]) => void;
  setPrice: (value: number[]) => void;
  setWeight: (value: number[]) => void;
  reset: () => void;
};

const defaultChoice = "Alle Geräte";

export const priceDefault = {
  min: 0,
  max: 3500,
};

export const weightDefault = {
  min: 35,
  max: 1300,
};

const initialState: State = {
  productData: [],
  productFilterData: {
    choice: [],
    deviceType: [],
    manufacturer: [],
    operationArea: [],
  },
  choice: [defaultChoice],
  deviceType: [],
  manufacturer: [],
  operationArea: [],
  price: priceDefault,
  weight: weightDefault,
};

const useProductStore = create<State & Action>()((set) => ({
  ...initialState,
  setProductData: (value) => set(() => ({ productData: value })),
  setProductFilterData: (value) => set(() => ({ productFilterData: value })),
  setChoice: (value) => {
    if (value.length === 0) {
      set(() => ({ choice: [defaultChoice] }));
      return;
    }

    if (value.length > 1) {
      if (value[value.length - 1] === defaultChoice) {
        set(() => ({ choice: [defaultChoice] }));
        return;
      }
      if (value.includes(defaultChoice)) {
        const position = value.indexOf(defaultChoice);
        if (position !== -1) {
          value.splice(position, 1);
        }
      }
    }

    set(() => ({ choice: value }));
  },
  setDeviceType: (value) => set(() => ({ deviceType: value })),
  setManuFacturer: (value) => set(() => ({ manufacturer: value })),
  setOperationalArea: (value) => set(() => ({ operationArea: value })),
  setPrice: (value) => set(() => ({ price: { min: value[0], max: value[1] } })),
  setWeight: (value) =>
    set(() => ({ weight: { min: value[0], max: value[1] } })),
  reset: () => {
    const { productData, productFilterData, ...rest } = initialState;
    set(rest);
  },
}));

export const useProduct = createSelectors(useProductStore);
