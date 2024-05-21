import { TestBed } from '@angular/core/testing';

import { LoaderIndicatorService } from './loader-indicator.service';

describe('LoaderIndicatorService', () => {
  let service: LoaderIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderIndicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
