import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  inject,
  output,
} from '@angular/core';
import { cancelEvent } from '@shared/utils';

@Directive({
  selector: '[appDragzone]',
  standalone: true,
})
export class DragzoneDirective implements AfterViewInit, OnDestroy {
  readonly #dragzoneRef = inject(ElementRef<HTMLElement>);
  readonly #renderer = inject(Renderer2);
  dragZoneEvent = output<DragEvent>();

  /**
   * List of functions to unlisten the drag events.
   */
  readonly #unListenFns: (() => void)[] = [];

  ngAfterViewInit(): void {
    const unlistenDragOverFn = this.#renderer.listen(
      this.#dragzoneRef.nativeElement,
      'dragover',
      (event) => {
        cancelEvent(event);
        this.dragZoneEvent.emit(event);
      }
    );

    this.#unListenFns.push(unlistenDragOverFn);

    const unlistenDragEnterFn = this.#renderer.listen(
      this.#dragzoneRef.nativeElement,
      'dragenter',
      (event) => {
        cancelEvent(event);
        this.dragZoneEvent.emit(event);
      }
    );

    this.#unListenFns.push(unlistenDragEnterFn);

    const unlistenDragLeaveFn = this.#renderer.listen(
      this.#dragzoneRef.nativeElement,
      'dragleave',
      (event) => {
        cancelEvent(event);
        this.dragZoneEvent.emit(event);
      }
    );

    this.#unListenFns.push(unlistenDragLeaveFn);

    const unlistenDropFn = this.#renderer.listen(
      this.#dragzoneRef.nativeElement,
      'drop',
      (event) => {
        cancelEvent(event);
        this.dragZoneEvent.emit(event);
      }
    );

    this.#unListenFns.push(unlistenDropFn);
  }

  ngOnDestroy(): void {
    // Remove drag event listeners.
    for (const unlistenFn of this.#unListenFns) {
      unlistenFn();
    }
  }
}
