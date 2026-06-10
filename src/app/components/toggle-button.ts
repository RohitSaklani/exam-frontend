import { Component, DOCUMENT, effect, inject, OnInit, signal } from '@angular/core';
import { GLobalService } from '../services/global-service';

@Component({
  selector: 'app-toggle-button',
  imports: [],
  template: `<div
    (click)="globalService.toggleTheme()"
    class="p-2 rounded-full transition cursor-pointer"
  >
    @if (globalService.theme() === 1) {
      <!-- Sun Icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-yellow-500 hover:text-yellow-200 "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M6.05 6.05L4.636 4.636m12.728 0L16.95 6.05M6.05 17.95l-1.414 1.414"
        />
        <circle cx="12" cy="12" r="4" />
      </svg>
    } @else {
      <!-- Moon Icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-500 hover:text-gray-800 "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 12.79A9 9 0 0111.21 3 
               7 7 0 1019 13 
               a9 9 0 002-0.21z"
        />
      </svg>
    }
  </div>`,
})
export class ToggleButton {
  globalService = inject(GLobalService);
}
