import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
  isValid = input.required<boolean>();
  dissabled = input.required<boolean>();
}
