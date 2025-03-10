import { Routes } from '@angular/router';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { HomePageComponent } from './pages/HomePage/home-page.component';

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'aboutus', component: AboutusComponent},

];
