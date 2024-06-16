import { ResolveFn, Router } from '@angular/router';
import { EMPTY, Observable, Subject, tap } from 'rxjs';
import { inject } from '@angular/core';
import { TemplateFormService } from '../services';
import { TemplatesRequestService } from '@core/services';

const navigateToErrorPageAfterNextTick = (router: Router) => {
  setTimeout(() => {
    router.navigateByUrl('/error');
  }, 0);
};

export const templateResolver: ResolveFn<Observable<boolean>> = (route) => {
  const router = inject(Router);
  const isDataLoaded = new Subject<boolean>();

  const templatesRequestService = inject(TemplatesRequestService);
  const templateFormService = inject(TemplateFormService);

  const templateId = route.params['templateId'];
  if (!templateId) {
    navigateToErrorPageAfterNextTick(router);
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
          navigateToErrorPageAfterNextTick(router);
        },
        complete: () => isDataLoaded.complete(),
      })
    )
    .subscribe();

  return isDataLoaded;
};
