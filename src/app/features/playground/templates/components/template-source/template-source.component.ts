import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
} from '@angular/core';
import { Source } from '@core/datatypes';

@Component({
  selector: 'app-template-source',
  standalone: true,
  imports: [],
  templateUrl: './template-source.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateSourceComponent {
  source = input.required<Source>();
}
