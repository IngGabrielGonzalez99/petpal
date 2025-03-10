import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardpetComponent } from './cardpet.component';

describe('CardpetComponent', () => {
  let component: CardpetComponent;
  let fixture: ComponentFixture<CardpetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardpetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardpetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
