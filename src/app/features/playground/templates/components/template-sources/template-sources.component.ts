import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { SourcesService } from '../../services';
import { TemplateSourceComponent } from '../template-source/template-source.component';
import { SharedModule } from '@shared/index';
import { MenuItem } from 'primeng/api';
import { SourceDialogService } from '@shared/dialogs/sources';
import { AiCredentialsService } from '@shared/services';
import { EmptyStateComponent } from '@shared/components';

@Component({
  selector: 'app-template-sources',
  standalone: true,
  imports: [SharedModule, TemplateSourceComponent, EmptyStateComponent],
  templateUrl: './template-sources.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateSourcesComponent {
  readonly #sourcesService = inject(SourcesService);
  readonly #sourceDialogService = inject(SourceDialogService);
  readonly #aiCredentialsService = inject(AiCredentialsService);
  readonly disableAddSourceBtn = signal(false);
  readonly #MAX_FILES = 5;
  sourcesFormControls = this.#sourcesService.sourcesFormControls;
  hasSources = computed(() => this.sourcesFormControls().length > 0);

  get sourceNumber() {
    return this.sourcesFormControls().length;
  }

  get sourceNumberInfo() {
    const nSources = this.sourceNumber;
    const sourcesText = nSources === 1 ? 'source.' : 'sources.';
    return `${nSources} ${sourcesText}`;
  }

  buttons: MenuItem[] = [
    {
      tooltipOptions: {
        tooltipLabel: 'Add PDF',
        tooltipPosition: 'left',
      },
      icon: 'file-type-pdf',
      styleClass: 'text-cyan-400',
      id: 'pdf',
    },
    {
      tooltipOptions: {
        tooltipLabel: 'Add Link',
        tooltipPosition: 'left',
      },
      icon: 'unlink',
      styleClass: 'text-fuchsia-400',
      id: 'link',
    },
  ];

  showButtons = signal(false);

  constructor() {
    effect(() => {
      const hasEmbedderCredential =
        this.#aiCredentialsService.hasEmbedderCredential();
      untracked(() => {
        this.showButtons.set(hasEmbedderCredential);
        this.disableAddSourceBtn.set(!hasEmbedderCredential);
      });
    });
  }

  addSource(id: 'link' | 'pdf') {
    if (id === 'pdf') {
      this.#addPDFSource();
    }
  }

  #addPDFSource() {
    const maxFiles =
      this.sourceNumber >= this.#MAX_FILES
        ? this.#MAX_FILES
        : this.#MAX_FILES - this.sourceNumber;
    this.#sourceDialogService
      .openUploadDialog({
        maxFiles,
      })
      .onClose.subscribe((files) => {
        const AICredentials = this.#aiCredentialsService.AICredentials();
        const embedderCredential = AICredentials.embedderCredential;

        if (!files?.length || !embedderCredential) {
          return;
        }

        this.#sourcesService.createPDFSources(files, embedderCredential);
      });
  }
}
