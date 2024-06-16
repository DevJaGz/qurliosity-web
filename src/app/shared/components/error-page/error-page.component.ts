import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './error-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent {}
