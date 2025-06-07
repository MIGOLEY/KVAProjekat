import { Component } from '@angular/core';
import { UserService } from '../../services/korisnik.service';
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Korisnik } from '../../models/korisnik';
import { MatTableModule } from '@angular/material/table';
// import { OrderModel } from '../../models/order.model';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FilmService } from '../../services/film.service';
import { Input} from '@angular/core';
import { UtilsService } from 'services/utils.service';

@Component({
  selector: 'app-korpa',
  imports: [NgIf,
    NgFor,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    RouterLink,
    MatExpansionModule,
    MatAccordion,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,],
  templateUrl: './korpa.component.html',
  styleUrl: './korpa.component.css'
})
export class KorpaComponent {
  public displayedColumns: string[] = ['movieId', 'title', 'poster', 'runTime', 'startDate', 'projectionDate', 'projectionTime', 'price', 'total' , 'count', 'status', /*'rating' ,*/ /*'ratingComment'*/];
  private activeUser = UserService.getActiveUser()?.email;

  @Input() orders: any[] = [];
  ordersForUser: any[] = [];
  ordersForDifferentUsers: any[] = [];
  purchaseHistory: any[] = [];
  purchaseHistoryForUser: any[] = [];

  ngOnInit() {
  const savedOrders = localStorage.getItem('orders');
  this.orders = savedOrders ? JSON.parse(savedOrders) : [];
  for(let i=0; i < this.orders.length; i++){
    if(this.orders[i].activeUser == this.activeUser){
      this.ordersForUser.push(this.orders[i]);
    }
    else{
      this.ordersForDifferentUsers.push(this.orders[i]);
    }
  }

  const reservationHistory = localStorage.getItem('purchaseHistory');
  this.purchaseHistory = reservationHistory ? JSON.parse(reservationHistory) : [];
  for(let i=0; i < this.purchaseHistory.length; i++){
    if(this.purchaseHistory[i].activeUser == this.activeUser){
      this.purchaseHistoryForUser.push(this.purchaseHistory[i]);
    }
  }
  }
  constructor(public utils: UtilsService){
    
  }
  clearLocalStorage(){
      localStorage.setItem('orders', JSON.stringify(this.ordersForDifferentUsers))
      window.location.reload()
  }
  getTotalPrice(): number {
  return Number(this.ordersForUser.reduce((total, ordersForUser) => total + (ordersForUser.price * ordersForUser.count || 0), 0));
}
Reserve() {
    // const ordered = this.orders.find(o => o.movie === movie.id);
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
    // const bought = purchaseHistory.find((o: any) => o.movieId === movie.id);
    // if (bought) {
    //   bought.count += 1;
    // }
    for (let i = 0; i < orders.length; i++) {
      if(orders[i].activeUser == this.activeUser){
        purchaseHistory.push({
          movieId: orders[i].movieId,
          poster: orders[i].poster,
          runTime: orders[i].runTime,
          startDate: orders[i].startDate,
          title: orders[i].title,
          price: orders[i].price,
          status: 'Rezervisano',
          count: orders[i].count,
          total: orders[i].price * orders[i].count,
          activeUser: this.activeUser
        });
      }
    }
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
  }

}
