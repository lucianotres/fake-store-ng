import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhosPageComponent } from './carrinhos-page.component';

describe('CarrinhosPageComponent', () => {
  let component: CarrinhosPageComponent;
  let fixture: ComponentFixture<CarrinhosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrinhosPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrinhosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
