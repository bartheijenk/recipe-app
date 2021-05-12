import { Recept } from "./recept";

export interface Ingredient {
    id: number;
    naam: string;
    calorienPerHonder: string;
    isRecept: Recept;
}