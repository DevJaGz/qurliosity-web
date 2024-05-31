import { Injectable, inject } from '@angular/core';

import { UploadSourceConfig } from '@core/datatypes';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UploadSourceDialogComponent } from '../components';
import { DIALOG_CONFIG_DEFAULT } from '@shared/constants';

@Injectable({
  providedIn: 'root',
})
export class SourceDialogService {
  dialogService = inject(DialogService);

  openUploadDialog(
    data?: UploadSourceConfig
  ): DynamicDialogRef<UploadSourceDialogComponent> {
    const ref = this.dialogService.open(UploadSourceDialogComponent, {
      ...DIALOG_CONFIG_DEFAULT,
      header: 'Upload Source',
      data: data || {},
    });
    return ref;
  }
}
