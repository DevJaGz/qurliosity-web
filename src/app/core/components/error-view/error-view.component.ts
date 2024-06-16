import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '@shared/index';

@Component({
  selector: 'app-error-view',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './error-view.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorViewComponent {}
