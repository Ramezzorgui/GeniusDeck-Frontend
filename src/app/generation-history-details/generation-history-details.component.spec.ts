import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationHistoryDetailsComponent } from './generation-history-details.component';

describe('GenerationHistoryDetailsComponent', () => {
  let component: GenerationHistoryDetailsComponent;
  let fixture: ComponentFixture<GenerationHistoryDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerationHistoryDetailsComponent]
    });
    fixture = TestBed.createComponent(GenerationHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
