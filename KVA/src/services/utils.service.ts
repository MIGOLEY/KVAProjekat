import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public generateMovieImage(poster: string) {
    return poster;
  }

    public formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS')
  }
}


