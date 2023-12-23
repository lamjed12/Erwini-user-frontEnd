import { TestBed } from '@angular/core/testing';

import { puitService } from './puit.service';

describe('puitService', () => {
  let service: puitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(puitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
