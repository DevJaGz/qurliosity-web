import { Injectable, computed, inject, signal } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { TemplateFormService } from './template-form.service';
import { SourcesRequestService } from '@core/services';
import {
  CreatePDFSource,
  EmbedderCredential,
  Source,
  Sources,
} from '@core/datatypes';
import { Observable, forkJoin } from 'rxjs';
import { SourceFormFactoryService } from './source-form-factory.service';

@Injectable()
export class SourcesService {
  readonly #templateFormService = inject(TemplateFormService);
  readonly #sourceFormFactoryService = inject(SourceFormFactoryService);
  readonly #sourcesRequestService = inject(SourcesRequestService);
  readonly templateForm = this.#templateFormService.form;
  readonly templateId = this.templateForm.get('_id')?.value;
  readonly sourcesFormArray = this.templateForm.get('sources') as FormArray;
  readonly #sourcesFormControls = signal<FormGroup[]>(
    this.sourcesFormArray.controls as FormGroup[]
  );
  readonly sourcesFormControls = this.#sourcesFormControls.asReadonly();

  createPDFSources(
    files: File[],
    embedderCredential: EmbedderCredential
  ): void {
    const sourcesRequests: Observable<Source>[] = [];
    for (const file of files) {
      const sourceRequest = this.createPDFSource({
        _templateId: this.templateId,
        file,
        embedderCredential,
      });
      sourcesRequests.push(sourceRequest);
    }
    forkJoin(sourcesRequests).subscribe((sources) =>
      this.#pushSourcesToForm(sources)
    );
  }

  createPDFSource(params: CreatePDFSource): Observable<Source> {
    return this.#sourcesRequestService.createPDFSource(params);
  }

  #pushSourcesToForm(sources: Sources): void {
    for (const source of sources) {
      this.#pushSourceToForm(source);
    }
  }

  #pushSourceToForm(source: Source): void {
    const sourceForm = this.#sourceFormFactoryService.createForm(source);
    this.sourcesFormArray.push(sourceForm);
    this.#sourcesFormControls.update((sourceForms) => [...sourceForms]);
  }
}
