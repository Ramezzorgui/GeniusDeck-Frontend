import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationHistoryListComponent } from './generation-history-list.component';

describe('GenerationHistoryListComponent', () => {
  let component: GenerationHistoryListComponent;
  let fixture: ComponentFixture<GenerationHistoryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerationHistoryListComponent]
    });
    fixture = TestBed.createComponent(GenerationHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
