import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MessageService } from 'primeng/api';
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
  readonly messageService = inject(MessageService);
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
