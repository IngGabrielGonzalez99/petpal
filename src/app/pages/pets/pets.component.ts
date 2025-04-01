import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardpetComponent } from '../HomePage/components/cardpet/cardpet.component';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [RouterModule, CardpetComponent],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css'
})
export class PetsComponent {

}
