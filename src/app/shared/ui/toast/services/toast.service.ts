import { Overlay } from '@angular/cdk/overlay';
import { Injectable, Injector, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly #overlay = inject(Overlay);
  readonly #parentInjector = inject(Injector);

  open() {}
}
