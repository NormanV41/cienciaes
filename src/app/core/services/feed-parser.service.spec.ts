import { TestBed } from '@angular/core/testing';

import { FeedParserService } from './feed-parser.service';

describe('FeedParserService', () => {
  let service: FeedParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
