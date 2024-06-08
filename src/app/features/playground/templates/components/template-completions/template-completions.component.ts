import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CompletionsService } from '../../services';
import { TemplateCompletionComponent } from '../template-completion/template-completion.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-template-completions',
  standalone: true,
  imports: [TemplateCompletionComponent, JsonPipe],
  templateUrl: './template-completions.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateCompletionsComponent implements OnInit {
  readonly #completionsService = inject(CompletionsService);
  readonly prompts = this.#completionsService.prompts;

  ngOnInit(): void {
    this.#completionsService.getCompletion();
  }
}
