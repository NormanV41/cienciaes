import { Observable } from 'rxjs';
import { CienciaesFeed } from '../models/cienciaes-feed';
import { map } from 'rxjs/operators';
import * as moment from 'moment-timezone';

export function momentjsonToMoment() {
  return (old$: Observable<CienciaesFeed[]>) => {
    return old$.pipe(
      map((data) =>
        data.map((el) => {
          el.pubDate = moment(el.pubDate);
          el.lastBuildDate = moment(el.lastBuildDate);
          el.items = el.items.map((item) => {
            item.pubDate = moment(item.pubDate);
            return item;
          });
          return el;
        })
      )
    );
  };
}
