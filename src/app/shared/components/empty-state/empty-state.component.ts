import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './empty-state.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {}
