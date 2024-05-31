import { NgModule } from '@angular/core';
import { PRIMENG_SHARED_MODULES } from './constants';
import { IconsModule } from './modules';
import { FormatFileSizePipe } from './pipes';
import { FormsModule } from '@angular/forms';

const modules = [
  ...PRIMENG_SHARED_MODULES,
  IconsModule,
  FormatFileSizePipe,
  FormsModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule {}
