import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { TemplateSourcesComponent } from '../../components';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {
  SelectButtonModule,
  SelectButtonOptionClickEvent,
} from 'primeng/selectbutton';
import { SharedModule } from '@shared/index';
import { ButtonList, ButtonListItem } from '@shared/datatypes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-view',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    SelectButtonModule,
    SharedModule,
    TemplateSourcesComponent,
  ],
  templateUrl: './template-view.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateViewComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);

  templateButtons: ButtonList = [
    {
      name: 'Sources',
      navigateTo: 'sources',
      icon: 'brand-github',
    },
    {
      name: 'Prompts',
      navigateTo: 'prompts',
      icon: 'heart',
    },
    {
      name: 'Completions',
      navigateTo: 'completions',
      icon: 'camera',
    },
  ];

  currentNavigation = signal('sources');

  onOptionClick(data: SelectButtonOptionClickEvent) {
    const option = data.option as ButtonListItem;
    if (!option) return;
    this.#router.navigate([option.navigateTo], { relativeTo: this.#route });
  }

  ngOnInit(): void {
    this.#initializeNavigation();
    this.#initializeTemplateData();
  }

  #initializeTemplateData() {
    console.log('data', this.#route.snapshot.data);
  }

  #initializeNavigation() {
    const currentRoute = this.#router.url.split('/').pop();
    if (!currentRoute) return;
    this.currentNavigation.set(currentRoute);
  }
}
