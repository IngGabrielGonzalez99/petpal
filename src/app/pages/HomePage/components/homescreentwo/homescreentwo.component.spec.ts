import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomescreentwoComponent } from './homescreentwo.component';

describe('HomescreentwoComponent', () => {
  let component: HomescreentwoComponent;
  let fixture: ComponentFixture<HomescreentwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomescreentwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomescreentwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
