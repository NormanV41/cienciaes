import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable, forkJoin } from 'rxjs';
import { CienciaesFeed } from '../api/models/cienciaes-feed';
import { Feed } from '../api/url';
import { SaveFeedService } from './save-feed.service';
import { filter, switchMap, delay, map } from 'rxjs/operators';
import {
  makeSureNoNull,
  makeSureNoNullForArray
} from '../api/utils/make-sure-no-null';
import { Filter } from '../api/models/filter';
import { momentjsonToMoment } from '../api/utils/momentjson-to-moment';
import { sort } from '../api/utils/sort';
import { limit } from '../api/utils/limit';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  constructor(
    private storage: StorageService,
    private saveFeedApi: SaveFeedService
  ) {}

  private prepareGetAll() {
    const observables: Array<Observable<CienciaesFeed | null>> = Object.values(
      Feed
    ).map((el) => this.storage.get<CienciaesFeed>(el));
    const forkOfObservables$ = forkJoin(observables);
    const finalObservable$ = this.saveFeedApi.allFeedsWasSave.pipe(
      filter((data) => data)
    );
    return finalObservable$.pipe(
      switchMap(() => {
        return forkOfObservables$;
      }),
      makeSureNoNullForArray(),
      momentjsonToMoment()
    );
  }

  public getAll(filterParam: Filter) {
    let result = this.prepareGetAll();
    if (filterParam.order) {
      result = result.pipe(sort(filterParam.order));
    }
    if (filterParam.limit) {
      result = result.pipe(limit(filterParam.limit));
    }
    return result;
  }

  public getEpisodes(id: string, filterParam: Filter) {
    this.storage.get<CienciaesFeed>(id);
  }
}
