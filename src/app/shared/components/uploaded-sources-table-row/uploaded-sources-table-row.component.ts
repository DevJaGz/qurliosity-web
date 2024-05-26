import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { UploadSourceService } from '@core/services';
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
  readonly #uploadSourceService = inject(UploadSourceService);

  readonly index = input.required<number>();
  readonly uploadedFile = input.required<UploadedFile>();

  remove(): void {
    this.#uploadSourceService.removeFromIndex(this.index());
  }
}
