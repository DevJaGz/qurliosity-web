import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { templateSourcesResolver } from './template-sources.resolver';

describe('templateSourcesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => templateSourcesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
