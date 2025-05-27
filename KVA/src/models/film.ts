import { ProdCompany } from "./prod-company"

export interface Film {
    movieId: number;
    title: string;
    description: string;
    prodCompany: ProdCompany;
    genre: string;
    runTime: number;
    startDate: string;
    director: string;
    actors: string[];
    projectionDate: string;
    price: number;
    image: string;
    createdAt: string;
    rating: null | 1 | 2 | 3 | 4 | 5 | number;
}