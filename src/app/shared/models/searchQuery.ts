export class SearchQuery {
    cats: string[];
    ingr: string[];
    minSer: number;
    maxSer: number;
    bron: string[];
    q: string;
    filter: boolean;

    public isEmpty(): boolean {
        return this.cats == undefined && this.ingr == undefined && this.minSer == undefined && this.maxSer == undefined && this.bron == undefined && this.q == undefined;
    }

    public createQueryAsString(): string {
        let queryString = "?";
        if(this.q) {
            queryString = queryString.concat("q=" + this.q);
        }
        if (this.filter) {
            queryString = queryString.concat(this.q ? "&filter=true" : "filter=true");
            if (this.ingr) {
                this.ingr.forEach(i => queryString = queryString.concat("&ingr=" + i));
            }
            if (this.cats) {
                this.cats.forEach(i => queryString = queryString.concat("&cats=" + i));
            }
            if (this.bron) {
                this.bron.forEach(i => queryString = queryString.concat("&bron=" + i));
            }
            if (this.maxSer) {
                queryString = queryString.concat("&maxSer=" + this.maxSer);
            }
            if (this.minSer) {
                queryString = queryString.concat("&minSer=" + this.maxSer);
            }
        }

        return queryString;
    }
}