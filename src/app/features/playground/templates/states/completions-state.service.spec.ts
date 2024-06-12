import { TestBed } from '@angular/core/testing';

import { CompletionsStateService } from './completions-state.service';

describe('CompletionsStateService', () => {
  let service: CompletionsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompletionsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
