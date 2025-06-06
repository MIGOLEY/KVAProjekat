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
    MatSelectModule],
  templateUrl: './korpa.component.html',
  styleUrl: './korpa.component.css'
})
export class KorpaComponent {
  public displayedColumns: string[] = ['movieId', 'title', 'poster', 'runTime', 'startDate', 'price'];
  @Input() orders: any[] = [];

  ngOnInit() {
  const savedOrders = localStorage.getItem('orders');
  this.orders = savedOrders ? JSON.parse(savedOrders) : [];
  }
  constructor(public utils: UtilsService){
    
  }
  clearLocalStorage(){
      localStorage.removeItem('orders')
      window.location.reload()
  }
  getTotalPrice(): number {
  return Number(this.orders.reduce((total, order) => total + (order.price || 0), 0));
}

}
