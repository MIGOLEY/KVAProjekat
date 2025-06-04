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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, RouterLink, JsonPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  service = FilmService
  public movies: Film[] | null = null//Film[] | null = null
  public error: string | null = null
  userInput: string = '';
  searchValue: string = '';

  constructor(public utils: UtilsService) {
    FilmService.getMoviesSearch(this.searchValue)
      .then(rsp => 
        this.movies = rsp.data
      )
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
  }

  search(){
  
  }
  saveToSessionStorage() {
    sessionStorage.setItem('myInput', this.userInput);
    let saved = sessionStorage.getItem('myInput');
    
    if (saved) {
      this.searchValue = saved;
    }
    else{
      this.searchValue = "";
    }
    
    FilmService.getMoviesSearch(this.searchValue)
    .then(rsp => 
      this.movies = rsp.data
    )
    .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
  }
}
