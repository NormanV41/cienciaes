import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private _player = new Howl({ src: '', html5: true });
  public constructor() {}

  public create(src: string) {
    this._player = new Howl({ src, html5: true });
    this._player.once('load', () => {
      console.log('loaded');
    });
  }

  public play() {
    this._player.play();
  }

  public pause() {
    this._player.pause();
  }
}
