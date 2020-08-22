import { Observable } from 'rxjs';
import { CienciaesFeed } from '../models/cienciaes-feed';
import { map } from 'rxjs/operators';

export function makeSureNoNull() {
  return (old$: Observable<CienciaesFeed | null>) => {
    return old$.pipe(map(notNull));
  };
}

export function makeSureNoNullForArray() {
  return (old$: Observable<Array<CienciaesFeed | null>>) => {
    return old$.pipe(map((data) => data.map(notNull)));
  };
}

function notNull(el: CienciaesFeed | null) {
  if (el) {
    return el;
  }
  throw new Error('null not handled');
}
