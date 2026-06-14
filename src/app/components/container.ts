import { Component } from '@angular/core';
import { ToggleButton } from './toggle-button';

@Component({
  selector: 'app-container',
  imports: [],
  template: `<div class="pt-[80px] lg:pt-[100px] box-border ">
    <ng-content></ng-content>
  </div> `,
  styles: '',
})
export class Container {}
