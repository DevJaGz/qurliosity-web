import { Injectable, computed, inject, signal } from '@angular/core';
import { AICredentials, EmbedderCredential } from '@core/datatypes';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AiCredentialsService {
  readonly #STORAGE_KEY = 'AICredentials';
  readonly #localStorageService = inject(LocalStorageService);
  readonly #AICredentials = signal<AICredentials>({
    embedderCredential: null,
  });

  readonly AICredentials = this.#AICredentials.asReadonly();
  readonly hasAICredentials = computed(() => {
    return Boolean(this.#AICredentials().embedderCredential);
  });

  setEmbedderCredential(embedderCredential: EmbedderCredential) {
    this.#AICredentials.set({
      embedderCredential,
    });
    this.#upadteLocalStorage();
  }

  #upadteLocalStorage() {
    this.#localStorageService.setItem(this.#STORAGE_KEY, this.#AICredentials());
  }

  constructor() {
    const AICredentials = this.#localStorageService.getItem(
      this.#STORAGE_KEY
    ) as AICredentials;
    if (AICredentials) {
      this.#AICredentials.set(AICredentials);
    }
  }
}
