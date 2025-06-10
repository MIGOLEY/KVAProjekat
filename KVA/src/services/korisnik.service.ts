import { Film } from "../models/film"
import { Ticket } from "../models/ticket"
import { Korisnik } from "../models/korisnik"

export class UserService {

    static retrieveUsers(): Korisnik[] {
        if (!localStorage.getItem('users')) {
            const arr: Korisnik[] = [
                {
                    username: 'korisnik1',
                    email: 'user@example.com',
                    name: 'Example',
                    surname: 'User',
                    phoneNumber: '+3816123456789',
                    address: 'Mokroluska 14, Vozdovac',
                    tickets: [],
                    watchedMovies: [],
                    favoriteMovies: [],
                    password: 'user123'
                }
            ]

            localStorage.setItem('users', JSON.stringify(arr))
        }

        return JSON.parse(localStorage.getItem('users')!)
    }

    static createUser(model: Korisnik) {
        const users = this.retrieveUsers()

        for (let u of users) {
            if (u.email === model.email)
                return false
        }

        users.push(model)
        localStorage.setItem('users', JSON.stringify(users))
        return true
    }

    static updateUser(model: Korisnik) {
        const users = this.retrieveUsers()
        for (let u of users) {
            if (u.email === model.email) {
                u.name = model.name
                u.surname = model.surname
                u.address = model.address
                u.phoneNumber = model.phoneNumber
                u.favoriteMovies = model.favoriteMovies
                u.username = model.username
            }
        }

        localStorage.setItem('users', JSON.stringify(users))
    }

    static login(email: string, password: string): boolean {
        for (let user of this.retrieveUsers()) {
            if (user.email === email && user.password === password) {
                localStorage.setItem('active', user.email)
                return true
            }
        }

        return false
    }

    static getActiveUser(): Korisnik | null {
        if (!localStorage.getItem('active'))
            return null

        for (let user of this.retrieveUsers()) {
            if (user.email == localStorage.getItem('active')) {
                return user
            }
        }

        return null
    }

    static changePassword(newPassword: string): boolean {

        const arr = this.retrieveUsers()
        for (let user of arr) {
            if (user.email == localStorage.getItem('active')) {
                user.password = newPassword
                localStorage.setItem('users', JSON.stringify(arr))
                return true
            }
        }

        return false
    }
    
}