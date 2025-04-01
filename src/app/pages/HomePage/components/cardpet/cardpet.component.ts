import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../../../api.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cardpet',
  standalone: true,
  imports: [ButtonComponent, HttpClientModule, CommonModule],
  templateUrl: './cardpet.component.html',
  styleUrl: './cardpet.component.css'
})
export class CardpetComponent {
  animals: any[] = []

  private apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=20';  // Ejemplo de URL

  constructor(private http: HttpClient) { }

  // Método para obtener datos de la API
  getAnimals(): Observable<any> {
    return this.http.get(this.apiUrl);
  }


  ngOnInit(): void {
    this.loadAnimals();  // Llamamos la función que obtiene los animales
  }

  loadAnimals(): void {
    this.getAnimals().subscribe(
      (data) => {
        this.animals = data;
        console.log(this.animals);  // Ver los datos en consola
      },
      (error) => {
        console.error('Error fetching animals:', error);  // Manejo de error
      }
    );
  }

}
