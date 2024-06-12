import { Injectable } from '@angular/core';
import { Prompt } from '@core/datatypes';

@Injectable()
export class CompletionsStateService {
  readonly #completions = new Map<string, string>();
  readonly #prompts = new Map<string, Prompt>();

  getPrompt(promptId: string): Prompt | undefined {
    const promptFound = this.#prompts.get(promptId);
    return promptFound;
  }

  setPrompt(prompt: Prompt): void {
    const promptId = prompt._id;
    if (!promptId) {
      throw new Error(
        'Prompt id is required for setting the prompt in the map'
      );
    }
    this.#prompts.set(promptId, prompt);
  }

  getCompletion(promptId: string): string {
    const completion = this.#completions.get(promptId);
    if (!completion) {
      throw new Error(`Completion not found for prompt id ${promptId}`);
    }
    return completion;
  }

  setCompletion(promptId: string, completion: string): void {
    this.#completions.set(promptId, completion);
  }

  deleteCompletion(promptId: string): void {
    this.#completions.delete(promptId);
    this.#prompts.delete(promptId);
  }
}
