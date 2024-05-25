import { AsyncPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { SharedModule } from '@shared/shared.module';
import { cancelEvent } from '@shared/utils';
import { FileLoaderService } from './services';
import { UploadedFiles } from '@shared/datatypes';
import { DragzoneDirective } from '@shared/directives/dragzone.directive';
import { Subject } from 'rxjs';

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
  files = output<UploadedFiles>();
  readonly #isOverDragZone = new Subject<boolean>();
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
    console.log(files);
  }

  #emitFiles(files: UploadedFiles): void {
    this.files.emit(files);
  }
}
