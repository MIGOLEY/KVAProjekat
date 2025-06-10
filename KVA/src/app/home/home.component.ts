import { Component, OnInit } from '@angular/core';
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
import express, { Request, Response } from 'express';

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  service = FilmService
  public movies: Film[] = []
  public error: string | null = null
  public genres: Genre[] | null = null
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
  public userRatings: any[] = [];

  constructor(public utils: UtilsService) {
    FilmService.getMoviesSearch(this.searchValue)
      .then(rsp => {
        this.movies = rsp.data.map((movie: Film) => ({
          ...movie,
          price: utils.priceMap.get(movie.movieId)
        }));
      })
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
      const ratings = localStorage.getItem('userRatings')
      this.userRatings = ratings ? JSON.parse(ratings) : [];
  }
  Search() {
    sessionStorage.setItem('inputName', this.userInputName);

    let name = sessionStorage.getItem('inputName');

    if (!name) {
      name = "";
    }

    FilmService.getMoviesSearch(name)
      .then(rsp =>
        this.movies = rsp.data.map((movie: Film) => ({
          ...movie,
          price: this.utils.priceMap.get(movie.movieId)
        }))
      )

      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
  }

  Filter() {

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
        this.movies = rsp.data.map((movie: Film) => ({
          ...movie,
          price: this.utils.priceMap.get(movie.movieId)
        }))
      )

      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)

    this.genreId = null
    this.directorId = null
    this.actorId = null
  }
  ProsecnaOcena(movieId: number): number{
    let sum = 0
    let br = 0
    for(let i = 0; i < this.userRatings.length; i++){
      if(this.userRatings[i].movieId == movieId){
        sum += Number(this.userRatings[i].rating)
        br++
      }
    }
    if((sum/br) > 0){
      return sum/br
    }
    else{
      return 0
    }
  }
  //mozda
  Slider(){
    // Set the price gap
    const priceGap: number = 500;

    // Get the price input elements
    const priceInputvalue: NodeListOf<HTMLInputElement> = document.querySelectorAll(".price-input input");

    // Assuming these elements exist:
    const rangeInputvalue: NodeListOf<HTMLInputElement> = document.querySelectorAll(".range-input input");
    const rangevalue: HTMLElement = document.querySelector(".slider .progress") as HTMLElement;

    for (let i = 0; i < priceInputvalue.length; i++) {
        priceInputvalue[i].addEventListener("input", (e: Event) => {
            const target = e.target as HTMLInputElement;

            let minp = parseInt(priceInputvalue[0].value);
            let maxp = parseInt(priceInputvalue[1].value);
            let diff = maxp - minp;

            if (minp < 0) {
                alert("minimum price cannot be less than 0");
                priceInputvalue[0].value = "0";
                minp = 0;
            }

            if (maxp > 10000) {
                alert("maximum price cannot be greater than 10000");
                priceInputvalue[1].value = "10000";
                maxp = 10000;
            }

            if (minp > maxp - priceGap) {
                priceInputvalue[0].value = (maxp - priceGap).toString();
                minp = maxp - priceGap;

                if (minp < 0) {
                    priceInputvalue[0].value = "0";
                    minp = 0;
                }
            }

            if (diff >= priceGap && maxp <= parseInt(rangeInputvalue[1].max)) {
                if (target.classList.contains("min-input")) {
                    rangeInputvalue[0].value = minp.toString();
                    let value1 = parseInt(rangeInputvalue[0].max);
                    rangevalue.style.left = `${(minp / value1) * 100}%`;
                } else {
                    rangeInputvalue[1].value = maxp.toString();
                    let value2 = parseInt(rangeInputvalue[1].max);
                    rangevalue.style.right = `${100 - (maxp / value2) * 100}%`;
                }
            }
        });
    }

    // Add event listeners to range input elements
    for (let i = 0; i < rangeInputvalue.length; i++) {
      rangeInputvalue[i].addEventListener("input", (e: Event) => {
        const target = e.target as HTMLInputElement;

        let minVal = parseInt(rangeInputvalue[0].value);
        let maxVal = parseInt(rangeInputvalue[1].value);
        let diff = maxVal - minVal;

        if (diff < priceGap) {
            if (target.classList.contains("min-range")) {
                rangeInputvalue[0].value = (maxVal - priceGap).toString();
            } else {
                rangeInputvalue[1].value = (minVal + priceGap).toString();
            }
        } else {
            priceInputvalue[0].value = minVal.toString();
            priceInputvalue[1].value = maxVal.toString();
            rangevalue.style.left = `${(minVal / parseInt(rangeInputvalue[0].max)) * 100}%`;
            rangevalue.style.right = `${100 - (maxVal / parseInt(rangeInputvalue[1].max)) * 100}%`;
        }
      });
    }
  }
}