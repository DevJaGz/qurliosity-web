import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { FileLoaderComponent } from '@shared/components';
import { UploadedFiles } from '@shared/datatypes';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-upload-source-dialog',
  standalone: true,
  imports: [SharedModule, FileLoaderComponent],
  templateUrl: './upload-source-dialog.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadSourceDialogComponent {
  readonly uploadedFiles = signal<UploadedFiles>([]);
  #numberOfUploadedFiles = computed(() => this.uploadedFiles().length);
  readonly maxFileSize = 1024 * 1024 * 10;
  readonly maxFiles = 10;

  onUploadedFiles(uploadedFiles: UploadedFiles): void {
    console.log(uploadedFiles);
    this.uploadedFiles.update((files) => [...files, ...uploadedFiles]);
  }
}
