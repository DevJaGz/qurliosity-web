import { Injectable, inject } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UploadFileDialogComponent } from '../components';

@Injectable({
  providedIn: 'root',
})
export class UploadFileDialogService {
  dialogService = inject(DialogService);

  openDialog(): DynamicDialogRef<UploadFileDialogComponent> {
    const ref = this.dialogService.open(UploadFileDialogComponent, {
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
