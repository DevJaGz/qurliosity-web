import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getItem<T extends object>(key: string, parse = true): T | string | null {
    const value = localStorage.getItem(key);
    if (!value) return null;
    if (!parse) return value;
    return JSON.parse(value);
  }

  setItem<T = unknown>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
