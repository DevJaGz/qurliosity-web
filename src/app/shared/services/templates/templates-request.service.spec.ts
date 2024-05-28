import { TestBed } from '@angular/core/testing';

import { TemplatesRequestService } from './templates-request.service';

describe('TemplatesRequestService', () => {
  let service: TemplatesRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplatesRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
