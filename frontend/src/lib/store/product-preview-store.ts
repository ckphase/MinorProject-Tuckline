import { PriceEntry } from '@/types';
import { create } from 'zustand';

type ProductPreview = {
  id: number;
  prices: PriceEntry[];
};

type ProductPreviewData = ProductPreview;

interface ProductPreviewStore {
  data: ProductPreviewData | null;
  setData: (data: ProductPreviewData) => void;
  clearData: () => void;
}

export const useProductPreviewStore = create<ProductPreviewStore>((set) => ({
  data: null,

  setData: (data) => set({ data }),

  clearData: () => set({ data: null }),
}));
