import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SourcesService, TemplateService } from '../../services';
import { TemplateSourceComponent } from '../template-source/template-source.component';

@Component({
  selector: 'app-template-sources',
  standalone: true,
  imports: [TemplateSourceComponent],
  templateUrl: './template-sources.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateSourcesComponent {
  readonly #sourcesService = inject(SourcesService);
  sourcesFormControls = this.#sourcesService.sourcesFormControls;
}
