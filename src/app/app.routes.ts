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
    path: '**',
    redirectTo: '/playground',
  },
];
