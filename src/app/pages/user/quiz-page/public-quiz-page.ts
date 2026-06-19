import { Component, inject, OnInit, signal } from '@angular/core';
import { QuizService } from '../../../services/quiz-service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionModel, SelectedOption } from '../../../models/QuizModel';
import { PopUpModalService } from '../../../services/pop-up-modal-service';
import { GLobalService } from '../../../services/global-service';

@Component({
  selector: 'app-quiz-page',
  imports: [],
  templateUrl: './public-quiz-page.html',
  styleUrl: './public-quiz-page.css',
})
export class QuizPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private modalService = inject(PopUpModalService);
  private globalService = inject(GLobalService);

  private quizService = inject(QuizService);
  questionList = signal<QuestionModel[]>([]);
  selectedOptions = signal<Object>({});
  quizId: string = '';

  selectedOption: any = signal([]);

  constructor() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id == null || id == '') {
      this.router.navigate(['/']);
    } else {
      this.quizId = id;
    }
  }

  ngOnInit(): void {
    this.loadQuestionsWithOptions();
  }

  loadQuestionsWithOptions() {
    this.quizService.getPublicQuestionsWithOptionsByQuizId(this.quizId).subscribe({
      next: (res: any) => {
        this.globalService.openLoader();
        this.questionList.set(res.data);

        let selectedOptionIntial = res.data.reduce((acc: any, curr: any) => {
          return { ...acc, [curr.id]: null };
        }, []);

        this.selectedOption.set(selectedOptionIntial);

        this.globalService.closeLoader();
      },
      error: (err) => {
        this.globalService.closeLoader();
      },
    });
  }

  onOptionSelect(questionId: number, optionId: number) {
    this.selectedOption.update((current: object) => {
      return { ...current, [questionId]: optionId };
    });
  }

  onSubmit() {
    this.globalService.openLoader();
    let id = this.route.snapshot.paramMap.get('id');
    this.quizService.submitPublicQuiz(this.quizId, this.selectedOption()).subscribe({
      next: (res: any) => {
        this.modalService.openModal({
          type: 'QUIZ_RESULT',
          heading: null,
          data: { ...res.data, retakePath: `/quiz/${id}` },
        });

        this.globalService.closeLoader();
      },
      error: (err) => {
        this.globalService.closeLoader();
      },
    });
  }
}
