import { TestBed } from '@angular/core/testing';

import { GenerationHistoryService } from './generation-history.service';

describe('GenerationHistoryService', () => {
  let service: GenerationHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerationHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
