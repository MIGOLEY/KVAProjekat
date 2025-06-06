import { Director } from "./director"
import { MovieActor } from "./movieActor"
import { MovieGenre } from "./movieGenre"

export interface Film {
    active: boolean;
    corporateId: string;
    createdAt: Date;
    description: string;
    director: Director;
    directorId: number;
    internalId: string;
    movieActors: MovieActor[];
    movieGenres: MovieGenre[];
    movieId: number;
    originalTitle: string;
    poster: string;
    runTime: number;
    shortDescription: string;
    shortUrl: string;
    startDate: string;
    title: string;
    updatedAt: null;
    price: number;

    // movieId: number;
    // title: string;
    // description: string;
    // prodCompany: ProdCompany;
    // genre: string;
    // runTime: number;
    // startDate: string;
    // director: string;
    // actors: string[];
    // projectionDate: string;
    // price: number;
    // image: string;
    // createdAt: string;
    rating: null | 1 | 2 | 3 | 4 | 5 | number;
}