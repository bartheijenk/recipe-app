import { Ingredient } from ".";

export interface ReceptIngredient {
    id: number | null;
    hoeveelheid: number;
    eenheid: string;
    instructie: string;
    ingredient: Ingredient;
}