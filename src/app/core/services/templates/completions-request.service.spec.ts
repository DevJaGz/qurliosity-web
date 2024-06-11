import { TestBed } from '@angular/core/testing';

import { CompletionsRequestService } from './completions-request.service';

describe('CompletionsRequestService', () => {
  let service: CompletionsRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompletionsRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
