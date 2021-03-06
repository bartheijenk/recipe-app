import { Categorie } from "./categorie";
import { ReceptIngredient } from "./recept-ingredient";

export class Recept {
    id: number;
    titel: string;
    servings: number;
    bron: string;
    instructies: string;
    ingredienten: ReceptIngredient[];
    categories: Categorie[];
}
