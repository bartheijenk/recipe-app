import { ExecOptionsWithStringEncoding } from "child_process";

export interface ReceptIngredient {
    id: number;
    hoeveelheid: number;
    eenheid: string;
    instructie: string;
    ingredient: Ingredient;
}