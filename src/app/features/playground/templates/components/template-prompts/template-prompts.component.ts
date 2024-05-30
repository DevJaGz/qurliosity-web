import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { toSignalArray } from '@shared/utils';

@Component({
  selector: 'app-template-prompts',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './template-prompts.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatePromptsComponent {
  form = new FormGroup({
    name: new FormControl(''),
    items: new FormArray([]),
  });

  get value$() {
    return this.form.valueChanges;
  }

  #itemsArray = this.form.get('items') as FormArray;

  xItemsArray = toSignalArray(this.#itemsArray);

  xItemsControls = computed(() => {
    const controls = this.xItemsArray()?.controls;
    if (!controls?.length) return [];
    return [...controls];
  });

  add(name = 'item') {
    setTimeout(() => {
      const randomHashName = Math.random().toString(36).substring(2);
      this.#itemsArray.push(
        new FormGroup({
          arrayItemName: new FormControl(name + randomHashName),
        })
      );
    }, 2000);
  }

  delete() {
    setTimeout(() => {
      this.#itemsArray.clear();
    }, 2000);
  }

  deleteOne(index: number) {
    setTimeout(() => {
      this.#itemsArray.removeAt(index);
    }, 2000);
  }

  constructor() {
    console.log('CTOR', this.form, this.#itemsArray);
    this.value$.subscribe((items) => {
      console.log('CTOR: items', items);
    });
  }
}
