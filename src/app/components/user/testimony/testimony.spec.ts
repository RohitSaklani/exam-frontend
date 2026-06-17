import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimony } from './testimony';

describe('Testimony', () => {
  let component: Testimony;
  let fixture: ComponentFixture<Testimony>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimony],
    }).compileComponents();

    fixture = TestBed.createComponent(Testimony);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
