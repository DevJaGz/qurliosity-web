import { Routes } from '@angular/router';
import { templateResolver } from './resolvers';
import {
  SourceFormFactoryService,
  TemplateFormFactoryService,
  TemplateFormService,
} from './services';
import { TemplateViewComponent } from './views';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '6644ffa6065e545f87808399/sources',
  },
  {
    path: ':templateId',
    component: TemplateViewComponent,
    resolve: {
      template: templateResolver,
    },
    providers: [
      TemplateFormFactoryService,
      SourceFormFactoryService,
      TemplateFormService,
    ],
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
