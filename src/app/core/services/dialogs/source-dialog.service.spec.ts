import { TestBed } from '@angular/core/testing';

import { SourceDialogService } from './source-dialog.service';

describe('SourceDialogService', () => {
  let service: SourceDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourceDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
