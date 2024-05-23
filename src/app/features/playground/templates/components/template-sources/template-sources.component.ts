import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { SourcesService, TemplateService } from '../../services';
import { TemplateSourceComponent } from '../template-source/template-source.component';
import { SharedModule } from '@shared/shared.module';
import { MenuItem } from 'primeng/api';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-template-sources',
  standalone: true,
  imports: [SharedModule, TemplateSourceComponent, JsonPipe],
  templateUrl: './template-sources.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateSourcesComponent {
  readonly #sourcesService = inject(SourcesService);
  sourcesFormControls = this.#sourcesService.sourcesFormControls;
  buttons: MenuItem[] = [
    {
      tooltipOptions: {
        tooltipLabel: 'PDF',
        tooltipPosition: 'left',
      },
      icon: 'file-type-pdf',
      command: () => {
        console.log('PDF File');
      },
      id: 'pdf',
    },
    {
      tooltipOptions: {
        tooltipLabel: 'Link',
        tooltipPosition: 'left',
      },
      icon: 'unlink',
      id: 'link',
    },
  ];

  isShownButtons = signal(true);

  addSource(id: 'link' | 'pdf') {
    console.log('add source', id);
  }
}
