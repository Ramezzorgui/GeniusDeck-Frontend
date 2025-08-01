import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPresentationComponent } from './saved-presentation.component';

describe('SavedPresentationComponent', () => {
  let component: SavedPresentationComponent;
  let fixture: ComponentFixture<SavedPresentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedPresentationComponent]
    });
    fixture = TestBed.createComponent(SavedPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
