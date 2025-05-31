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
  selector: 'app-pretraga',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, RouterLink, JsonPipe],
  templateUrl: './pretraga.component.html',
  styleUrl: './pretraga.component.css'
})
export class PretragaComponent {
  service = FilmService
  public movies: Film[] | null = null//Film[] | null = null
  public error: string | null = null
  
  constructor(public utils: UtilsService) {
    // FilmService.getMovieById(1)
    FilmService.getMoviesSearch("brat")
      .then(rsp => 
        this.movies = rsp.data
        // this.movies = rsp.data.content
      )
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
  }
}