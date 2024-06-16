import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CompletionsService } from '../../services';
import { TemplateCompletionComponent } from '../template-completion/template-completion.component';
import { SharedModule } from '@shared/shared.module';
import { EmptyStateComponent } from '@shared/components';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-template-completions',
  standalone: true,
  imports: [SharedModule, TemplateCompletionComponent, EmptyStateComponent],
  templateUrl: './template-completions.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateCompletionsComponent {
  readonly #completionsService = inject(CompletionsService);
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly prompts = this.#completionsService.prompts;
  readonly hasPrompts = this.#completionsService.hasPrompts;

  navigateTo(route: string) {
    this.#router.navigate([route], { relativeTo: this.#route.parent });
  }
}
