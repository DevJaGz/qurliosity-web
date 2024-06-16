import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  WritableSignal,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
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
import { AiCredentialsService } from '@shared/services';
import { pipe } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-template-view',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
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
  readonly #AiCredentialsService = inject(AiCredentialsService);
  readonly #destroyRef = inject(DestroyRef);

  templateButtons: WritableSignal<ButtonList> = signal([
    {
      name: 'Sources',
      navigateTo: 'sources',
      icon: 'align-center',
      disabled: false,
    },
    {
      name: 'Prompts',
      navigateTo: 'prompts',
      icon: 'message',
      disabled: false,
    },
    {
      name: 'Completions',
      navigateTo: 'completions',
      icon: 'brand-hipchat',
      disabled: true,
    },
  ]);

  currentNavigation = signal('sources');
  templateData!: WritableSignal<TemplateWithResources>;

  constructor() {
    effect(() => {
      const hasAICredentials = this.#AiCredentialsService.hasAICredentials();
      untracked(() => {
        this.#updateButtonsDisabledState(hasAICredentials);
      });
    });
  }

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
    this.#observeNavigation();
  }

  #observeNavigation() {
    this.#router.events
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const navigation = event.url.split('/').pop();
          const currentNavigation = this.currentNavigation();
          if (currentNavigation === navigation) return;
          if (!navigation) return;
          this.currentNavigation.set(navigation);
        }
      });
  }

  #updateButtonsDisabledState(hasAICredentials: boolean): void {
    this.templateButtons.update((buttons) => {
      const completionIndex = buttons.findIndex(
        (button) => button.navigateTo === 'completions'
      );
      if (completionIndex === -1) {
        return buttons;
      }
      return [
        ...buttons.slice(0, completionIndex),
        {
          ...buttons[completionIndex],
          disabled: !hasAICredentials,
        },
        ...buttons.slice(completionIndex + 1),
      ];
    });
  }
}
