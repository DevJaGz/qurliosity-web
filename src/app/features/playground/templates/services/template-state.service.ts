import { Injectable, signal } from '@angular/core';
import { TemplateState } from '../datatypes';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TemplateStateService {
  #state = new BehaviorSubject<TemplateState | null>(null);

  get state$() {
    return this.#state.asObservable();
  }
}
