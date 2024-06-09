import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Prompt } from '@core/datatypes';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-template-completion',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './template-completion.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateCompletionComponent {
  prompt = input.required<Prompt>();
}
