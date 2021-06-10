export class SearchQuery {
    cats : string[];
    ingr : string[];
    minSer: number;
    maxSer: number;
    bron: string[];
    q: string;

    public isEmpty() : boolean {
        return this.cats == undefined && this.ingr == undefined && this.minSer == undefined && this.maxSer == undefined && this.bron == undefined && this.q == undefined;
    }
}