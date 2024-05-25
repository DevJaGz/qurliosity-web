import { Injectable, inject } from '@angular/core';
import { FileLoaderComponent } from '@shared/components';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})
export class UploadFileDialogService {
  dialogService = inject(DialogService);

  openDialog(): DynamicDialogRef<FileLoaderComponent> {
    const ref = this.dialogService.open(FileLoaderComponent, {
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
