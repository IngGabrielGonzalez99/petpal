import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomescreenoneComponent } from './homescreenone.component';

describe('HomescreenoneComponent', () => {
  let component: HomescreenoneComponent;
  let fixture: ComponentFixture<HomescreenoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomescreenoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomescreenoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
