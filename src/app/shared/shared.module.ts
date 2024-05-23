import { NgModule, Type } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { PRIMENG_SHARED_MODULES, TABLER_ICONS } from './constants';
import { UploadFileDialogService } from './dialogs';
import { DialogService } from 'primeng/dynamicdialog';

const modules: any[] | Type<any> = [
  TablerIconsModule.pick(TABLER_ICONS),
  ...PRIMENG_SHARED_MODULES,
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
  providers: [UploadFileDialogService, DialogService],
})
export class SharedModule {}
