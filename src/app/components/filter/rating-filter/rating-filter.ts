import { Component, model, signal } from '@angular/core';

@Component({
  selector: 'app-rating-filter',
  imports: [],
  templateUrl: './rating-filter.html',
  styleUrl: './rating-filter.css',
})
export class RatingFilter {
  readonly starNum = Array.from({ length: 5 }, (_, i) => i + 1);

  rating = model<number>(0);

  onSelectRating(id: number) {
    this.rating.set(id);
  }
}
