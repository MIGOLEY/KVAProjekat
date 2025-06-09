import { Component } from '@angular/core';
import { FilmService } from 'services/film.service';
import { UtilsService } from 'services/utils.service';
import { Film } from '../../models/film';
import { Korisnik } from '../../models/korisnik';
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
import { Input } from '@angular/core';
import { UserService } from 'services/korisnik.service';

@Component({
  selector: 'app-film',
  imports: [NgFor,NgIf, RouterLink, MatCardModule, MatListModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './film.component.html',
  styleUrl: './film.component.css'
})
export class FilmComponent {
  public movies: Film | null = null
  public error: string | null = null
  public userInputDate: string = ""
  public userInputTime: string = ""
  public userInputRating: number = 0
  public userInputComment: string = ""
  public user: Korisnik | null = UserService.getActiveUser()
  public status: string = ""
  public purchaseHistory: any[] = [];
  public purchaseHistoryForUser: any[] = [];
  public userRatings: any[] = [];
  public userReview: any [] = [];

  ngOnInit(){
    const purchaseHistory = localStorage.getItem('purchaseHistory');
    this.purchaseHistory = purchaseHistory ? JSON.parse(purchaseHistory) : [];
    for (let i = 0; i < this.purchaseHistory.length; i++){
      if(this.purchaseHistory[i].activeUser == this.user?.email){
        this.purchaseHistoryForUser.push(this.purchaseHistory[i]);
      }
    }
    const ratings = localStorage.getItem('userRatings')
    this.userRatings = ratings ? JSON.parse(ratings) : [];
  }
   

  constructor(private route: ActivatedRoute, public utils: UtilsService) {
    route.params.subscribe(params => {
      FilmService.getMovieById(params['id'])
        .then(rsp => {
          const movie: Film = rsp.data;
          this.movies = {
            ...movie,
            price: this.utils.priceMap.get(movie.movieId) || 0,
            projectionDate: this.utils.projectionDate,
            projectionTime: this.utils.projectionTime,
            //rating: this.rating;
            //comment: this.comment;
          };
          this.provera();
          this.filterComm();
        })
        .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
      }
    )
  }

  provera(): void {
    for(let i = 0; i < this.purchaseHistoryForUser.length; i++){
      if(this.purchaseHistoryForUser[i].movieId === this.movies?.movieId && this.purchaseHistoryForUser[i].status == "Gledano" ){
        if(this.userRatings.length > 0){
          for(let i = 0; i < this.userRatings.length; i++){
            if(this.userRatings[i].user === this.user?.email && this.userRatings[i].movieId === this.movies?.movieId){
              this.status = "Komentarisao"
              break;
            }
            else{
              this.status = "Gledano"
            }
          }
        }
        else{
          this.status = "Gledano"
        }
      }
    }
 }

  PostaviOcenu(movie: any, rating: number, comment: string){
    const newRating = {
      movieId: movie.movieId,
      rating: rating,
      comment: comment,
      user: this.user?.email
    }
    this.userRatings.push(newRating)
    localStorage.setItem('userRatings', JSON.stringify(this.userRatings))
    window.location.reload()
  }

  filterComm(){
    if (!this.movies) return;
    this.userReview = this.userRatings.filter(rating => rating.movieId === this.movies?.movieId);
  }

  ProsecnaOcena(): number{
    let sum = 0
    let br = 0
    for(let i = 0; i < this.userRatings.length; i++){
      if(this.userRatings[i].movieId == this.movies?.movieId){
        sum += Number(this.userRatings[i].rating)
        br++
      }
    }
    return sum/br
}

/*
const average = (numbers: number[]) => sum(numbers) / numbers.length;

const sum = (numbers: number[]) => numbers.reduce((total, aNumber) => total + aNumber, 0);
*/
}