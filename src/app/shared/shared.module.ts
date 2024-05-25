import { NgModule } from '@angular/core';
import { PRIMENG_SHARED_MODULES } from './constants';
import { IconsModule } from './modules';
import { FormatFileSizePipe } from './pipes';

const modules = [...PRIMENG_SHARED_MODULES, IconsModule, FormatFileSizePipe];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule {}
