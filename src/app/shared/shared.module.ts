import { NgModule, Type } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { PRIMENG_SHARED_MODULES, TABLER_ICONS } from './constants';

const modules: any[] | Type<any> = [
  TablerIconsModule.pick(TABLER_ICONS),
  ...PRIMENG_SHARED_MODULES,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule {}
