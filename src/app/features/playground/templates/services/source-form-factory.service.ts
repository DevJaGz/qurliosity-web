import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Source } from '@core/datatypes';

@Injectable()
export class SourceFormFactoryService {
  readonly #formBuilder = inject(FormBuilder);

  createForm(source: Source): FormGroup {
    return this.#formBuilder.group({
      _id: [source._id, [Validators.required]],
      _templateId: [source._templateId, [Validators.required]],
      _storageRecordId: [source._storageRecordId],
      type: [source.type, [Validators.required]],
      value: [source.value, [Validators.required]],
    });
  }
}
