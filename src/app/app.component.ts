import { Component, inject } from '@angular/core';
import { BlockUIModule } from 'primeng/blockui';
import { RouterOutlet } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderIndicatorService } from '@shared/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BlockUIModule, ProgressSpinnerModule],
  template: `
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
  styles: `

  `,
})
export class AppComponent {
  readonly loadingService = inject(LoaderIndicatorService);
  isLoading = this.loadingService.isLoading;
}
