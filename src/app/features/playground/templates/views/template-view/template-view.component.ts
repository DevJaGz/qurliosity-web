import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TemplateSourcesComponent } from '../../components';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {
  SelectButtonModule,
  SelectButtonOptionClickEvent,
} from 'primeng/selectbutton';
import { SharedModule } from '@shared/index';
import { ButtonList, ButtonListItem } from '@shared/datatypes';

@Component({
  selector: 'app-template-view',
  standalone: true,
  imports: [
    SharedModule,
    RouterOutlet,
    SelectButtonModule,
    TemplateSourcesComponent,
  ],
  templateUrl: './template-view.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateViewComponent {
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);

  templateButtons: ButtonList = [
    {
      name: 'Sources',
      navigateTo: 'sources',
      icon: 'brand-github',
    },
    {
      name: 'Prompts',
      navigateTo: 'prompts',
      icon: 'heart',
    },
    {
      name: 'Completions',
      navigateTo: 'completions',
      icon: 'camera',
    },
  ];

  onTemplateClick(data: SelectButtonOptionClickEvent) {
    const option = data.option as ButtonListItem;
    if (!option) return;
    this.#router.navigate([option.navigateTo], { relativeTo: this.#route });
  }
}
