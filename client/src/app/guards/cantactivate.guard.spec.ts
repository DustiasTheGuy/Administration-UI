import { TestBed } from '@angular/core/testing';

import { CantactivateGuard } from './cantactivate.guard';

describe('CantactivateGuard', () => {
  let guard: CantactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CantactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
