import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { KorpaComponent } from './korpa/korpa.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { FilmComponent } from './film/film.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'korisnik', component: KorisnikComponent },
    { path: 'korpa', component: KorpaComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'pretraga', component: PretragaComponent },
    { path: 'film', component: FilmComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];