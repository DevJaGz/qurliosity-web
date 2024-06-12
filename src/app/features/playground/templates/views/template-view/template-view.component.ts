import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {
  SelectButtonModule,
  SelectButtonOptionClickEvent,
} from 'primeng/selectbutton';
import { SharedModule } from '@shared/index';
import { ButtonList, ButtonListItem } from '@shared/datatypes';
import { FormsModule } from '@angular/forms';
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import {
  CompletionsService,
  PromptsService,
  SourcesService,
  TemplateService,
} from '../../services';
import { TemplateWithResources } from '@core/datatypes';
import { AiCredentialButtonComponent } from '@shared/components';
import { CompletionsStateService } from '../../states';

@Component({
  selector: 'app-template-view',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    TitleCasePipe,
    LowerCasePipe,
    SelectButtonModule,
    SharedModule,
    AiCredentialButtonComponent,
  ],
  providers: [
    SourcesService,
    TemplateService,
    PromptsService,
    CompletionsService,
    CompletionsStateService,
  ],
  templateUrl: './template-view.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateViewComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly #templateService = inject(TemplateService);

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

  currentNavigation = signal('sources');
  templateData!: WritableSignal<TemplateWithResources>;

  onOptionClick(data: SelectButtonOptionClickEvent) {
    const option = data.option as ButtonListItem;
    if (!option) return;
    this.#router.navigate([option.navigateTo], { relativeTo: this.#route });
  }

  ngOnInit(): void {
    this.#initializeNavigation();
    this.#initializeTemplateData();
  }

  #initializeTemplateData() {
    const template = this.#templateService.templateForm
      .value as TemplateWithResources;
    this.templateData = signal<TemplateWithResources>(template);
  }

  #initializeNavigation() {
    const currentRoute = this.#router.url.split('/').pop();
    if (!currentRoute) return;
    this.currentNavigation.set(currentRoute);
  }
}
