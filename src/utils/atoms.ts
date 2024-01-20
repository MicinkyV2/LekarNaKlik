import { atom } from "nanostores";

export const searchQuery = atom<string>("");
export const selectedRegions = atom<string[]>([]);
export const selectedDepartments = atom<string[]>([]);