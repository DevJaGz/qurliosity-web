import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { SourcesRequestService, TemplatesRequestService } from '@core/services';
import { EMPTY, Observable, map, switchMap, tap } from 'rxjs';
import { TemplateSourceData } from '../datatypes';

const returnAndNavigate = (router: Router) => {
  router.navigateByUrl('/');
  return EMPTY;
};

export const templateSourcesResolver: ResolveFn<
  Observable<TemplateSourceData>
> = (route) => {
  const router = inject(Router);
  const sourcesRequestService = inject(SourcesRequestService);
  const templatesRequestService = inject(TemplatesRequestService);

  const params = route.parent?.params;
  if (!params) {
    return returnAndNavigate(router);
  }

  const templatedId = params['templateId'];
  if (!templatedId) {
    return returnAndNavigate(router);
  }

  return templatesRequestService.getTemplate(templatedId).pipe(
    switchMap((template) => {
      return sourcesRequestService
        .listSources({
          _templateId: templatedId,
        })
        .pipe(map((sources) => ({ sources, template })));
    }),
    tap({
      error: () => {
        setTimeout(() => {
          returnAndNavigate(router);
        }, 0);
      },
    })
  );
};
