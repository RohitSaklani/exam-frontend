import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingFilter } from './rating-filter';

describe('RatingFilter', () => {
  let component: RatingFilter;
  let fixture: ComponentFixture<RatingFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
