import { TestBed } from '@angular/core/testing';

import { UploadFileDialogService } from './upload-file-dialog.service';

describe('UploadFileDialogService', () => {
  let service: UploadFileDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadFileDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
