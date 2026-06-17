import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCarousel } from './quiz-carousel';

describe('QuizCarousel', () => {
  let component: QuizCarousel;
  let fixture: ComponentFixture<QuizCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
