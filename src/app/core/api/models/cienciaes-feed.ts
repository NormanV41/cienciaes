import { Moment } from 'moment-timezone';
import { Feed } from '../url';

export interface CienciaesFeed {
  id: Feed;
  title: string;
  link: string;
  description: string;
  copyright: string;
  image: { url: string; title: string; link: string };
  pubDate: Moment;
  lastBuildDate: Moment;
  items: Array<CienciaesFeedItem>;
}

export interface CienciaesFeedItem {
  id: string;
  url: string;
  type: MIMEType;
  title: string;
  link: string;
  description: { img: ItemImage; paragraph: string };
  pubDate: Moment;
  subtitle?: string;
}

export enum MIMEType {
  audio = 'audio/mp3'
}

export interface ItemImage {
  url: string;
  class: string;
  alt: string;
}
