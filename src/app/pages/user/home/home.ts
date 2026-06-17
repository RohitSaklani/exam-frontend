import { Component, inject, OnInit, signal } from '@angular/core';
import { QuizService } from '../../../services/quiz-service';
import { Router } from '@angular/router';
import { Testimony } from '../../../components/user/testimony/testimony';
import { GLobalService } from '../../../services/global-service';
@Component({
  selector: 'app-home',
  imports: [Testimony],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  trendingQuizList = [
    {
      subject: 'Emerging Automobile',
      quizTopic: 'UpComing Automobile Engeneering',
      quizDesc:
        "  Here is an interesting 'computer skills quiz' that will test the basic computer sk...",
    },
    {
      subject: 'Emerging Automobile',
      quizTopic: 'UpComing Automobile Engeneering',
      quizDesc:
        "  Here is an interesting 'computer skills quiz' that will test the basic computer sk...",
    },
    {
      subject: 'Emerging Automobile',
      quizTopic: 'UpComing Automobile Engeneering',
      quizDesc:
        "  Here is an interesting 'computer skills quiz' that will test the basic computer sk...",
    },
    {
      subject: 'Emerging Automobile',
      quizTopic: 'UpComing Automobile Engeneering',
      quizDesc:
        "  Here is an interesting 'computer skills quiz' that will test the basic computer sk...",
    },
    {
      subject: 'Emerging Automobile',
      quizTopic: 'UpComing Automobile Engeneering',
      quizDesc:
        "  Here is an interesting 'computer skills quiz' that will test the basic computer sk...",
    },
  ];

  count = 0;

  number = Array(10);

  private quizService = inject(QuizService);
  private router = inject(Router);
  globalService = inject(GLobalService);

  quizData: any = signal(null);

  ngOnInit(): void {
    this.loadPageData();
  }

  loadPageData() {
    this.globalService.openLoader();
    this.quizService.getLandingPageData().subscribe({
      next: (res: any) => {
        this.quizData.set(res.data);

        this.globalService.closeLoader();
      },
      error: (err) => {
        this.globalService.closeLoader();
      },
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  scroll(element: HTMLElement, direction: 'left' | 'right') {
    // Define how many pixels to scroll per click
    const scrollAmount = 200;

    if (direction === 'left') {
      element.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
