import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePresentationComponent } from './create-presentation.component';

describe('CreatePresentationComponent', () => {
  let component: CreatePresentationComponent;
  let fixture: ComponentFixture<CreatePresentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePresentationComponent]
    });
    fixture = TestBed.createComponent(CreatePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
