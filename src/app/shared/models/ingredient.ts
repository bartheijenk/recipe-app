import { Recept } from "./recept";

export interface Ingredient {
    id: number | null;
    naam: string;
    calorienPerHonderd: string;
    isRecept: Recept | null;
}