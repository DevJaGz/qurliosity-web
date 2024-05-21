import { NgModule } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { TABLER_ICONS } from './constants';

@NgModule({
  imports: [TablerIconsModule.pick(TABLER_ICONS)],
  exports: [TablerIconsModule],
})
export class SharedModule {}
