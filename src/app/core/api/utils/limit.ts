import { CienciaesFeed } from '../models/cienciaes-feed';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function limit(n: number) {
  return (old$: Observable<CienciaesFeed[]>) => {
    return old$.pipe(map((data) => data.slice(undefined, n)));
  };
}
