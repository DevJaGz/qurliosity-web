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
import { DragzoneDirective } from '@shared/directives/dragzone.directive';

@Component({
  selector: 'app-file-loader',
  standalone: true,
  imports: [SharedModule, NgClass, AsyncPipe, DragzoneDirective],
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
    if (files) {
      this.#processFiles(files);
    }
  }

  onDragZoneEvent(event: DragEvent): void {
    if (['dragenter', 'dragover'].includes(event.type)) {
      this.isOverDragZone.emit(true);
    }

    if (['dragleave', 'drop'].includes(event.type)) {
      this.isOverDragZone.emit(false);
    }

    if (event.type === 'drop') {
      const files = event.dataTransfer?.files;
      if (files) {
        this.#processFiles(files);
      }
    }
  }

  #processFiles(files: FileList): void {
    console.log(files);
  }

  #emitFiles(files: UploadedFiles): void {
    this.files.emit(files);
  }
}
