import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderIndicatorService } from '@shared/services';
import { SharedModule } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  template: `
    <p-toast />
    <router-outlet></router-outlet>
    <p-blockUI [blocked]="isLoading()">
      <p-progressSpinner
        ariaLabel="loading"
        styleClass="w-8 h-8"
        strokeWidth="8"
        animationDuration=".5s"
      />
    </p-blockUI>
  `,
  styles: ``,
})
export class AppComponent {
  readonly loadingService = inject(LoaderIndicatorService);
  isLoading = this.loadingService.isLoading;
}
