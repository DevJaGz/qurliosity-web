import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { AiCredentialsService } from '@shared/services';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-ai-credential-button',
  standalone: true,
  imports: [SharedModule, NgClass],
  templateUrl: './ai-credential-button.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiCredentialButtonComponent {
  readonly #aiCredentialsService = inject(AiCredentialsService);
  readonly isValid = this.#aiCredentialsService.hasAICredentials;
  readonly dissabled = input<boolean>();

  openDialog() {
    this.#aiCredentialsService.openDialog();
  }
}
