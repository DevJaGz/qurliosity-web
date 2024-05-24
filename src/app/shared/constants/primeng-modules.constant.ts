import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';

export const PRIMENG_SHARED_MODULES = [
  ButtonModule,
  PanelModule,
  ProgressSpinnerModule,
  BlockUIModule,
  SpeedDialModule,
  DialogModule,
  DynamicDialogModule,
  ToastModule,
] as const;
