import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PromptsService } from '../../services';
import { AbstractControl, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Prompt } from '@core/datatypes';

@Component({
  selector: 'app-template-prompt',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './template-prompt.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatePromptComponent implements OnInit {
  readonly #promptsService = inject(PromptsService);
  readonly #destroyRef = inject(DestroyRef);
  readonly promptForm = input.required<AbstractControl>();
  readonly prompt = computed(() => this.promptForm().value);
  readonly showDeleteDialog = signal(false);

  get formControl() {
    return this.promptForm().get('value') as FormControl;
  }

  deletePrompt() {
    this.showDeleteDialog.set(false);
    this.#promptsService.deletePrompt(this.prompt());
  }

  ngOnInit(): void {
    this.promptForm()
      .valueChanges.pipe(
        takeUntilDestroyed(this.#destroyRef),
        debounceTime(300)
      )
      .subscribe({
        next: (prompt: Prompt) => {
          const controlValue = prompt.value || '';
          if (!controlValue) return;

          const isEntityInDatabase = prompt._id;
          if (!isEntityInDatabase) {
            this.#promptsService.createPrompt(prompt);
            return;
          }
          this.#promptsService.updatePrompt(prompt);
        },
      });
  }
}
