import axios from 'axios';

// export class FilmService {
//     static async getMovies(page: number = 0, size: number = 10) {
//         return axios.get('https://movie.pequla.com/api/movie')
//     }
// }

const client = axios.create({
    baseURL: 'https://movie.pequla.com/api',
    headers: {
        'Accept': 'app/json',
        'X-Client-Name': 'KVA/2025'
    },
    validateStatus: (status: number) => {
        return status === 200
        /*Samo ako je 200 vrati response
        U ostalim slucajevima baci izuzetak*/
    }
})

export class FilmService {
    static async getMovies(page: number = 0, size: number = 10) {
        return client.request({
            url: '/movie',
            method: 'GET',
            params: {
                'page': page,
                'size': size,
                'sort': 'startDate, desc',
            }
        })
    }
    static async getMoviesSearch(search: string) {
        return client.request({
            url: `/movie/?search=${search}`,
            method: 'GET',
        })
    }
    static async getMovieById(movieId: number) {
        return client.get(`/movie/${movieId}`)
    }
}

//     static async getGenre() {
//         return client.request({
//             url: '/movie/genre',
//             method: 'GET',
//             params: {
//                 'type': 'genre'
//             }
//         })
//     }

//     static async getTitle() {
//         return client.get('/movie/title')
//     }
// }


// njegov

// export class FlightService {
//     static async getFlights(page: number = 0, size: number = 10) {
//         return client.request({
//             url: '/flight',
//             method: 'GET',
//             params: {
//                 'page': page,
//                 'size': size,
//                 'sort': 'scheduledAt,asc',
//                 'type': 'departure'
//             }
//         })
//     }

//     static async getFlightList() {
//         return client.request({
//             url: '/flight/list',
//             method: 'GET',
//             params: {
//                 'type': 'departure'
//             }
//         })
//     }

//     static async getFlightById(id: number) {
//         return client.get(`/flight/${id}`)
//     }

//     static async getDestinations() {
//         return client.get('/flight/destination')
//     }
// }