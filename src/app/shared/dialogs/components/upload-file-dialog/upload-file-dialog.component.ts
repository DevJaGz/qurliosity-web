import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FileSelectEvent } from 'primeng/fileupload';

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
  onFileSelect(event: FileSelectEvent) {
    console.log(event);
  }
}
