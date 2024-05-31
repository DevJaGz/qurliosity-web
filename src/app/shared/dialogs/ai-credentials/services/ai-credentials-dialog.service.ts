import { Injectable, inject } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AiCredentialsDialogComponent } from '../components';
import { DIALOG_CONFIG_DEFAULT } from '@shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AiCredentialsDialogService {
  dialogService = inject(DialogService);

  openDialog(): DynamicDialogRef<AiCredentialsDialogComponent> {
    const ref = this.dialogService.open(AiCredentialsDialogComponent, {
      ...DIALOG_CONFIG_DEFAULT,
      header: 'AI Credentials',
    });
    return ref;
  }
}
