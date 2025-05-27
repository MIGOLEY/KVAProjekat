import { Film } from "./film"
import { Ticket } from "./ticket"

export interface Korisnik {
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    address: string;
    tickets: Ticket[];
    watchedMovies: Film[];
    favoriteMovies: Film[];
    username: string;
    password: string;
}
