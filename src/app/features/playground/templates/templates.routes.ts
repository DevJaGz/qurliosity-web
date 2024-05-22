import { Routes } from '@angular/router';
import { templateResolver } from './resolvers';
import {
  SourceFormService,
  TemplateFormService,
  TemplateService,
} from './services';
import { TemplateViewComponent } from './views';

const routes: Routes = [
  {
    path: ':templateId',
    component: TemplateViewComponent,
    resolve: {
      template: templateResolver,
    },
    providers: [TemplateService, TemplateFormService, SourceFormService],
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
