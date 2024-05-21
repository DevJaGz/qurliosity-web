import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './playground.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent {}
