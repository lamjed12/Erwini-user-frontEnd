import { TestBed } from '@angular/core/testing';

import { vanneService } from './vanne.service';

describe('vanneService', () => {
  let service: vanneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(vanneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
