import { TestBed } from '@angular/core/testing';

import { GLobalService } from './global-service';

describe('GLobalService', () => {
  let service: GLobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GLobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
