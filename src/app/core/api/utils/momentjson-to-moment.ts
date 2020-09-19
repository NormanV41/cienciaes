import { Observable } from 'rxjs';
import { CienciaesFeed, CienciaesFeedItem } from '../models/cienciaes-feed';
import { map } from 'rxjs/operators';
import * as moment from 'moment-timezone';

export function momentjsonToMoment<T extends CienciaesFeed | CienciaesFeedItem>() {
  return (old$: Observable<T[]>) => {
    return old$.pipe(
      map((data) =>
        data.map((el) => {
          el.pubDate = moment(el.pubDate);
          if (!isCienciaesFeed(el)) {
            return el;
          }
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

function isCienciaesFeed(obj: CienciaesFeed | CienciaesFeedItem): obj is CienciaesFeed {
  return (obj as CienciaesFeed).lastBuildDate !== undefined;
}
