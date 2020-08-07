import { Observable } from 'rxjs';
import { CienciaesFeed } from '../models/cienciaes-feed';
import { map } from 'rxjs/operators';

export function makeSureNoNull() {
  return (old$: Observable<(CienciaesFeed | null)[]>) => {
    return old$.pipe(
      map((data) =>
        data.map((el) => {
          if (el === null) {
            throw new Error('not expecting null');
          }
          return el;
        })
      )
    );
  };
}
