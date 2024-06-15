import { WritableSignal } from '@angular/core';

export interface ButtonListItem {
  name: string;
  navigateTo: string;
  icon: string;
  disabled: boolean;
}

export type ButtonList = ButtonListItem[];
