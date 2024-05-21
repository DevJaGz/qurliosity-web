import { TestBed } from '@angular/core/testing';

import { SourcesRequestService } from './sources-request.service';

describe('SourcesRequestService', () => {
  let service: SourcesRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourcesRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
