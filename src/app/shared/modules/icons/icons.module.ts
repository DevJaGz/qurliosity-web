import { NgModule } from '@angular/core';
import { TABLER_ICONS } from '@shared/constants';
import { TablerIconsModule } from 'angular-tabler-icons';

@NgModule({
  declarations: [],
  imports: [TablerIconsModule.pick(TABLER_ICONS)],
  exports: [TablerIconsModule],
})
export class IconsModule {}
