import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { SourcesService } from '../../services';
import { TemplateSourceComponent } from '../template-source/template-source.component';
import { SharedModule } from '@shared/index';
import { MenuItem } from 'primeng/api';
import { JsonPipe } from '@angular/common';
import { UploadFileDialogService } from '@core/services';

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
  readonly #uploadFileDialogService = inject(UploadFileDialogService);
  sourcesFormControls = this.#sourcesService.sourcesFormControls;
  buttons: MenuItem[] = [
    {
      tooltipOptions: {
        tooltipLabel: 'PDF',
        tooltipPosition: 'left',
      },
      icon: 'file-type-pdf',
      styleClass: 'text-cyan-400',
      id: 'pdf',
    },
    {
      tooltipOptions: {
        tooltipLabel: 'Link',
        tooltipPosition: 'left',
      },
      icon: 'unlink',
      styleClass: 'text-fuchsia-400',
      id: 'link',
    },
  ];

  isShownButtons = signal(true);

  addSource(id: 'link' | 'pdf') {
    if (id === 'pdf') {
      this.#addPDFSource();
    }
  }

  #addPDFSource() {
    this.#uploadFileDialogService.openDialog();
  }
}
