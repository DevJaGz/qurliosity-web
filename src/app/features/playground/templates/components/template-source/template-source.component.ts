import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { Source } from '@core/datatypes';
import { SourceType } from '@core/enums';
import { SharedModule } from '@shared/index';

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

  showDeleteDialog = signal(false);

  deleteSource() {
    this.showDeleteDialog.set(false);
    console.log('delete source');
    // TODO: delete source
  }
}
