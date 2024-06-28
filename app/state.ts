import { atom } from "jotai";
import { Island, Structure } from "./types";

export const structuresAtom = atom<Structure[]>([]);

export const islandAtom = atom<Island>({ m_structures: [] });

export const buildingCountAtom = atom<number>(60);

export const islandSizeAtom = atom<number>(200);

export const structureSpacingAtom = atom<number>(40); // Initial value for spacing
