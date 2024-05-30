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
import { SourceType } from '@core/enums';
import { AppErrorModel } from '@core/models';
import { byFormId } from '@shared/utils';

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
    forkJoin(sourcesRequests).subscribe({
      next: (sources) => this.#pushSourcesToForm(sources),
    });
  }

  createPDFSource(params: CreatePDFSource): Observable<Source> {
    return this.#sourcesRequestService.createPDFSource(params);
  }

  deleteSource(source: Source): void {
    if (source.type === SourceType.PDF) {
      this.#sourcesRequestService.deletePDFSource(source).subscribe({
        next: () => this.#removeSourceFromForm(source),
      });
    }
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

  #removeSourceFromForm(source: Source): void {
    const index = this.#findSourceIndex(source);
    if (!index) {
      throw new Error('Source cannot be deleted from the view');
    }
    this.sourcesFormArray.removeAt(index);
    this.#sourcesFormControls.update((sourceForms) =>
      sourceForms.filter(byFormId(source, 'notEq'))
    );
  }

  #findSourceIndex(source: Source): number | null {
    const index = this.#sourcesFormControls().findIndex(byFormId(source));
    if (index === -1) {
      return null;
    }
    return index;
  }
}
