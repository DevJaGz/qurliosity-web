import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Source } from '@core/datatypes';
import { SourceType } from '@core/enums';
import { SharedModule } from '@shared/index';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-template-source',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './template-source.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateSourceComponent {
  source = input.required<Source>();
  type = SourceType;
  sourceType = computed(() => this.source().type);
  sourceName = computed(() => this.source().value);
}
