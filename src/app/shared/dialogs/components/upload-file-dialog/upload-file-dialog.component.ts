import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PRIMENG_SHARED_MODULES } from '@shared/constants';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-upload-file-dialog',
  standalone: true,
  imports: [SharedModule],
  providers: [],
  templateUrl: './upload-file-dialog.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadFileDialogComponent {}
