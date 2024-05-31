import { TestBed } from '@angular/core/testing';

import { AiCredentialsDialogService } from './ai-credentials-dialog.service';

describe('AiCredentialsDialogService', () => {
  let service: AiCredentialsDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiCredentialsDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
