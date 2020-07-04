import { Injectable } from '@angular/core';
import * as Parser from 'rss-parser';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedParserService {
  private parser = new Parser();

  constructor() {}

  public getFeed(url: string) {
    return from(this.parser.parseURL(url));
  }
}
