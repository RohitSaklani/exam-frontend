import {
  Component,
  HostListener,
  inject,
  input,
  model,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { SubjectFilter } from './subject-filter/subject-filter';
import { GLobalService } from '../../services/global-service';
import { QuizService } from '../../services/quiz-service';
import {
  FilterModel,
  LevelFilterModel,
  SubjectFilterModel,
  SubjectModel,
} from '../../models/QuizModel';
import { LevelFilter } from './level-filter/level-filter';
import { RatingFilter } from './rating-filter/rating-filter';

@Component({
  selector: 'app-filter',
  imports: [SubjectFilter, LevelFilter, RatingFilter],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter implements OnInit {
  private globalService = inject(GLobalService);
  private quizService = inject(QuizService);

  subjectList = model<SubjectFilterModel[]>([]);

  levelList = model<LevelFilterModel[]>([]);

  rating = model<number>(0);

  isMobileFilterOpen = model<boolean>();

  filterChanged = output<FilterModel>();

  @HostListener('window:resize', ['$event'])
  onScreenResize(event: Event) {
    console.log('screen ', (event.target as Window).innerWidth);
    let screenSize = (event.target as Window).innerWidth;

    if (screenSize <= 640) {
    } else {
      console.log('screenSize : ', screenSize);
      this.isMobileFilterOpen.set(false);
    }
  }

  switchMobileFilter() {
    this.isMobileFilterOpen.update((val) => !val);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.globalService.openLoader();
    this.quizService.getFilters().subscribe({
      next: (res: any) => {
        console.log('res ,', res.data);

        let subjectListRes = res.data.subjectList.map((ele: any) => {
          return { ...ele, checked: false };
        });
        this.subjectList.set(subjectListRes);

        let levelListRes = res.data.levelList.map((ele: any) => {
          return { name: ele, checked: false };
        });
        this.levelList.set(levelListRes);

        this.globalService.closeLoader();
      },
      error: (err: any) => {
        console.log('error : ', err);

        this.globalService.closeLoader();
      },
    });
  }

  clearFilterAll() {
    const updatedSubjects: SubjectFilterModel[] =
      this.subjectList()?.map((s) => {
        return { ...s, checked: false };
      }) ?? [];
    this.subjectList.set(updatedSubjects);

    const updatedLevels: LevelFilterModel[] =
      this.levelList()?.map((l) => {
        return { ...l, checked: false };
      }) ?? [];
    this.levelList.set(updatedLevels);

    this.rating.set(0);

    console.log('after clear selectedIs ', this.subjectList());
  }

  applyFilters() {
    let subjectIds = this.subjectList()
      .filter((sub: SubjectFilterModel) => sub.checked)
      ?.map((sub) => sub.id);

    let levelNames = this.levelList()
      .filter((l: LevelFilterModel) => l.checked)
      ?.map((l) => l.name);

    this.filterChanged.emit({
      subjectIds: subjectIds,
      levelNames: levelNames,
      rating: this.rating(),
    });

    //   this.quizService
    //     .getQuizsByFilters({ subjectIds, levelNames, rating: this.rating() })
    //     .subscribe({
    //       next: (res: any) => {
    //         console.log('res : ', res.data);
    //       },
    //       error: (err) => {
    //         console.log('err : ', err);
    //       },
    //     });
  }
}
