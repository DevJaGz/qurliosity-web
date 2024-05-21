import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { TemplateSourceData } from '../../datatypes';
import { Sources, Template } from '@core/datatypes';

@Component({
  selector: 'app-template-sources',
  standalone: true,
  imports: [],
  templateUrl: './template-sources.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateSourcesComponent {
  readonly #route = inject(ActivatedRoute);

  readonly #sourcesData$: Observable<TemplateSourceData> =
    this.#route.data.pipe(map((data) => data['sourcesData']));

  readonly sources: Signal<Sources> = toSignal(
    this.#sourcesData$.pipe(map((data) => data.sources)),
    {
      initialValue: [],
    }
  );

  readonly template: Signal<Template | undefined> = toSignal(
    this.#sourcesData$.pipe(map((data) => data.template))
  );
}
