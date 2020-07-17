import { Injectable } from '@angular/core';
import { tz } from 'moment-timezone';
import { MIMEType } from '../api/models/cienciaes-feed';

@Injectable({
  providedIn: 'root'
})
export class MethodsService {
  constructor() {}

  public parseDate(date: string) {
    return tz(date, 'ddd, DD MMM YYYY HH:mm:ss zz', 'America/Costa_Rica');
  }

  public parseMimeType(type: string) {
    if (type === 'audio/mp3') {
      return MIMEType.audo;
    }
    throw new Error('mime type not handled yet');
  }
}
