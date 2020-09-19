import { Observable } from 'rxjs';
import { CienciaesFeed, CienciaesFeedItem } from '../models/cienciaes-feed';
import { map } from 'rxjs/operators';

export function sort<T extends CienciaesFeed | CienciaesFeedItem>(order: string) {
  if (order === 'pubDate') {
    return sortByPubdate<T>();
  }
  throw new Error('not implemented');
}

function sortByPubdate<T extends CienciaesFeed | CienciaesFeedItem>() {
  return (old$: Observable<Array<T>>) => {
    return old$.pipe(
      map((data) =>
        data.sort((first, second) => {
          if (first.pubDate.isAfter(second.pubDate)) {
            return -1;
          }
          if (first.pubDate.isSame(second.pubDate)) {
            return 0;
          }
          return 1;
        })
      )
    );
  };
}
