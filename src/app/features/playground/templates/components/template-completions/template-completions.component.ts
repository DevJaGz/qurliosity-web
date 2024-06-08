import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CompletionsService } from '../../services';

@Component({
  selector: 'app-template-completions',
  standalone: true,
  imports: [],
  templateUrl: './template-completions.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateCompletionsComponent implements OnInit {
  readonly #completionsService = inject(CompletionsService);

  ngOnInit(): void {
    this.#completionsService.getCompletion();
  }
}
