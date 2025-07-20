import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationHistoryFormComponent } from './generation-history-form.component';

describe('GenerationHistoryFormComponent', () => {
  let component: GenerationHistoryFormComponent;
  let fixture: ComponentFixture<GenerationHistoryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerationHistoryFormComponent]
    });
    fixture = TestBed.createComponent(GenerationHistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
