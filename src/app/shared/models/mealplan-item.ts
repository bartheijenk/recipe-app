import { Recept } from "./recept";

export class MealplanItem {
    id : number;
    date: Date;
    isAvondeten: boolean;
    servings: number;
    recept: Recept;
}

export class MealplanRequest {
    date: string;
    isAvondeten: boolean;
    servings: number;
    recept: number;
}