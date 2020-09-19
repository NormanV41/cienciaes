import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { from, Observable, defer } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public constructor() {}

  public set<T>(key: string, value: T) {
    return defer(() =>
      from(Storage.set({ key, value: JSON.stringify(value) })).pipe(
        tap(() => {
          console.log('feed added');
        })
      )
    );
  }

  public get<T>(key: string): Observable<T | null> {
    return defer(() =>
      from(Storage.get({ key })).pipe(
        tap(() => console.log('accessing data')),
        map((data) => {
          if (data.value === null) {
            return data;
          }
          return JSON.parse(data.value);
        })
      )
    );
  }

  public remove(key: string) {
    return defer(() => from(Storage.remove({ key })));
  }

  public clear() {
    return defer(() => from(Storage.clear()));
  }
}
