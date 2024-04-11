import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { secondStepGuard } from './second-step.guard';

describe('secondStepGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => secondStepGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
