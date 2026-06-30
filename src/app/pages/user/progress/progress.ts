import { Component, inject, OnInit, signal } from '@angular/core';
import { QuizService } from '../../../services/quiz-service';
import { GLobalService } from '../../../services/global-service';
import { ResultModel } from '../../../models/QuizModel';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-progress',
  imports: [NgClass],
  templateUrl: './progress.html',
  styleUrl: './progress.css',
})
export class Progress implements OnInit {
  private quizService = inject(QuizService);
  globalService = inject(GLobalService);

  resultList = signal<ResultModel[]>([]);

  ngOnInit(): void {
    this.globalService.openLoader();
    this.quizService.getResultByUser().subscribe({
      next: (res: any) => {
        this.resultList.set(res.data);
        this.globalService.closeLoader();
      },
      error: (err: any) => {
        this.globalService.closeLoader();
      },
    });
  }
}
