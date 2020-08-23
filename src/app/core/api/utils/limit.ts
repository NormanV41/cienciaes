import { CienciaesFeed } from '../models/cienciaes-feed';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function limit<T>(n: number) {
  return (old$: Observable<T[]>) => {
    return old$.pipe(map((data) => data.slice(undefined, n)));
  };
}
