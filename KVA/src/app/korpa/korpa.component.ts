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
  public displayedColumns: string[] = ['movieId', 'title', 'poster', 'runTime', 'startDate', 'price', 'total' , 'count', 'status', ];
  public displayedReservationHistoryColumns: string[] = ['movieId', 'title', 'poster', 'runTime', 'startDate', 'price', 'count', 'status', ];

  @Input() orders: any[] = [];
  reservationHistory: any[] = [];

  ngOnInit() {
  const savedOrders = localStorage.getItem('orders');
  this.orders = savedOrders ? JSON.parse(savedOrders) : [];

  const reservationHistory = localStorage.getItem('purchaseHistory');
  this.reservationHistory = reservationHistory ? JSON.parse(reservationHistory) : [];
  }
  constructor(public utils: UtilsService){
    
  }
  clearLocalStorage(){
      localStorage.removeItem('orders')
      window.location.reload()
  }
  getTotalPrice(): number {
  return Number(this.orders.reduce((total, order) => total + (order.price * order.count || 0), 0));
}
Purchase() {
    const activeUser = UserService.getActiveUser()?.email;
    // const ordered = this.orders.find(o => o.movie === movie.id);
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
    // const bought = purchaseHistory.find((o: any) => o.movieId === movie.id);
    // if (bought) {
    //   bought.count += 1;
    // }
    for (let i = 0; i < orders.length; i++) {
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
        activeUser: activeUser
        // DODATI RATING
      });
    }
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
  }

}
