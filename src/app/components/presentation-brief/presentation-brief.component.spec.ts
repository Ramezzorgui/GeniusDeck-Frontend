import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationBriefComponent } from './presentation-brief.component';

describe('PresentationBriefComponent', () => {
  let component: PresentationBriefComponent;
  let fixture: ComponentFixture<PresentationBriefComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentationBriefComponent]
    });
    fixture = TestBed.createComponent(PresentationBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
