import { Component, inject, OnInit, signal } from '@angular/core';
import { GLobalService } from '../../../services/global-service';
@Component({
  selector: 'app-quiz-carousel',
  imports: [],
  templateUrl: './quiz-carousel.html',
  styleUrl: './quiz-carousel.css',
})
export class QuizCarousel implements OnInit {
  items = [
    { name: 'c1', path: '/c1.jpg' },
    { name: 'c2', path: '/c2.jpg' },
    { name: 'c3', path: '/c3.jpg' },
  ];

  currentItem = signal(0);

  interval = 4000;

  activeIntervalId: any;

  globalservice = inject(GLobalService);

  ngOnInit(): void {
    this.intiateSlider();
  }

  intiateSlider() {
    this.activeIntervalId = null;
    this.activeIntervalId = setInterval(() => this.updateCarousel(), this.interval);
  }

  cancelSilder() {
    clearInterval(this.activeIntervalId);
    this.intiateSlider();
  }

  updateCarousel() {
    this.next();
  }

  next() {
    if (this.currentItem() >= this.items.length - 1) {
      this.currentItem.set(0);
    } else {
      this.currentItem.update((x) => x + 1);
    }
  }

  previous() {
    if (this.currentItem() <= 0) {
      this.currentItem.set(this.items.length - 1);
    } else {
      this.currentItem.update((x) => x - 1);
    }
  }
}
