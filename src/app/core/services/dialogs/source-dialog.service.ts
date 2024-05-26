import { Injectable, inject } from '@angular/core';
import { UploadSourceDialogComponent } from '@core/components';
import { UploadSourceConfig } from '@core/datatypes';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})
export class SourceDialogService {
  dialogService = inject(DialogService);

  openUploadDialog(
    data?: UploadSourceConfig
  ): DynamicDialogRef<UploadSourceDialogComponent> {
    const ref = this.dialogService.open(UploadSourceDialogComponent, {
      modal: true,
      style: {
        width: '90vw',
        maxWidth: '600px',
      },
      data: data || {},
      draggable: true,
      header: 'Upload Source',
    });
    return ref;
  }
}
