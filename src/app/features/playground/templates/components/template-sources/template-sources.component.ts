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
import { SourceDialogService } from '@shared/dialogs/sources';
import { EmbedderCredential } from '@core/datatypes';

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
  readonly #sourceDialogService = inject(SourceDialogService);

  sourcesFormControls = this.#sourcesService.sourcesFormControls;

  get sourceNumberInfo() {
    const nSources = this.sourcesFormControls().length;
    const sourcesText = nSources === 1 ? 'source.' : 'sources.';
    return `${nSources} ${sourcesText}`;
  }

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
    this.#sourceDialogService.openUploadDialog().onClose.subscribe((files) => {
      if (!files?.length) {
        return;
      }

      // TODO: get embedder credential from user
      const embedderCredential: EmbedderCredential = {
        apiKey: localStorage.getItem('apiKey') || '',
        modelName: 'text-embedding-ada-002',
        brandId: 'id',
      };

      this.#sourcesService.createPDFSources(files, embedderCredential);
    });
  }
}
