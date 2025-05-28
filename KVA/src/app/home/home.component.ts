import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';
import { AxiosError } from 'axios';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, RouterLink, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  service = FilmService
  public movies: Film[] | null = null//Film[] | null = null
  public error: string | null = null

  constructor(public utils: UtilsService) {
    // FilmService.getMovieById(1)
    FilmService.getMovies()
      .then(rsp => 
        this.movies = rsp.data
      )
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
  }
}
