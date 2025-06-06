import { Component } from '@angular/core';
import { FilmService } from 'services/film.service';
import { UtilsService } from 'services/utils.service';
import { Film } from '../../models/film';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SafePipe } from "../safe.pipe";
import { NgIf } from '@angular/common';
import { AxiosError } from 'axios';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-film',
  imports: [NgIf, SafePipe, RouterLink, MatCardModule, MatListModule, MatButtonModule],
  templateUrl: './film.component.html',
  styleUrl: './film.component.css'
})
export class FilmComponent {
  public movies: Film | null = null
  public error: string | null = null
  constructor(private route: ActivatedRoute, public utils: UtilsService) {
    route.params.subscribe(params => {
      FilmService.getMovieById(params['id'])
        .then(rsp => {
          const movie: Film = rsp.data;
          this.movies = {
            ...movie,
            price: this.utils.priceMap.get(movie.movieId) || 0
          };
        })
        .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
     })
    }
}

