import { TestBed } from '@angular/core/testing';

import { MimeTypeService } from './mime-type.service';

describe('MimeTypeService', () => {
  let service: MimeTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MimeTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
