import { Injectable } from '@angular/core';
import { UserService } from './korisnik.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

 ratings: any[] = [
  {movieId: 1, rating: 1, comment: "Apsolutno užasno, hoću svoje vreme nazad!", user: "Milan_Ponja"},
  {movieId: 1, rating: 2, comment: "Nije bilo sjajno, ali bilo je par trenutaka.", user: "Kupindo"},
  {movieId: 1, rating: 2, comment: "Moglo je bolje, iskreno.", user: "miloradM24"},
  {movieId: 1, rating: 4, comment: "Stvarno sam uživao, gledao bih opet!", user: "volimPesak"},
  {movieId: 1, rating: 2, comment: "I mean, it’s okay, I guess??", user: "zeljko_samardzic_1978"},
  {movieId: 2, rating: 5, comment: "Remek-delo! Svaki sekund je bio fantastičan.", user: "indigo"},
  {movieId: 2, rating: 5, comment: "Pet zvezdica, bez pitanja!", user: "YUGOKORAL55"},
  {movieId: 2, rating: 4, comment: "Solidan film, ali su neki delovi bili spori.", user: "Mentese"},
  {movieId: 2, rating: 3, comment: " ", user: "LionelMessi10_2006_DJordje"},
  {movieId: 2, rating: 5, comment: "Best movie I see this year!!!", user: "lubenicaaaaaa3"},
  {movieId: 2, rating: 2, comment: "Ovo bi i našega cara Dušana razočaralo", user: "djuradj_brankovic_licno"},
  {movieId: 3, rating: 5, comment: "Apsolutno zadivljujući vizuelni efekti i priča.", user: "zZzZZzZz"},
  {movieId: 3, rating: 5, comment: "Savršenstvo u filmskoj formi.", user: "Kinshasa"},
  {movieId: 3, rating: 4, comment: "Dobar film, ali nije savršen.", user: "LudiRadovan2005"},
  {movieId: 3, rating: 1, comment: "What even was that???!! Never again.", user: "TheSerbianCactus"},
  {movieId: 3, rating: 3, comment: "ej ljudi gde da skinem majnkfraft modove", user: "Mikigames"},
  {movieId: 4, rating: 5, comment: "OMG, totally blew my mind!!!", user: "ultra_gamer_77"},
  {movieId: 4, rating: 2, comment: "trash", user: "Los Santos Firefighting Association"},
  {movieId: 4, rating: 4, comment: "Sviđa mi se, preporučujem prijateljicama.", user: "ljubi_cika1223"},
  {movieId: 4, rating: 2, comment: "Two thumbs down but the popcorn was good.", user: "ok"},
  {movieId: 4, rating: 5, comment: "u sto jaki filmovi, jake egzibicije, produkcija u fulu", user: "Drzavna_Lutrija_Srbije"},
  {movieId: 4, rating: 2, comment: "ehhh... nije za mene.", user: "boba39"},
  {movieId: 4, rating: 5, comment: "Sa namerom udjoh na ovaj sajt", user: "SABANSAULICPRODUCTIONS"},
  {movieId: 5, rating: 1, comment: "meh. boring. no fun.", user: "Mosha65"},
  {movieId: 5, rating: 1, comment: "Iiiiii gde ste bre ljudi ovo je NAJGORI film koji sam video u svom životu, pozdrav za Muđu i ćaleta aj igramo PES neki dan jajca challenge opet", user: "SerbianGamesBL"},
  {movieId: 5, rating: 4, comment: " ", user: "master_chief2005"},
  {movieId: 5, rating: 5, comment: "¡Increíble!", user: "Inigo_Montoya"},
  {movieId: 6, rating: 1, comment: "nisam video bolji film do sada", user: "sasa_matic_official"}
 ];
 priceMap: Map<number, number> = new Map([
      [1, 999],
      [2, 699],
      [3, 499],
      [4, 1199],
      [5, 899],
      [6, 599],
      [7, 649],
      [8, 1299],
      [9, 399],
      [10, 349],
      [11, 199],
      [12, 699],
      [13, 799],
      [14, 799],
      [15, 1099],
      [16, 299],
      [17, 359],
      [18, 699],
      [19, 499],
      [20, 599],
      [21, 259],
      [22, 759],
      [23, 599],
      [24, 399],
      [25, 529],
      [26, 1099],
      [27, 999],
      [28, 859],
      [29, 379],
      [30, 399],
      [31, 499],
      [32, 699],
      [33, 1250],
      [34, 419],
      [35, 559],
      [36, 459],
      [37, 899],
      [38, 1099],
      [39, 609],
      [40, 799],
      [41, 899],
      [42, 799],
      [43, 399],
      [44, 499],
      [45, 699],
      [46, 599],
      [47, 299],
      [48, 369],
      [49, 479],
      [50, 959],
      [51, 699],
      [52, 799],
      [53, 1499],
      [54, 239],
      [55, 199],
      [56, 399],
      [57, 599],
      [58, 529],
      [59, 649],
      [60, 899],
      [61, 399],
      [62, 459],
      [63, 999],
      [64, 259],
      [65, 1099],
      [66, 799],
      [67, 689],
      [68, 789],
      [69, 299],
      [70, 459],
      [71, 1259],
      [72, 1299],
      [73, 399],
      [74, 459],
      [75, 489],
      [76, 239],
      [77, 189],
      [78, 769],
      [79, 1499],
      [80, 299],
      [81, 499],
      [82, 659]
 ]);
  public projectionDate: string[] = []; 
  public projectionTime: string[] = ['12:00','14:30','15:30','17:00','19:00']; 
  constructor() { 
    let datestring
    for(let i=0; i < 5; i++){
      let date = new Date()
      date.setDate(date.getDate() + i)
      datestring = date.toISOString().slice(0, 10)
      this.projectionDate.push(datestring)
    }
  }

  public generateMovieImage(poster: string) {
    return poster;
  }

  public formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS').slice(0,12)
  }
  public round(number: number){
    return Math.round(number)
  }
  public round2(number: number){
    return Math.round(number * 100) / 100
  }
  public leftover(number: number){
    return number % 60
  }
  public multiply(cena: number, kolicina: number): number{
    if(kolicina>0 && kolicina <= 10){
      return cena*kolicina
    }
    else if(kolicina > 10){
      return cena*10
    }
    else{
      return cena*1
    }
  }

  public setRatings(){
    localStorage.setItem("userRatings", JSON.stringify(this.ratings))
  }
  
   Orders(movie: any, userInputDate: string, userInputTime: string, userInputCount: number) {
    const activeUser = UserService.getActiveUser()?.username;
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const ordered = orders.find((o: any) => (o.movieId === movie.movieId) && (o.projectionTime === userInputTime) && (o.projectionDate === userInputDate) );
    if(!activeUser){
      alert("Ulogujte se");
    }
    else if (ordered && ordered.count <= 10 && activeUser && userInputCount > 0) {
      if((userInputCount + ordered.count) <= 10){
        ordered.count += userInputCount;
        alert("Dodali ste u korpu još karata za ovu projekciju");
      }
      else{
        alert("Previše karata! Maksimum je 10 po projekciji")
      }
    } else if(userInputDate != '' && userInputTime != '' && userInputCount > 0 && userInputCount <= 10 && activeUser) {
      alert("Dodali ste film u vašu korpu");
      orders.push({
        movieId: movie.movieId,
        poster: movie.poster,
        runTime: movie.runTime,
        startDate: movie.startDate,
        projectionDate: userInputDate,
        projectionTime: userInputTime, 
        title: movie.title,
        price: movie.price,
        status: '',
        rating: '',
        count: userInputCount,
        activeUser: activeUser
      });
    }
    else{
        alert("Unesite datum i vreme projekcije \nMaksimalna količina karata je 10");
      }
    localStorage.setItem('orders', JSON.stringify(orders));
  }
  
}


