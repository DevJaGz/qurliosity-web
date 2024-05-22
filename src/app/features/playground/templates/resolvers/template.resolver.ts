import { ResolveFn, Router } from '@angular/router';
import { EMPTY, Observable, Subject, forkJoin, map, tap } from 'rxjs';
import { TemplateState } from '../datatypes';
import { inject } from '@angular/core';
import { TemplateService } from '../services';
import { SourcesRequestService, TemplatesRequestService } from '@core/services';
import { SourceType } from '@core/enums';

const goHomeInNextTick = (router: Router) => {
  setTimeout(() => {
    router.navigateByUrl('/');
  }, 0);
};

export const templateResolver: ResolveFn<Observable<boolean>> = (route) => {
  const router = inject(Router);
  const isDataLoaded = new Subject<boolean>();

  const templatesRequestService = inject(TemplatesRequestService);
  const sourcesRequestService = inject(SourcesRequestService);
  const templateService = inject(TemplateService);

  const templateId = route.params['templateId'];
  if (!templateId) {
    goHomeInNextTick(router);
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
          console.log('templateState', templateState);
          isDataLoaded.next(true);
        },
        error: () => {
          isDataLoaded.next(false);
          goHomeInNextTick(router);
        },
        complete: () => isDataLoaded.complete(),
      })
    )
    .subscribe();

  return isDataLoaded;
};
