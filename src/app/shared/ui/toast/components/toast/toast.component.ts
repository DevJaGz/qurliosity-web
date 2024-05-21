import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {

}
