import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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

  items = this.form.get('items') as FormArray;

  xItemsFormControls = toSignal(
    this.items.valueChanges.pipe(map(() => [...this.items.controls])),
    {
      initialValue: [],
    }
  );

  add(name = 'item') {
    setTimeout(() => {
      this.items.push(
        new FormGroup({
          name: new FormControl(name),
        })
      );
    }, 2000);
  }

  constructor() {
    this.items.valueChanges.subscribe((items) => {
      console.log('CTOR: items', items);
    });
  }
}
