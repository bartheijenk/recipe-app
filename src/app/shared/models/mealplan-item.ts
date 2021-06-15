import { Recept } from "./recept";

export interface MealplanItem {
    id : number,
    date: Date,
    isAvondeten: boolean,
    servings: number,
    recept: Recept
}