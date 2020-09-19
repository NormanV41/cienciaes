import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable, forkJoin } from 'rxjs';
import { CienciaesFeed } from '../api/models/cienciaes-feed';
import { Feed } from '../api/url';
import { SaveFeedService } from './save-feed.service';
import { filter, switchMap, map } from 'rxjs/operators';
import { makeSureNoNull, makeSureNoNullForArray } from '../api/utils/make-sure-no-null';
import { Filter } from '../api/models/filter';
import { momentjsonToMoment } from '../api/utils/momentjson-to-moment';
import { filterCienciaesFeed } from '../api/utils/filter';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  public constructor(private storage: StorageService, private saveFeedApi: SaveFeedService) {}

  public getAll(filterParam?: Filter) {
    const observables: Array<Observable<CienciaesFeed | null>> = Object.values(Feed).map((el) =>
      this.storage.get<CienciaesFeed>(el)
    );
    const forkOfObservables$ = forkJoin(observables);
    const finalObservable$ = this.saveFeedApi.allFeedsWasSave.pipe(filter((data) => data));
    return finalObservable$.pipe(
      switchMap(() => {
        return forkOfObservables$;
      }),
      makeSureNoNullForArray(),
      momentjsonToMoment(),
      filterCienciaesFeed(filterParam)
    );
  }

  public getEpisodes(id: string, filterParam?: Filter) {
    const result$ = this.storage.get<CienciaesFeed>(id).pipe(
      makeSureNoNull(),
      map((data) => data.items),
      filterCienciaesFeed(filterParam),
      momentjsonToMoment()
    );
    return this.saveFeedApi.allFeedsWasSave.pipe(
      filter((data) => data),
      switchMap(() => result$)
    );
  }

  public getEpisode(id: string) {
    const feedId = id.split('-')[0];
    return this.getEpisodes(feedId).pipe(
      map((episodes) => {
        const episode = episodes.find((el) => el.id === id);
        if (!episode) {
          throw new Error('no episode');
        }
        return episode;
      })
    );
  }
}
