import { TestBed } from '@angular/core/testing';

import { AiCredentialsService } from './ai-credentials.service';

describe('AiCredentialsService', () => {
  let service: AiCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiCredentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
