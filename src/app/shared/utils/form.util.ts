import { Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormArray } from '@angular/forms';
import { Entity } from '@core/datatypes';
import { Observable, map } from 'rxjs';

export const byFormId = <T extends Entity>(
  entity: T,
  comparison: 'eq' | 'notEq' = 'eq'
) => {
  if (comparison === 'eq') {
    return (formControl: AbstractControl) =>
      formControl.value._id === entity._id;
  }

  if (comparison === 'notEq') {
    return (formControl: AbstractControl) =>
      formControl.value._id !== entity._id;
  }

  throw new Error('Invalid comparison');
};

export const findIndexControl = <T extends Entity, K extends AbstractControl>(
  sources: K[],
  source: T
): number | null => {
  const index = sources.findIndex(byFormId(source));
  if (index === -1) {
    return null;
  }
  return index;
};

export const toSignalFormArray = (formArray: FormArray): Signal<FormArray> => {
  const valueChanges = formArray.valueChanges;
  const arrayChanges = valueChanges.pipe(
    map((value) => {
      formArray.patchValue(value, { emitEvent: false });
      return Object.assign(new FormArray([]), formArray);
    })
  ) as Observable<FormArray>;
  return toSignal(arrayChanges, { initialValue: formArray });
};

export const computedFormControls = (
  signalArray: Signal<FormArray>
): Signal<AbstractControl[]> => {
  return computed(() => {
    const controls = signalArray().controls;
    if (!controls?.length) return [];
    return [...controls];
  });
};
