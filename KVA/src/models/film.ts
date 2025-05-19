export interface Film {
    id: number;
    ime: string;
    opis: string;
    zanr: string;
    trajanje: number;
    reziser: string;
    glumci: string[];
    datumIzlaska: Date;
    projekcija: Date;
    cenaKarte: number;
    // recenzija: Recenzija[];
}
