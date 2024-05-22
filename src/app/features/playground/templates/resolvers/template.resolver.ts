import { ResolveFn, Router } from '@angular/router';
import { EMPTY, Observable, take, tap } from 'rxjs';
import { TemplateState } from '../datatypes';
import { inject } from '@angular/core';
import { TemplateService } from '../services';

const returnAndNavigate = (router: Router) => {
  router.navigateByUrl('/');
  return EMPTY;
};

export const templateResolver: ResolveFn<Observable<TemplateState | null>> = (
  route
) => {
  const router = inject(Router);
  const templateService = inject(TemplateService);
  const templatedId = route.params['templateId'];

  if (!templatedId) {
    return returnAndNavigate(router);
  }

  return templateService.getTemplate(templatedId).pipe(
    tap({
      error: () => {
        setTimeout(() => {
          returnAndNavigate(router);
        }, 0);
      },
    })
  );
};
