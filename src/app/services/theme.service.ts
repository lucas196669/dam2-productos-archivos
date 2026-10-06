import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  dark = signal(localStorage.getItem('dark') === 'true');

  constructor() {
    this.apply();
  }

  toggle(): void {
    this.dark.update(v => !v);
    localStorage.setItem('dark', String(this.dark()));
    this.apply();
  }

  private apply(): void {
    document.documentElement.classList.toggle('ion-palette-dark', this.dark());
  }
}