import { Component, inject, signal } from '@angular/core';
import { ToggleButton } from '../toggle-button';
import { ToastService } from '../../services/toast-service';
import { AuthService } from '../../services/auth-service';
import { AvatarDropdown } from '../avatar-dropdown/avatar-dropdown';

@Component({
  selector: 'app-header',
  imports: [ToggleButton, AvatarDropdown],
  template: `<nav
    class="bg-(--secondary) h-[80px] lg:h-[100px] border-gray-200 px-4 lg:px-6 py-3 lg:py-5 fixed w-full z-50 top-0 start-0"
  >
    <div class="mx-auto px-1">
      <!-- Main Navbar -->
      <div class="flex justify-between items-center h-16">
        <!-- LEFT: Logo + Links -->
        <div class="flex items-center space-x-6">
          <!-- Logo -->
          <div class="text-xl font-bold text-blue-600">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
          </div>

          <!-- Desktop Links -->
          <ul class="hidden md:flex space-x-4">
            @for (link of links; track link.name) {
              <li>
                <a
                  [href]="link.path"
                  class="text-lg font-[400] transition-colors duration-300 ease-in-out block py-2 pr-4 pl-3 text-white border-gray-100 hover:text-amber-300 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  {{ link.name }}
                </a>
              </li>
            }
          </ul>
        </div>

        <!-- RIGHT: Login + Hamburger -->
        <div class="flex items-center  space-x-4">
          <!-- Login Button -->
          <div class="hidden md:flex gap-3 items-center">
            <app-toggle-button />
            @if (authService.isLoggedIn()) {
              <app-avatar-dropdown />
            } @else {
              <a
                href="/login"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ml-2"
              >
                Login
              </a>
            }
          </div>

          <!-- Hamburger -->
          <button
            class="md:hidden focus:outline-none text-white cursor-pointer"
            (click)="toggleMenu()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      @if (isMenuOpen) {
        <div class="fixed inset-0 bg-white/20 z-40" (click)="closeMenu()"></div>
      }

      <!-- SIDE MENU -->
      <div
        class="fixed top-0 right-0 h-full w-50 bg-(--bg) dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300"
        [class.translate-x-full]="!isMenuOpen"
        [class.translate-x-0]="isMenuOpen"
      >
        <!-- Close Button -->
        <div class="flex justify-between p-4 text-(--text-primary)">
          <div class="text-xl font-bold text-blue-600">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
          </div>
          <button class="cursor-pointer" (click)="closeMenu()">✖</button>
        </div>

        <!-- Menu Links -->
        @if (isMenuOpen) {
          <ul class="md:hidden pb-4 ">
            <li class="my-2 pl-2 text-center">
              <div class="flex  items-center justify-between">
                @if (authService.isLoggedIn()) {
                  <app-avatar-dropdown />
                } @else {
                  <a
                    href="/login"
                    class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ml-2"
                  >
                    Login
                  </a>
                }
                <app-toggle-button />
              </div>
            </li>
            @for (link of links; track link.name) {
              <li>
                <a
                  [href]="link.path"
                  class="text-[16px] font-[400] transition-colors duration-300 ease-in-out block py-2 pr-4 pl-3 text-(--text-primary) border-gray-100 hover:text-amber-300 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  {{ link.name }}
                </a>
              </li>
            }
          </ul>
        }
      </div>
    </div>
  </nav> `,
  styles: '',
})
export class Header {
  links: any = [
    { name: 'Home', path: '/' },
    { name: 'BrowseAll', path: '/browseall' },
  ];

  counter = 0;

  toastService = inject(ToastService);
  authService = inject(AuthService);

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
