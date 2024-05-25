import { AsyncPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { SharedModule } from '@shared/shared.module';
import { cancelEvent } from '@shared/utils';
import {
  FileLoaderConfig,
  MaxFileSize,
  UploadedFiles,
} from '@shared/datatypes';
import { DragzoneDirective } from '@shared/directives/dragzone.directive';
import { Subject } from 'rxjs';
import { FileLoaderService } from '@core/services';

@Component({
  selector: 'app-file-loader',
  standalone: true,
  imports: [SharedModule, NgClass, AsyncPipe, DragzoneDirective],
  templateUrl: './file-loader.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileLoaderComponent {
  readonly #isOverDragZone = new Subject<boolean>();
  readonly #fileLoaderService = inject(FileLoaderService);

  disabled = input<boolean | undefined>(false);
  multiple = input<boolean | undefined>(true);
  accept = input<string | undefined>('*');
  maxSize = input<number | MaxFileSize | undefined>(-1);
  uploadedFiles = output<UploadedFiles>();
  isOverDragZone$ = this.#isOverDragZone.asObservable();
  isOverDragZone = outputFromObservable<boolean>(this.isOverDragZone$);

  attached(event: Event): void {
    cancelEvent(event);
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.#processFiles(files);
    }
  }

  onDragZoneEvent(event: DragEvent): void {
    if (['dragenter', 'dragover'].includes(event.type)) {
      this.#isOverDragZone.next(true);
    }

    if (['dragleave', 'drop'].includes(event.type)) {
      this.#isOverDragZone.next(false);
    }

    if (event.type === 'dragover') {
      event.dataTransfer ? (event.dataTransfer.dropEffect = 'copy') : null;
    }

    if (event.type === 'drop') {
      const files = event.dataTransfer?.files;
      if (files) {
        this.#processFiles(files);
      }
    }
  }

  #processFiles(files: FileList): void {
    const config: FileLoaderConfig = {
      maxSize: this.maxSize(),
      accept: this.accept(),
      multiple: this.multiple(),
    };
    const uploadedFiles = this.#fileLoaderService.processFiles(files, config);
    this.#emitFiles(uploadedFiles);
  }

  #emitFiles(uploadedFiles: UploadedFiles): void {
    this.uploadedFiles.emit(uploadedFiles);
  }
}
