import { TestBed } from '@angular/core/testing';

import { SaveFeedService } from './save-feed.service';

describe('SaveFeedService', () => {
  let service: SaveFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
