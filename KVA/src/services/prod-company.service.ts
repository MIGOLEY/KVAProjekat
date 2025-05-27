// import { Injectable } from '@angular/core';

import { ProdCompany } from "models/prod-company";

// @Injectable({
//   providedIn: 'root'
// })
export class ProdCompanyService {
    static getProdCompany(): ProdCompany[] {
        return [
          {
            id: 1,
            name: 'Universal Pictures',
            countryOfOrigin: 'United States',
            website: "https://universalpictures.com",
            yearEstablished: 1912
          },
          {
            id: 2,
            name: 'Pixar',
            countryOfOrigin: 'United States',
            website: "https://pixar.com",
            yearEstablished: 1979
          },
          {
            id: 3,
            name: 'Kosutnjak',
            countryOfOrigin: 'Serbia',
            website: "https://kosutnjak.com",
            yearEstablished: 2005
          },
          {
            id: 4,
            name: 'Firefly',
            countryOfOrigin: 'Serbia',
            website: "https://firefly.com",
            yearEstablished: 2018
          }
        ]
    }
}
