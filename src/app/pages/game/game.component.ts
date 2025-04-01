import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  // Estados del juego
  gameStarted = false;
  gameActive = true;
  lostGame = false;
  isWorking = false;
  petState = 'normal';
  state = "";
  private eventInterval: any;

  constructor() {
    this.startEventLoop();
  }

  startEventLoop() {
    this.eventInterval = setInterval(() => {
      this.triggerRandomEvent();
    }, 15000); // Evento cada 15 segundos
  }
  // Estadísticas de la mascota
  hunger = 50;
  happiness = 50;
  thirst = 50;
  energy = 50;

  // Sistema de niveles y experiencia
  currentLevel = 1;
  currentExp = 0;
  expToNextLevel = 100;
  maxLevel = 100;
  baseExpRewards = {
    feeding: 10,
    drinking: 8,
    playing: 15,
    sleeping: 5,
    working: 20

  };

  get expRewards() {
    return Object.fromEntries(
      Object.entries(this.baseExpRewards).map(([key, value]) => [key, value + Math.floor(this.currentLevel * 1.5)])
    );
  }

  // Sistema de notificaciones
  notificationMessage = '';
  showNotification = false;
  private notificationTimeout: any;

  displayNotification(message: string, duration: number = 3000) {
    this.notificationMessage = message;
    setTimeout(() => this.notificationMessage = '', duration);
  }


  // Sistema económico
  coins = 100;
  get foodPrice(): number { return 10 + (this.currentLevel * 2); }
  get waterPrice(): number { return 5 + (this.currentLevel * 1.5); }
  get playCost(): number { return 5 + (this.currentLevel * 1); }
  get workIncome(): number { return 20 + (this.currentLevel * 5); }

  get energyRecovery() { return 10 + this.currentLevel; }
  get hydrationRecovery() { return 8 + this.currentLevel; }
  get happinessBoost() { return 15 + this.currentLevel * 2; }
  get sleepRecovery() { return 30 + this.currentLevel * 2; }
  giveDrink() {
    if (this.coins >= this.waterPrice) {
      this.coins -= this.waterPrice;
      this.thirst = Math.min(100, this.thirst + 20);
      this.energy = Math.min(100, this.energy + 5);
      this.updatePetState();
      this.gainExp('drinking');
    } else {
      this.displayNotification("¡No tienes suficientes monedas para comprar agua!");
    }
  }


  // Temporizadores
  private gameInterval: any;
  private workTimeout: any;

  startGame() {
    this.gameStarted = true;
    this.startGameLoop();
  }

  startGameLoop() {
    if (this.gameInterval) clearInterval(this.gameInterval);
    this.gameInterval = setInterval(() => {
      this.updatePetStats();
      this.updatePetState();
    }, 3000);
  }

  updatePetStats() {
    if (!this.gameActive) return;
    this.hunger = Math.max(0, this.hunger - 5);
    this.happiness = Math.max(0, this.happiness - 3);
    this.thirst = Math.max(0, this.thirst - 4);
    this.energy = Math.max(0, this.energy - 2);
    if (this.energy <= 0) this.gameOver();
    if (this.hunger <= 0) this.gameOver();
    if (this.thirst <= 0) this.gameOver();
    if (this.happiness <= 0) this.gameOver();
  }

  updatePetState() {
    if (this.energy <= 20) this.petState = 'sleepy';
    else if (this.hunger <= 20) this.petState = 'hungry';
    else if (this.thirst <= 20) this.petState = 'thirsty';
    else if (this.happiness >= 70) this.petState = 'happy';
    else this.petState = 'normal';
  }



  triggerRandomEvent() {
    if (!this.gameActive) return;

    const events = [
      {
        message: "Lluvia refrescante: ¡La lluvia refrescó a tu mascota! +15 hidratación",
        effect: () => { this.thirst = Math.min(100, this.thirst + 15); }
      },
      {
        message: "Comida inesperada: ¡Encontraste comida en el camino! +20 hambre",
        effect: () => { this.hunger = Math.min(100, this.hunger + 20); }
      },
      {
        message: "Mascota asustada: ¡Tu mascota se asustó por un ruido fuerte! -10 felicidad",
        effect: () => { this.happiness = Math.max(0, this.happiness - 10); }
      },
      {
        message: "Siesta corta: ¡Tu mascota tomó una siesta rápida! +10 energía",
        effect: () => { this.energy = Math.min(100, this.energy + 10); }
      },
      {
        message: "Día soleado: ¡Tu mascota disfruta el sol! +15 felicidad",
        effect: () => { this.happiness = Math.min(100, this.happiness + 15); }
      },
      {
        message: "Se perdió una moneda: ¡Perdiste 5 monedas!",
        effect: () => { this.coins = Math.max(0, this.coins - 5); }
      },
      {
        message: "Mascota encontró una moneda: ¡Tu mascota encontró 10 monedas!",
        effect: () => { this.coins += 10; }
      },
      {
        message: "Visita de un amigo: ¡Un amigo visitó a tu mascota! +20 felicidad",
        effect: () => { this.happiness = Math.min(100, this.happiness + 20); }
      },
      {
        message: "Día lluvioso: ¡El clima está lluvioso! +10 hidratación, -5 hambre",
        effect: () => {
          this.thirst = Math.min(100, this.thirst + 10);
          this.hunger = Math.max(0, this.hunger - 5);
        }
      },
      {
        message: "Día frío: ¡El frío ha hecho que tu mascota esté más cansada! -10 energía",
        effect: () => { this.energy = Math.max(0, this.energy - 10); }
      },
      {
        message: "Encuentro con otro animal: ¡Tu mascota hizo un nuevo amigo! +10 felicidad",
        effect: () => { this.happiness = Math.min(100, this.happiness + 10); }
      },
      {
        message: "Problema digestivo: ¡Tu mascota tiene malestar estomacal! -20 hambre",
        effect: () => { this.hunger = Math.max(0, this.hunger - 20); }
      },
      {
        message: "Descanso inesperado: ¡Tu mascota descansó un poco más de lo normal! +20 energía",
        effect: () => { this.energy = Math.min(100, this.energy + 20); }
      },
      {
        message: "Objeto extraño: ¡Tu mascota encontró algo extraño y no le gustó! -5 felicidad",
        effect: () => { this.happiness = Math.max(0, this.happiness - 5); }
      },
      {
        message: "Entrenamiento exitoso: ¡Tu mascota aprendió algo nuevo! -10 EXP requerida",
        effect: () => { this.expToNextLevel = Math.max(0, this.expToNextLevel - 10); }
      },
      {
        message: "Encuentro con un enemigo: ¡Tu mascota tuvo una disputa con otro animal! -15 felicidad",
        effect: () => { this.happiness = Math.max(0, this.happiness - 15); }
      },
      {
        message: "Día relajante: ¡Un día perfecto para relajarse! +15 energía, +5 felicidad",
        effect: () => {
          this.energy = Math.min(100, this.energy + 15);
          this.happiness = Math.min(100, this.happiness + 5);
        }
      },
      {
        message: "Pequeño resfriado: ¡Tu mascota se resfrió un poco! -15 energía",
        effect: () => { this.energy = Math.max(0, this.energy - 15); }
      },
      {
        message: "Fiesta sorpresa: ¡Tu mascota fue a una fiesta y la pasó increíble! +30 felicidad",
        effect: () => { this.happiness = Math.min(100, this.happiness + 30); }
      },
      {
        message: "Mal tiempo: ¡El clima malo hizo que tu mascota se pusiera triste! -10 felicidad",
        effect: () => { this.happiness = Math.max(0, this.happiness - 10); }
      }
    ];

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    randomEvent.effect();
    this.displayNotification(randomEvent.message);
}


  sleep() {
    this.energy = Math.min(100, this.energy + 40); // 🔥 Dormir ahora recupera más energía
    this.happiness = Math.max(0, this.happiness - 10);
    this.updatePetState();
    this.gainExp('sleeping');
  }

  gameOver() {
    this.lostGame = true;
    this.gameActive = false;
    clearInterval(this.gameInterval);
    this.petState = 'dead';
  }

  restartGame() {
    this.hunger = 50;
    this.happiness = 50;
    this.thirst = 50;
    this.energy = 50;
    this.coins = 100;
    this.currentLevel = 1;
    this.currentExp = 0;
    this.expToNextLevel = 100;
    this.lostGame = false;
    this.gameActive = true;
    this.petState = 'normal';
    this.startGameLoop();
  }

  feed() {
    if (this.coins >= this.foodPrice) {
      this.coins -= this.foodPrice;
      this.hunger = Math.min(100, this.hunger + 20);
      this.energy = Math.min(100, this.energy + 10);
      this.updatePetState();
      this.gainExp('feeding');
    } else {
      this.displayNotification("¡No tienes suficientes monedas para comprar comida!");
    }
  }
  play() {
    if (this.coins >= this.playCost) {
      this.coins -= this.playCost;
      this.happiness = Math.min(100, this.happiness + 25);
      this.energy = Math.max(0, this.energy - 15);
      this.updatePetState();
      this.gainExp('playing');
    } else {
      this.displayNotification("¡No tienes suficientes monedas para jugar!");
    }
  }



  work() {
    if (this.isWorking || !this.gameActive) return;
    this.isWorking = true;
    this.happiness = Math.max(0, this.happiness - 15);
    this.energy = Math.max(0, this.energy - 25);
    const workTime = Math.max(2000, 5000 - (this.currentLevel * 200));
    this.workTimeout = setTimeout(() => {
      this.coins += this.workIncome;
      this.isWorking = false;
      this.displayNotification(`¡Ganaste ${this.workIncome} monedas trabajando!`);
      this.gainExp('working');
    }, workTime);
  }

  gainExp(action: keyof typeof this.expRewards) {
    if (this.currentLevel >= this.maxLevel) return;
    this.currentExp += this.expRewards[action];
    if (this.currentExp >= this.expToNextLevel) this.levelUp();
  }

  levelUp() {
    this.currentLevel++;
    this.currentExp = 0;
    this.expToNextLevel = Math.floor(this.expToNextLevel * 1.5);
    this.displayNotification(`¡Subiste al nivel ${this.currentLevel}!`);
  }
}
