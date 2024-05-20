import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidComponent } from './covid.component';

describe('CovidComponent', () => {
  let component: CovidComponent;
  let fixture: ComponentFixture<CovidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CovidComponent]
    });
    fixture = TestBed.createComponent(CovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
