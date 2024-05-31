import { Injectable, computed, inject, signal } from '@angular/core';
import { AICredentials, EmbedderCredential } from '@core/datatypes';
import { LocalStorageService } from './local-storage.service';
import { AiCredentialsDialogService } from '@shared/dialogs/ai-credentials';

@Injectable({
  providedIn: 'root',
})
export class AiCredentialsService {
  readonly #STORAGE_KEY = 'AICredentials';
  readonly #aiCredentialsDialogService = inject(AiCredentialsDialogService);
  readonly #localStorageService = inject(LocalStorageService);
  readonly #AICredentials = signal<AICredentials>({
    embedderCredential: null,
    LLMCredential: null,
  });

  readonly AICredentials = this.#AICredentials.asReadonly();
  readonly hasAICredentials = computed(() => {
    return Boolean(this.#AICredentials().embedderCredential);
  });

  openDialog() {
    this.#aiCredentialsDialogService.openDialog();
  }

  setEmbedderCredential(embedderCredential: EmbedderCredential) {
    this.#AICredentials.update((aiCredentials) => ({
      ...aiCredentials,
      embedderCredential,
    }));
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
