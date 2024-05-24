import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  signal,
} from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-upload-file-dialog',
  standalone: true,
  imports: [SharedModule, JsonPipe],
  providers: [],
  templateUrl: './upload-file-dialog.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadFileDialogComponent {
  uploadedFiles: WritableSignal<File[]> = signal([]);

  onFileSelect(event: FileSelectEvent) {
    this.uploadedFiles.set(event.currentFiles);
    console.log(this.uploadedFiles());
  }

  removeUploadedFile(pFileUpload: FileUpload, index: number) {
    console.log('removeUploadedFile', index, pFileUpload);
    pFileUpload.removeUploadedFile(index);
    pFileUpload.cd.markForCheck();
  }
}
