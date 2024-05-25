import { AsyncPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  output,
} from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { cancelEvent } from '@shared/utils';
import { FileLoaderService } from './services';
import { UploadedFiles } from '@shared/datatypes';

@Component({
  selector: 'app-file-loader',
  standalone: true,
  imports: [SharedModule, NgClass, AsyncPipe],
  providers: [FileLoaderService],
  templateUrl: './file-loader.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileLoaderComponent {
  disabled = input<boolean | undefined>(false);
  multiple = input<boolean | undefined>(false);
  accept = input<string | undefined>('*');
  isOverDragZone = new EventEmitter<boolean>();
  files = output<UploadedFiles>();

  attached(event: Event): void {
    cancelEvent(event);
    const files = (event.target as HTMLInputElement).files;
    console.log(files);
    if (files) {
      this.#processFiles(files);
    }
  }

  #processFiles(files: FileList): void {}

  #emitFiles(files: UploadedFiles): void {
    this.files.emit(files);
  }
}
