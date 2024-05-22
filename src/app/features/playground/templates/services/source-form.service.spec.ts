import { TestBed } from '@angular/core/testing';

import { SourceFormService } from './source-form.service';

describe('SourceFormService', () => {
  let service: SourceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourceFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
