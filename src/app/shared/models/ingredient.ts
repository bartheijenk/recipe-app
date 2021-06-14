import { Recept } from "./recept";

export interface Ingredient {
    id: string;
    naam: string;
    calorienPerHonderd: string;
    isRecept: Recept | null;
}