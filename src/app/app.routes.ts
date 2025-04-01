import { Routes } from '@angular/router';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { HomePageComponent } from './pages/HomePage/home-page.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PetsComponent } from './pages/pets/pets.component';
import { GameComponent } from './pages/game/game.component';

export const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'pets', component: PetsComponent},
  {path: 'game', component: GameComponent},

];
