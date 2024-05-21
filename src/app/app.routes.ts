import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'playground',
    loadChildren: () =>
      import('@features/playground').then((f) => f.playgroundRoutes),
  },
];
