import { Injectable } from '@angular/core';
import { GetFeedsService } from './get-feeds.service';
import { Feed } from '../api/url';
import { StorageService } from './storage.service';
import { flatMap, tap } from 'rxjs/operators';
import { Observable, forkJoin, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveFeedService {
  private _allFeedsWasSave = new BehaviorSubject(false);
  public allFeedsWasSave = this._allFeedsWasSave.asObservable();
  constructor(
    private getFeedApi: GetFeedsService,
    private storageApi: StorageService
  ) {}

  public saveFeed(feed: Feed) {
    return this.getFeedApi
      .getFeed(feed)
      .pipe(flatMap((data) => this.storageApi.set(feed.toString(), data)));
  }

  public saveAllFeeds() {
    const observables: Array<Observable<void>> = [];
    Object.values(Feed).forEach((el) => {
      observables.push(this.saveFeed(el));
    });
    return forkJoin(observables).pipe(
      tap(() => {
        this._allFeedsWasSave.next(true);
      })
    );
  }
}
