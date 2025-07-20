import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationDetailsComponent } from './presentation-details.component';

describe('PresentationDetailsComponent', () => {
  let component: PresentationDetailsComponent;
  let fixture: ComponentFixture<PresentationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentationDetailsComponent]
    });
    fixture = TestBed.createComponent(PresentationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
