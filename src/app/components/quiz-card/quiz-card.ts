import { Component, inject, input } from '@angular/core';
import { QuizCardModel } from '../../models/QuizModel';
import { GLobalService } from '../../services/global-service';

@Component({
  selector: 'app-quiz-card',
  imports: [],
  templateUrl: './quiz-card.html',
  styleUrl: './quiz-card.css',
})
export class QuizCard {
  cardDetails = input<QuizCardModel>();
  globalService = inject(GLobalService);
}
