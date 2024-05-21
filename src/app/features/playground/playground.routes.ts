import { Routes } from '@angular/router';
import { PlaygroundComponent } from './playground.component';

export const playgroundRoutes: Routes = [
  {
    path: '',
    component: PlaygroundComponent,
    children: [
      {
        path: 'templates',
        loadChildren: () =>
          import('./templates/templates.routes').then((f) => f.templatesRoutes),
      },
    ],
  },
];
