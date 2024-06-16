import { Injectable, inject } from '@angular/core';
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
import {
  computedFormControls,
  findIndexControl,
  isNullish,
  toSignalFormArray,
} from '@shared/utils';

@Injectable()
export class SourcesService {
  readonly #sourceFormFactoryService = inject(SourceFormFactoryService);
  readonly #sourcesRequestService = inject(SourcesRequestService);
  readonly #templateFormService = inject(TemplateFormService);
  readonly templateId = this.#templateFormService.templateId;
  readonly sourcesFormArray = toSignalFormArray(
    this.#templateFormService.sourceFormArray
  );
  readonly sourcesFormControls = computedFormControls(this.sourcesFormArray);

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
      next: (sources) => this.#pushSources(sources),
    });
  }

  createPDFSource(params: CreatePDFSource): Observable<Source> {
    return this.#sourcesRequestService.createPDFSource(params);
  }

  deleteSource(source: Source): void {
    if (source.type === SourceType.PDF) {
      this.#sourcesRequestService.deletePDFSource(source).subscribe({
        next: () => this.#removeSource(source),
      });
    }
  }

  #pushSources(sources: Sources): void {
    for (const source of sources) {
      this.#pushSource(source);
    }
  }

  #pushSource(source: Source): void {
    const sourceForm = this.#sourceFormFactoryService.createForm(source);
    this.sourcesFormArray().push(sourceForm);
  }

  #removeSource(source: Source): void {
    const index = findIndexControl(this.sourcesFormControls(), source);
    if (isNullish(index)) {
      throw new Error('Source cannot be deleted from the view');
    }
    this.sourcesFormArray().removeAt(index);
  }
}
