import { Injectable, inject } from '@angular/core';
import { UploadSourceDialogComponent } from '@core/components';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})
export class SourceDialogService {
  dialogService = inject(DialogService);

  openUploadDialog(): DynamicDialogRef<UploadSourceDialogComponent> {
    const ref = this.dialogService.open(UploadSourceDialogComponent, {
      modal: true,
      style: {
        width: '90vw',
        maxWidth: '600px',
      },
      draggable: true,
      header: 'Upload files',
    });
    return ref;
  }
}
