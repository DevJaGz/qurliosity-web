import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { UploadedFiles } from '@shared/datatypes';
import { SharedModule } from '@shared/index';
import { UploadedSourcesTableRowComponent } from '../uploaded-sources-table-row/uploaded-sources-table-row.component';

@Component({
  selector: 'app-uploaded-sources-table',
  standalone: true,
  imports: [SharedModule, UploadedSourcesTableRowComponent],
  templateUrl: './uploaded-sources-table.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadedSourcesTableComponent {
  uploadedFiles = input.required<UploadedFiles>();
  readonly numberOfUploadedFiles = computed(() => this.uploadedFiles().length);
  readonly totalSize = computed(() => {
    const uploadedFiles = this.uploadedFiles();
    return uploadedFiles.reduce(
      (acc, uploadedFile) => acc + uploadedFile.file.size,
      0
    );
  });
}
