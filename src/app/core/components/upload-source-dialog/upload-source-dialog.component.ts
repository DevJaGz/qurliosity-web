import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FileLoaderComponent } from '@shared/components';
import { UploadedFile, UploadedFiles } from '@shared/datatypes';
import { SharedModule } from '@shared/shared.module';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-upload-source-dialog',
  standalone: true,
  imports: [SharedModule, FileLoaderComponent],
  templateUrl: './upload-source-dialog.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadSourceDialogComponent {
  readonly #messageService = inject(MessageService);
  readonly uploadedFiles = signal<UploadedFiles>([]);
  numberOfUploadedFiles = computed(() => this.uploadedFiles().length);
  readonly maxFileSize = 1024 * 1024 * 10;
  readonly maxFiles = 10;

  onUploadedFiles(uploadedFiles: UploadedFiles): void {
    console.log(uploadedFiles);

    const duplicatedFiles = this.#getDuplicatedFiles(uploadedFiles);
    if (duplicatedFiles.length) {
      this.#notifyDuplicatedFiles(duplicatedFiles);
      return;
    }

    const { allowedFiles, isOverMaxFiles } =
      this.#getAllowedFiles(uploadedFiles);

    if (isOverMaxFiles) {
      this.#notififyOverMaxFiles();
    }

    this.uploadedFiles.update((currentUploadedFiles) => [
      ...currentUploadedFiles,
      ...allowedFiles,
    ]);
  }

  #getAllowedFiles(uploadedFiles: UploadedFiles): {
    allowedFiles: UploadedFiles;
    isOverMaxFiles: boolean;
  } {
    const currentNumberFiles = this.uploadedFiles().length;
    const uploadedNumberFiles = uploadedFiles.length;
    const isOverMaxFiles =
      uploadedNumberFiles + currentNumberFiles > this.maxFiles;
    const allowedFiles = uploadedFiles.slice(
      0,
      this.maxFiles - currentNumberFiles
    );
    return {
      allowedFiles,
      isOverMaxFiles,
    };
  }

  #notififyOverMaxFiles(): void {
    this.#messageService.add({
      severity: 'warn',
      summary: 'Over max files',
      detail: `You can only upload ${this.maxFiles} files`,
      life: 10000,
    });
  }

  #getDuplicatedFiles(uploadedFiles: UploadedFiles): UploadedFiles {
    const duplicatedFiles: UploadedFiles = [];
    for (const uploadedFile of uploadedFiles) {
      const duplicatedFile = this.#getDuplicatedFile(uploadedFile.file);
      if (duplicatedFile) {
        duplicatedFiles.push(duplicatedFile);
      }
    }
    return duplicatedFiles;
  }

  #getDuplicatedFile(file: File): UploadedFile | null {
    const currentUploadedFiles = this.uploadedFiles();
    return currentUploadedFiles.find((f) => f.file.name === file.name) || null;
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
