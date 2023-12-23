import { TestBed } from '@angular/core/testing';

import { zoneService } from './zone.service';

describe('zoneService', () => {
  let service: zoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(zoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
