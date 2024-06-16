import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/playground',
    pathMatch: 'full',
  },
  {
    path: 'playground',
    loadChildren: () =>
      import('@features/playground').then((f) => f.playgroundRoutes),
  },
  {
    path: 'error',
    loadComponent: () =>
      import('@shared/components').then((f) => f.ErrorPageComponent),
  },
  {
    path: '**',
    redirectTo: '/playground',
  },
];
