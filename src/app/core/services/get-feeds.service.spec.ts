import { TestBed } from '@angular/core/testing';

import { GetFeedsService } from './get-feeds.service';

describe('GetFeedsService', () => {
  let service: GetFeedsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFeedsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
