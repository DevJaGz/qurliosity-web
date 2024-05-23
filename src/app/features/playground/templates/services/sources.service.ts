import { Injectable, inject } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { TemplateFormService } from './template-form.service';

@Injectable()
export class SourcesService {
  readonly #templateFormService = inject(TemplateFormService);
  templateForm = this.#templateFormService.form;
  sourcesFormArray = this.templateForm.get('sources') as FormArray;
  sourcesFormControls = this.sourcesFormArray.controls;
}
