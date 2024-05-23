import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
export const PRIMENG_SHARED_MODULES = [
  ButtonModule,
  PanelModule,
  ProgressSpinnerModule,
  BlockUIModule,
] as const;
