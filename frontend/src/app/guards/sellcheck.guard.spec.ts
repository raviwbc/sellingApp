import { TestBed } from '@angular/core/testing';

import { SellcheckGuard } from './sellcheck.guard';

describe('SellcheckGuard', () => {
  let guard: SellcheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SellcheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
