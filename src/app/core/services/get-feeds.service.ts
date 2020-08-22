import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import urls, { Feed } from '../api/url';
import { feedParser } from '../api/utils/feed-parser';

@Injectable({
  providedIn: 'root'
})
export class GetFeedsService {
  constructor(
    private http: HTTP,
    private platform: Platform,
    private httpClient: HttpClient
  ) {}

  public getFeed(feed: Feed) {
    if (this.platform.is('mobileweb')) {
      return this.getFeedLocalServerForBrowserTest(feed).pipe(feedParser(feed));
    }
    return from(
      this.http.get(this.getFeedUrl(feed).prod, undefined, undefined)
    ).pipe(
      map((data) => data.data),
      feedParser(feed)
    );
  }

  public getFeedLocalServerForBrowserTest(feed: Feed) {
    return this.httpClient.get(this.getFeedUrl(feed).dev, {
      responseType: 'text'
    });
  }

  public getFeedUrl(feed: Feed) {
    const feedUrl = urls.get(feed);
    if (!feedUrl) {
      throw new Error('feed url should not be null');
    }
    return feedUrl;
  }
}
