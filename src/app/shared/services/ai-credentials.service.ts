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
    const credentials = this.#AICredentials();
    return Boolean(credentials.embedderCredential && credentials.LLMCredential);
  });
  readonly hasEmbedderCredential = computed(() => {
    const credentials = this.#AICredentials();
    return Boolean(credentials.embedderCredential);
  });

  openDialog() {
    const initialAICredentials = structuredClone(this.#AICredentials());
    this.#aiCredentialsDialogService
      .openDialog(initialAICredentials)
      .onClose.subscribe({
        next: (AICredentials) => {
          if (AICredentials) {
            this.setAICredentials(AICredentials);
          }
        },
      });
  }

  setAICredentials(aiCredentials: AICredentials) {
    this.#AICredentials.set(aiCredentials);
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
