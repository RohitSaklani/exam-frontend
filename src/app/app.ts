import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { PopUpModel } from './components/pop-up-model/pop-up-model';
import { GLobalService } from './services/global-service';
import { ToastComponent } from './components/toast-component';
import { Loader } from './components/loader/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PopUpModel, ToastComponent, Loader],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('exam-frontend');
  //  constructor(protected themeService: ThemeService) {}
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Re-scans the DOM for data-collapse-toggle attributes
      }
    });
  }
}
