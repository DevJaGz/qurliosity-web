import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { UploadSourceService } from '@core/services';
import {
  FileLoaderComponent,
  UploadedSourcesTableComponent,
} from '@shared/components';
import { UploadedFiles } from '@shared/datatypes';
import { SharedModule } from '@shared/shared.module';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

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
  readonly #dialogConfig = inject(DynamicDialogConfig);
  readonly #uploadSourceService = inject(UploadSourceService);

  readonly displayedFiles = this.#uploadSourceService.displayedFiles;
  readonly maxFileSize =
    this.#dialogConfig.data.maxFileSize ?? 1024 * 1024 * 10;
  readonly maxFiles = this.#dialogConfig.data.maxFiles ?? 10;
  readonly isOverMaxFiles = computed(
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

    const willOverMaxFiles = this.#uploadSourceService.isOverMaxFiles(
      uploadedFiles,
      this.maxFiles
    );

    if (willOverMaxFiles) {
      this.#notififyOverMaxFiles();
    }

    this.#uploadSourceService.upadateDisplayedFiles(filesToDisplay);
  }

  removeAll(): void {
    this.#uploadSourceService.setDisplayedFiles([]);
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
