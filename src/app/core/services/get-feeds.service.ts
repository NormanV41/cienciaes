import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import urls, { Feed } from '../api/url';
import { feedParser } from '../api/utils/feed-parser';

@Injectable({
  providedIn: 'root',
})
export class GetFeedsService {
  constructor(
    private http: HTTP,
    private platform: Platform,
    private httpClient: HttpClient
  ) {}

  public getFeed(feed: Feed) {
    if (this.platform.is('mobileweb')) {
      return this.getFeedLocalServerForBrowserTest(feed).pipe(feedParser());
    }
    return from(this.http.get(urls.get(feed).prod, undefined, undefined)).pipe(
      map((data) => data.data),
      feedParser()
    );
  }

  public getFeedLocalServerForBrowserTest(feed: Feed) {
    return this.httpClient.get(urls.get(feed).dev, { responseType: 'text' });
  }
}
