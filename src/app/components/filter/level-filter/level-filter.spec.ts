import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelFilter } from './level-filter';

describe('LevelFilter', () => {
  let component: LevelFilter;
  let fixture: ComponentFixture<LevelFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(LevelFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
