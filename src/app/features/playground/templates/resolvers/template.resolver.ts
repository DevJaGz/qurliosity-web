import { ResolveFn, Router } from '@angular/router';
import { EMPTY, Observable, Subject, forkJoin, map, tap } from 'rxjs';
import { TemplateState } from '../datatypes';
import { inject } from '@angular/core';
import { TemplateFormService } from '../services';
import {
  SourcesRequestService,
  TemplatesRequestService,
} from '@shared/services';
import { SourceType } from '@core/enums';

const goHomeAfterNextTick = (router: Router) => {
  setTimeout(() => {
    router.navigateByUrl('/');
  }, 0);
};

export const templateResolver: ResolveFn<Observable<boolean>> = (route) => {
  const router = inject(Router);
  const isDataLoaded = new Subject<boolean>();

  const templatesRequestService = inject(TemplatesRequestService);
  const sourcesRequestService = inject(SourcesRequestService);
  const templateFormService = inject(TemplateFormService);

  const templateId = route.params['templateId'];
  if (!templateId) {
    goHomeAfterNextTick(router);
    return EMPTY;
  }

  forkJoin({
    template: templatesRequestService.getTemplate(templateId),
    sources: sourcesRequestService.listSources({
      _templateId: templateId,
    }),
  })
    .pipe(
      map(({ template }) => {
        return {
          ...template,
          sources: [
            {
              _id: '1',
              __v: 0,
              value: 'Source 1',
              type: SourceType.PDF,
              _templateId: '6644ffa6065e545f87808399',
              _storageRecordId: '2',
            },
          ],
        } as TemplateState;
      }),
      tap({
        next: (templateState) => {
          templateFormService.initializeForm(templateState);
          isDataLoaded.next(true);
        },
        error: () => {
          isDataLoaded.next(false);
          goHomeAfterNextTick(router);
        },
        complete: () => isDataLoaded.complete(),
      })
    )
    .subscribe();

  return isDataLoaded;
};
