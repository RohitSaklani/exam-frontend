import { DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PopUpModalService } from './pop-up-modal-service';

@Injectable({
  providedIn: 'root',
})
export class GLobalService {
  router = inject(Router);

  popUpModalService = inject(PopUpModalService);

  loading = signal(false);

  private document = inject(DOCUMENT);
  theme = signal(0);

  constructor() {
    const localTheme = localStorage.getItem('theme');
    if (localTheme != null) {
      if (localTheme === 'dark') this.theme.set(1);
    }

    effect(() => {
      if (this.theme() == 1) {
        localStorage.setItem('theme', 'dark');
        this.document.documentElement.classList.add('dark');
      } else {
        localStorage.setItem('theme', 'light');
        this.document.documentElement.classList.remove('dark');
      }
    });
  }

  toggleTheme() {
    this.theme.update((value) => (value == 1 ? 0 : 1));
  }

  closeLoader() {
    this.loading.set(false);
  }

  openLoader() {
    this.loading.set(true);
  }

  switchLoader() {
    this.loading.update((x) => !x);
  }

  navigate(path: string) {
    this.openLoader();
    this.popUpModalService.closeModal();
    this.router.navigate([path]);
    this.closeLoader();
  }

  refreshPage() {
    window.location.reload();
  }
}
