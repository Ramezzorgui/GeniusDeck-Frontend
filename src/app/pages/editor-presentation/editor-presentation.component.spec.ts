import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPresentationComponent } from './editor-presentation.component';

describe('EditorPresentationComponent', () => {
  let component: EditorPresentationComponent;
  let fixture: ComponentFixture<EditorPresentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorPresentationComponent]
    });
    fixture = TestBed.createComponent(EditorPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
