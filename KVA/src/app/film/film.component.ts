import { Component } from '@angular/core';
import { FilmService } from 'services/film.service';
import { UtilsService } from 'services/utils.service';
import { Film } from '../../models/film';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SafePipe } from "../safe.pipe";
import { NgFor,NgIf } from '@angular/common';
import { AxiosError } from 'axios';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-film',
  imports: [NgFor,NgIf, SafePipe, RouterLink, MatCardModule, MatListModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './film.component.html',
  styleUrl: './film.component.css'
})
export class FilmComponent {
  public movies: Film | null = null
  public error: string | null = null
  public userInputDate: string = ""
  public userInputTime: string = ""

  constructor(private route: ActivatedRoute, public utils: UtilsService) {
    route.params.subscribe(params => {
      FilmService.getMovieById(params['id'])
        .then(rsp => {
          const movie: Film = rsp.data;
          this.movies = {
            ...movie,
            price: this.utils.priceMap.get(movie.movieId) || 0,
            projectionDate: this.utils.projectionDate,
            projectionTime: this.utils.projectionTime
          };
        })
        .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
     })
    }
}

