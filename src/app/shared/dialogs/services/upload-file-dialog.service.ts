import { Injectable, inject } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UploadFileDialogComponent } from '../components';
import { max } from 'rxjs';

@Injectable()
export class UploadFileDialogService {
  dialogService = inject(DialogService);
  ref: DynamicDialogRef | undefined;

  openDialog() {
    this.ref = this.dialogService.open(UploadFileDialogComponent, {
      modal: true,
      style: {
        width: '50vw',
        maxWidth: '600px',
      },
      draggable: true,
    });
  }
}
