import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseAll } from './browse-all';

describe('BrowseAll', () => {
  let component: BrowseAll;
  let fixture: ComponentFixture<BrowseAll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseAll],
    }).compileComponents();

    fixture = TestBed.createComponent(BrowseAll);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
