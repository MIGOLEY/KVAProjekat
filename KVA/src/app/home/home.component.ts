import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';
import { AxiosError } from 'axios';
import { JsonPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Genre } from 'models/genre';
import { Actor } from 'models/actor';
import { Director } from 'models/director';


@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, RouterLink, JsonPipe, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  service = FilmService
  public movies: Film[] | null = null
  public error: string | null = null
  public genres: Genre[] | null = null
  // public filteredGeners: Observable< Genre[] > | null = null
  public actors: Actor[] | null = null
  public directors: Director[] | null = null
  userInputName: string = ''
  userInputActor: string = ''
  userInputGenre: string = ''
  userInputDirector: string = ''
  searchValue: string = ''
  actorId: number | null = null
  genreId: number | null = null
  directorId: number | null = null
  orders: any[] = [];

  constructor(public utils: UtilsService) {
    FilmService.getMoviesSearch(this.searchValue)
      .then(rsp => 
        this.movies = rsp.data
      )
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
    FilmService.getGenre()
      .then(rsp => 
        this.genres = rsp.data
      )
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
    FilmService.getActor()
      .then(rsp => 
        this.actors = rsp.data
      )
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
    FilmService.getDirector()
      .then(rsp => 
        this.directors = rsp.data
      )
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
  }
  // onGenreSelected(){
  //   const
  // }
  Search() {
    sessionStorage.setItem('inputName', this.userInputName);
    
    let name = sessionStorage.getItem('inputName');
   
    if (!name) {
      name = "";
    }

    FilmService.getMoviesSearch(name)
    .then(rsp => 
      this.movies = rsp.data
    )
    
    .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
  }
  Filter() {
    // sessionStorage.setItem('inputActor', this.userInputActor);
    // sessionStorage.setItem('inputGenre', this.userInputGenre);
    // sessionStorage.setItem('inputDirector', this.userInputDirector);

    // let actor = sessionStorage.getItem('inputActor');
    // let genre = sessionStorage.getItem('inputGenre');
    // let director = sessionStorage.getItem('inputDirector');
    let actor = this.userInputActor;
    let genre = this.userInputGenre;
    let director = this.userInputDirector;

    if (actor) {
      this.actorId = Number(actor);
    }

    if (genre) {
      this.genreId = Number(genre);
    }

    if (director) {
      this.directorId = Number(director);
    }

    FilmService.getMoviesFilter(this.actorId, this.genreId, this.directorId)
    .then(rsp => 
      this.movies = rsp.data
    )
    
    .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)

    this.genreId = null
    this.directorId = null
    this.actorId = null
  }
Orders(movie: any) {
  // const ordered = this.orders.find(o => o.movie === movie.id);
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const ordered = orders.find((o: any) => o.movieId === movie.id);
  if (ordered) {
    ordered.count += 1;
  } else {
    orders.push({
      // active: boolean;
      // corporateId: string;
      // createdAt: Date;
      // description: string;
      // director: Director;
      // directorId: number;
      // internalId: string;
      // movieActors: MovieActor[];
      // movieGenres: MovieGenre[];
      movieId: movie.movieId,
      // originalTitle: string;
      poster: movie.poster,
      runTime: movie.runTime,
      // shortDescription: string;
      // shortUrl: string;
      startDate: movie.startDate,
      title: movie.title
      // updatedAt: null;

      // DODATI PRICE I RATING
    });
  }
  localStorage.setItem('orders', JSON.stringify(orders));
}
}
