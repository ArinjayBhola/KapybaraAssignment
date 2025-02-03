import { create } from "zustand";

interface ColorState {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const useColorStore = create<ColorState>((set) => ({
  selectedColor: "bg-white",
  setSelectedColor: (color) => set({ selectedColor: color }),
}));

export default useColorStore;
