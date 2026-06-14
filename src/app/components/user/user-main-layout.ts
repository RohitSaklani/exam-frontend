import { Component } from '@angular/core';
import { Header } from './header';
import { Footer } from './footer';
import { RouterOutlet } from '@angular/router';
import { Container } from '../container';
import { PopUpModel } from '../pop-up-model/pop-up-model';
import { Loader } from '../loader/loader';
import { ToastComponent } from '../toast-component';

@Component({
  selector: 'app-user-main-layout',
  imports: [RouterOutlet, Header, Footer, Container, PopUpModel, Loader, ToastComponent],
  template: `
    <app-header />
    <app-container>
      <app-pop-up-model></app-pop-up-model>

      <router-outlet> </router-outlet>
    </app-container>
    <app-footer />
  `,
  styles: '',
})
export class UserMainLayout {}
