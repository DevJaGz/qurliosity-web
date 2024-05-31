import { Injectable, inject } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AiCredentialsDialogComponent } from '../components';
import { DIALOG_CONFIG_DEFAULT } from '@shared/constants';
import { AICredentials } from '@core/datatypes';

@Injectable({
  providedIn: 'root',
})
export class AiCredentialsDialogService {
  dialogService = inject(DialogService);

  openDialog(
    data: AICredentials
  ): DynamicDialogRef<AiCredentialsDialogComponent> {
    const ref = this.dialogService.open(AiCredentialsDialogComponent, {
      ...DIALOG_CONFIG_DEFAULT,
      header: 'AI Credentials',
      data,
    });
    return ref;
  }
}
