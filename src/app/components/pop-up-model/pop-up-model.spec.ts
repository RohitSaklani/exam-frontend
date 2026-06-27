import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpModel } from './pop-up-model';

describe('PopUpModel', () => {
  let component: PopUpModel;
  let fixture: ComponentFixture<PopUpModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpModel],
    }).compileComponents();

    fixture = TestBed.createComponent(PopUpModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
