import { create } from "zustand";

interface ColorType {
  intialColor: string;
  selectedIntialColor: (color: string) => void;
}

const useColorSearch = create<ColorType>((set) => ({
  intialColor: "bg-gray-500",
  selectedIntialColor: (color: string) => set({ intialColor: color }),
}));

export default useColorSearch;
