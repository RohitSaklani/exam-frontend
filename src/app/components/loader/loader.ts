import { Component, inject } from '@angular/core';
import { GLobalService } from '../../services/global-service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  loader = inject(GLobalService);
}
