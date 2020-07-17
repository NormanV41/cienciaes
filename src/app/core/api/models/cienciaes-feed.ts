import { Moment } from 'moment-timezone';

export interface CienciaesFeed {
  ttile: string;
  link: string;
  description: string;
  copyright: string;
  image: { url: string; title: string; link: string };
  pubDate: Moment;
  lastBuildDate: Moment;
  items: Array<CienciaesFeedItem>;
}

export interface CienciaesFeedItem {
  url: string;
  type: MIMEType;
  title: string;
  link: string;
  description: string;
  pubDate: Moment;
}

export enum MIMEType {
  audo = 'audo/mp3',
}
