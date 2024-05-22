import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { SourceFormService } from './source-form.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemplateState } from '../datatypes';
import { Source, Sources } from '@core/datatypes';

@Injectable()
export class TemplateFormService {
  readonly #sourceFormService = inject(SourceFormService);
  readonly #formBuilder = inject(FormBuilder);

  #form: WritableSignal<FormGroup | undefined> = signal<FormGroup | undefined>(
    undefined
  );
  form: Signal<FormGroup | undefined> = this.#form.asReadonly();

  sourcesFormArray = computed(
    () => this.#form()?.get('sources') as FormArray | undefined
  );

  sourceForms = computed(() => this.sourcesFormArray()?.controls || []);

  initializeForm(template: TemplateState): void {
    const form = this.#createForm(template);
    this.#form.set(form);
  }

  createSourceForm(source: Source): FormGroup {
    return this.#sourceFormService.createForm(source);
  }

  #createForm(template: TemplateState): FormGroup {
    return this.#formBuilder.group({
      _id: [template._id, [Validators.required]],
      isDemo: [template.isDemo, [Validators.required]],
      isActive: [template.isActive, [Validators.required]],
      name: [template.name, [Validators.required]],
      description: [template.description],
      sources: this.#createSourcesFormArray(template.sources),
    });
  }

  #createSourcesFormArray(sources: Sources): FormArray {
    const formGroups: FormGroup[] = [];
    for (const source of sources) {
      const formGroup = this.#sourceFormService.createForm(source);
      formGroups.push(formGroup);
    }
    return this.#formBuilder.array(formGroups);
  }
}
