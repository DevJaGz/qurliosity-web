import { Routes } from '@angular/router';
import { templateResolver, templateSourcesResolver } from './resolvers';
import { TemplateService } from './services';

const routes: Routes = [
  {
    path: ':templateId',
    loadComponent: () => import('./views').then((f) => f.TemplateViewComponent),
    resolve: {
      template: templateResolver,
    },
    providers: [TemplateService],
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
