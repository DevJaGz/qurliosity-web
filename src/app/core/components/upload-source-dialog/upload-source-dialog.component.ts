import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { UploadSourceService } from '@core/services';
import {
  FileLoaderComponent,
  UploadedSourcesTableComponent,
} from '@shared/components';
import { UploadedFiles } from '@shared/datatypes';
import { SharedModule } from '@shared/shared.module';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-upload-source-dialog',
  standalone: true,
  imports: [SharedModule, FileLoaderComponent, UploadedSourcesTableComponent],
  templateUrl: './upload-source-dialog.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadSourceDialogComponent {
  readonly #messageService = inject(MessageService);
  readonly #uploadSourceService = inject(UploadSourceService);

  readonly displayedFiles = signal<UploadedFiles>([]);
  readonly maxFileSize = 1024 * 1024 * 10;
  readonly maxFiles = 10;

  onUploadedFiles(uploadedFiles: UploadedFiles): void {
    const duplicatedFiles = this.#uploadSourceService.getDuplicatedFiles(
      this.displayedFiles(),
      uploadedFiles
    );

    if (duplicatedFiles.length) {
      this.#notifyDuplicatedFiles(duplicatedFiles);
      return;
    }

    const filesToDisplay = this.#uploadSourceService.getFilesToDisplay(
      this.displayedFiles(),
      uploadedFiles,
      this.maxFiles
    );

    const isOverMaxFiles = this.#uploadSourceService.isOverMaxFiles(
      this.displayedFiles(),
      uploadedFiles,
      this.maxFiles
    );

    if (isOverMaxFiles) {
      this.#notififyOverMaxFiles();
    }

    this.displayedFiles.update((currentUploadedFiles) => [
      ...currentUploadedFiles,
      ...filesToDisplay,
    ]);
  }

  #notififyOverMaxFiles(): void {
    this.#messageService.add({
      severity: 'warn',
      summary: 'Over max files',
      detail: `You can only upload ${this.maxFiles} files`,
      life: 10000,
    });
  }

  #notifyDuplicatedFiles(duplicatedFiles: UploadedFiles): void {
    for (const duplicatedFile of duplicatedFiles) {
      this.#messageService.add({
        severity: 'warn',
        summary: 'Duplicated files',
        detail: `The following file was already uploaded: ${duplicatedFile.file.name}`,
        life: 10000,
      });
    }
  }
}
