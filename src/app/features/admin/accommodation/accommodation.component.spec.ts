import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccommodationComponent } from './accommodation.component';

describe('AccommodationComponent', () => {
  let component: AdminAccommodationComponent;
  let fixture: ComponentFixture<AdminAccommodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAccommodationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
