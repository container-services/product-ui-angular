import { TestBed } from '@angular/core/testing';

import { GlobaldataserviceService } from './globaldataservice.service';

describe('GlobaldataserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobaldataserviceService = TestBed.get(GlobaldataserviceService);
    expect(service).toBeTruthy();
  });
});
