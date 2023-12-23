import { TestBed } from '@angular/core/testing';

import { mapService } from './map.service';

describe('zoneService', () => {
  let service: mapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(mapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
