import { Observable } from 'rxjs';
import { CienciaesFeed, CienciaesFeedItem } from '../models/cienciaes-feed';
import { Filter } from '../models/filter';
import { sort } from './sort';
import { limit } from './limit';

export function filterCienciaesFeed<T extends CienciaesFeed | CienciaesFeedItem>(filter?: Filter) {
  return (old$: Observable<Array<T>>) => {
    if (filter?.order) {
      old$ = old$.pipe(sort(filter.order));
    }
    if (filter?.limit) {
      old$ = old$.pipe(limit(filter.limit));
    }
    return old$;
  };
}
