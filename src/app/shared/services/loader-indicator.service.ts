import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderIndicatorService {
  #isLoading = signal(false);

  get isLoading() {
    return this.#isLoading.asReadonly();
  }

  setLoading(loading: boolean) {
    this.#isLoading.set(loading);
  }
}
