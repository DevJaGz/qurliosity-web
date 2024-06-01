import { TestBed } from '@angular/core/testing';

import { PromptsRequestService } from './prompts-request.service';

describe('PromptsRequestService', () => {
  let service: PromptsRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromptsRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
