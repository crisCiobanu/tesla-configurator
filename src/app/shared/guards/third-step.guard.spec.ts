import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { thirdStepGuard } from './third-step.guard';

describe('thirdStepGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => thirdStepGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
