import { ResolveFn, Router } from '@angular/router';
import { EMPTY, Observable, Subject, forkJoin, map, tap } from 'rxjs';
import { inject } from '@angular/core';
import { TemplateFormService } from '../services';
import { TemplatesRequestService } from '@shared/services';

const goHomeAfterNextTick = (router: Router) => {
  setTimeout(() => {
    router.navigateByUrl('/');
  }, 0);
};

export const templateResolver: ResolveFn<Observable<boolean>> = (route) => {
  const router = inject(Router);
  const isDataLoaded = new Subject<boolean>();

  const templatesRequestService = inject(TemplatesRequestService);
  const templateFormService = inject(TemplateFormService);

  const templateId = route.params['templateId'];
  if (!templateId) {
    goHomeAfterNextTick(router);
    return EMPTY;
  }

  templatesRequestService
    .getTemplateWithResources(templateId)
    .pipe(
      tap({
        next: (template) => {
          templateFormService.initializeForm(template);
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
