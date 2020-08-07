import { Observable } from 'rxjs';
import { CienciaesFeed } from '../models/cienciaes-feed';
import { map } from 'rxjs/operators';

export function sort(order: string) {
  if (order === 'pubDate') {
    return sortByPubdate();
  }
  throw new Error('not implemented');
}

function sortByPubdate() {
  return (old$: Observable<CienciaesFeed[]>) => {
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
