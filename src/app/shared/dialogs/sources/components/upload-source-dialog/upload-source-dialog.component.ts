import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import {
  FileLoaderComponent,
  UploadedSourcesTableComponent,
} from '@shared/components';
import { UploadedFiles } from '@shared/datatypes';
import { SharedModule } from '@shared/shared.module';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UploadSourceService } from '../../services/upload-source.service';

@Component({
  selector: 'app-upload-source-dialog',
  standalone: true,
  imports: [SharedModule, FileLoaderComponent, UploadedSourcesTableComponent],
  templateUrl: './upload-source-dialog.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadSourceDialogComponent {
  readonly #dialogRef = inject(DynamicDialogRef<UploadSourceDialogComponent>);
  readonly #dialogConfig = inject(DynamicDialogConfig);
  readonly #messageService = inject(MessageService);
  readonly #uploadSourceService = inject(UploadSourceService);
  readonly displayedFiles = this.#uploadSourceService.displayedFiles;
  readonly maxFileSize =
    this.#dialogConfig.data.maxFileSize ?? 1024 * 1024 * 10;
  readonly maxFiles = this.#dialogConfig.data.maxFiles ?? 10;
  readonly isMaxFileLimitExceeded = computed(
    () => this.displayedFiles().length >= this.maxFiles
  );
  readonly remainingFilesNumber = computed(
    () => this.maxFiles - this.displayedFiles().length
  );

  onUploadedFiles(uploadedFiles: UploadedFiles): void {
    const duplicatedFiles =
      this.#uploadSourceService.getDuplicatedFiles(uploadedFiles);

    if (duplicatedFiles.length) {
      this.#notifyDuplicatedFiles(duplicatedFiles);
      return;
    }

    const filesToDisplay = this.#uploadSourceService.getFilesToDisplay(
      uploadedFiles,
      this.maxFiles
    );

    const hasExceedMaxFileLimit =
      this.#uploadSourceService.hasExceedMaxFileLimit(
        uploadedFiles,
        this.maxFiles
      );

    if (hasExceedMaxFileLimit) {
      this.#notififyMaxFileLimitExceeded();
    }

    this.#uploadSourceService.upadateDisplayedFiles(filesToDisplay);
  }

  upload(): void {
    const files = this.#uploadSourceService.displayedFiles();
    this.#dialogRef.close(files.map((f) => f.file));
    this.#uploadSourceService.reset();
  }

  removeAll(): void {
    this.#uploadSourceService.setDisplayedFiles([]);
  }

  #notififyMaxFileLimitExceeded(): void {
    this.#messageService.add({
      severity: 'warn',
      summary: 'Max file limit exceeded',
      detail: `You can only upload ${this.maxFiles} files`,
      life: 10000,
    });
  }

  #notifyDuplicatedFiles(duplicatedFiles: UploadedFiles): void {
    for (const duplicatedFile of duplicatedFiles) {
      this.#messageService.add({
        severity: 'warn',
        summary: 'Duplicated files',
        detail: `${duplicatedFile.file.name} was already uploaded`,
        life: 10000,
      });
    }
  }
}
