import { Routes } from '@angular/router';
import { templateSourcesResolver } from './resolvers';

const routes: Routes = [
  {
    path: ':templateId',
    loadComponent: () => import('./views').then((f) => f.TemplateViewComponent),
    children: [
      {
        path: '',
        redirectTo: 'sources',
        pathMatch: 'full',
      },
      {
        path: 'sources',
        loadComponent: () =>
          import('./components').then((f) => f.TemplateSourcesComponent),
        resolve: {
          sourcesData: templateSourcesResolver,
        },
      },
      {
        path: 'prompts',
        loadComponent: () =>
          import('./components').then((f) => f.TemplatePromptsComponent),
      },
      {
        path: 'completions',
        loadComponent: () =>
          import('./components').then((f) => f.TemplateCompletionsComponent),
      },
    ],
  },
];

export { routes as templatesRoutes };
