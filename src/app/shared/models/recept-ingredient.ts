import { Ingredient } from ".";

export interface ReceptIngredient {
    id: number;
    hoeveelheid: number;
    eenheid: string;
    instructie: string;
    ingredient: Ingredient;
}