import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UploadedFile } from '@shared/datatypes';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-uploaded-sources-table-row',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './uploaded-sources-table-row.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadedSourcesTableRowComponent {
  uploadedFile = input.required<UploadedFile>();
}
