import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TemplateService } from '../../services';

@Component({
  selector: 'app-template-sources',
  standalone: true,
  imports: [],
  templateUrl: './template-sources.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateSourcesComponent {
  readonly #templateService = inject(TemplateService);
  sourceForms = this.#templateService.sourceForms;
}
