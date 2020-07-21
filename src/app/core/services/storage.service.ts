import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  public set<T>(key: string, value: T) {
    return from(Storage.set({ key, value: JSON.stringify(value) }).then());
  }

  public get<T>(key: string): Observable<T> {
    return from(Storage.get({ key })).pipe(
      map((data) => JSON.parse(data.value))
    );
  }

  public remove(key: string) {
    return from(Storage.remove({ key }));
  }

  public clear() {
    return from(Storage.clear());
  }
}
