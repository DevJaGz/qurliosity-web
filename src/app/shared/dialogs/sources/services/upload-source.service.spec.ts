import { TestBed } from '@angular/core/testing';

import { UploadSourceService } from './upload-source.service';

describe('UploadSourceService', () => {
  let service: UploadSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
