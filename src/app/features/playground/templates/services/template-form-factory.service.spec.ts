import { TestBed } from '@angular/core/testing';

import { TemplateFormFactoryService } from './template-form-factory.service';

describe('TemplateFormFactoryService', () => {
  let service: TemplateFormFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateFormFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
