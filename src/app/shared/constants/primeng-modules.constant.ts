import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { FileUploadModule } from 'primeng/fileupload';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogModule } from 'primeng/dialog';

export const PRIMENG_SHARED_MODULES = [
  ButtonModule,
  PanelModule,
  ProgressSpinnerModule,
  BlockUIModule,
  FileUploadModule,
  SpeedDialModule,
  DialogModule,
] as const;
