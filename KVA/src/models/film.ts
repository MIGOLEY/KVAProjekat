export interface Film {
    movieId: number;
    title: string;
    description: string;
    genre: string;
    runTime: number;
    startDate: string;
    director: string;
    actors: string[];
    projectionDate: string;
    price: number;
    image: string;
    createdAt: string;
    rating?: 1 | 2 | 3 | 4 | 5 | null; //povezati sa recenzija.ts
    //recenzija?: Recenzija[];
}