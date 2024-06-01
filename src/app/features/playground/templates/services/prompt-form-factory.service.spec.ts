import { TestBed } from '@angular/core/testing';

import { PromptFormFactoryService } from './prompt-form-factory.service';

describe('PromptFormFactoryService', () => {
  let service: PromptFormFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromptFormFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
