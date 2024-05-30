import { AbstractControl } from '@angular/forms';
import { Entity } from '@core/datatypes';

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
