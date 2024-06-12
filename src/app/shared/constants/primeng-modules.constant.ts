import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SkeletonModule } from 'primeng/skeleton';

export const PRIMENG_SHARED_MODULES = [
  ButtonModule,
  PanelModule,
  ProgressSpinnerModule,
  BlockUIModule,
  SpeedDialModule,
  DialogModule,
  DynamicDialogModule,
  ToastModule,
  TooltipModule,
  DropdownModule,
  InputTextModule,
  InputTextareaModule,
  SkeletonModule,
] as const;
