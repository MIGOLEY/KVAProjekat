export interface Film {
    id: number;
    ime: string;
    opis: string;
    zanr: string;
    trajanje: number;
    reziser: string;
    glumci: string[];
    datumIzlaska: Date;
    datumProjekcije: Date;
    cenaKarte: number;
    statusProjekcije: string[];
    //ocena: Recenzija[];
}
