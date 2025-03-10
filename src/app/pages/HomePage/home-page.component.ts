import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CardpetComponent } from './components/cardpet/cardpet.component';
import { HomescreenoneComponent } from './components/homescreenone/homescreenone.component';
import { HomescreentwoComponent } from './components/homescreentwo/homescreentwo.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomescreenoneComponent, HomescreentwoComponent, NavbarComponent, CardpetComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
