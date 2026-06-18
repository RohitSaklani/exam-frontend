import { Component, HostListener, inject, model, OnInit, signal } from '@angular/core';
import { QuizCard } from '../../../components/quiz-card/quiz-card';
import { GLobalService } from '../../../services/global-service';
import { ToastService } from '../../../services/toast-service';
import { QuizService } from '../../../services/quiz-service';
import { Filter } from '../../../components/filter/filter';
import { FilterModel, QuizModel } from '../../../models/QuizModel';

@Component({
  selector: 'app-browse-all',
  imports: [QuizCard, Filter],
  templateUrl: './browse-all.html',
  styleUrl: './browse-all.css',
})
export class BrowseAll implements OnInit {
  private quizService = inject(QuizService);
  private globalService = inject(GLobalService);

  isMobileFilterOpen = model<boolean>(false);

  quizList = signal<QuizModel[]>([]);

  switchMobileFilterOpen() {
    this.isMobileFilterOpen.update((val) => !val);
  }

  ngOnInit(): void {
    this.globalService.openLoader();
    this.quizService.getAllQuizes().subscribe({
      next: (res: any) => {
        this.quizList.set(res.data);
        this.globalService.closeLoader();
      },
      error: (err: any) => {
        this.globalService.closeLoader();
      },
    });
  }

  onFilterChange(filterData: FilterModel) {
    this.globalService.openLoader();
    this.isMobileFilterOpen.set(false);

    this.quizService.getQuizsByFilters(filterData).subscribe({
      next: (res: any) => {
        this.quizList.set(res.data);
        this.globalService.closeLoader();
      },
      error: (err) => {
        this.globalService.closeLoader();
      },
    });
  }
}
