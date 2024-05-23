import { TestBed } from '@angular/core/testing';

import { SourceFormFactoryService } from './source-form-factory.service';

describe('SourceFormFactoryService', () => {
  let service: SourceFormFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourceFormFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
