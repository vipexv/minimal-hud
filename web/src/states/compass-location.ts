import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

const compassLocationState = atom<"bottom" | "top">("top");

export const useCompassLocation = () => useAtomValue(compassLocationState);
export const useSetCompassLocation = () => useSetAtom(compassLocationState);
export const useCompassLocationStore = () => useAtom(compassLocationState);
