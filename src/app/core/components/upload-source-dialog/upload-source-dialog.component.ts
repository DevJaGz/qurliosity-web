import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  onUploadedFiles(uploadedFiles: UploadedFiles): void {
    console.log(uploadedFiles);
  }
}
