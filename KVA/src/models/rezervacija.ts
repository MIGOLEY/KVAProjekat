export interface Rezervacija {
    // id: number;
    movieId: number;
    // film: FilmModel;
    movieIme: string;
    dateProjection: Date;
    tickets: number;
    priceTicket: number;
    status: 'rezervisano' | 'gledano' | 'otkazano',
    rating?: number | null;
}
