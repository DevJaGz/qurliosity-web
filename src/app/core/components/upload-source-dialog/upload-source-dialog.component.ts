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
  #numberOfUploadedFiles = computed(() => this.uploadedFiles().length);
  readonly maxFileSize = 1024 * 1024 * 10;
  readonly maxFiles = 10;

  onUploadedFiles(uploadedFiles: UploadedFiles): void {
    console.log(uploadedFiles);

    const duplicatedFiles = this.#getDuplicatedFiles(uploadedFiles);
    if (duplicatedFiles.length > 0) {
      this.#notifyDuplicatedFiles(duplicatedFiles);
      return;
    }

    this.uploadedFiles.update((currentUploadedFiles) => [
      ...currentUploadedFiles,
      ...uploadedFiles,
    ]);
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
