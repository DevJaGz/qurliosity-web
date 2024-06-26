import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  OnInit,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PromptsService } from '../../services';
import { AbstractControl, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Prompt } from '@core/datatypes';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-template-prompt',
  standalone: true,
  imports: [SharedModule, NgClass],
  templateUrl: './template-prompt.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatePromptComponent implements OnInit {
  readonly #promptsService = inject(PromptsService);
  readonly #destroyRef = inject(DestroyRef);
  readonly textAreaRef =
    viewChild<ElementRef<HTMLTextAreaElement>>('textAreaRef');
  readonly index = input.required<number>();
  #promptForm!: AbstractControl;

  @Input({ required: true })
  set promptForm(promptForm: AbstractControl) {
    this.#promptForm = promptForm;
  }
  get promptForm() {
    return this.#promptForm;
  }

  get prompt() {
    return this.promptForm.value;
  }

  readonly showDeleteDialog = signal(false);
  readonly isLoading = signal(false);

  get formControl() {
    return this.promptForm.get('value') as FormControl;
  }

  deletePrompt() {
    this.showDeleteDialog.set(false);
    this.#promptsService.deletePrompt(this.index(), this.prompt);
  }

  ngOnInit(): void {
    this.promptForm.valueChanges
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        debounceTime(500),
        distinctUntilChanged((prev, curr) => prev.value === curr.value)
      )
      .subscribe({
        next: (prompt: Prompt) => {
          const controlValue = prompt.value || '';
          if (!controlValue) return;

          if (!prompt._id) {
            this.#createPrompt(prompt);
            return;
          }
          this.#promptsService.updatePrompt(prompt);
        },
      });
  }

  #createPrompt(prompt: Prompt) {
    this.isLoading.set(true);
    this.textAreaRef()?.nativeElement.blur();
    this.#promptsService.createPrompt(this.index(), prompt).subscribe({
      complete: () => {
        this.textAreaRef()?.nativeElement.focus();
        this.isLoading.set(false);
      },
    });
  }
}
