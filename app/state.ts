import { atom } from "jotai";
import { Island, Structure } from "./types";

export const structuresAtom = atom<Structure[]>([]);

export const islandAtom = atom<Island>({ m_structures: [] });
