import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MethodsService } from '../../services/methods.service';
import { CienciaesFeedItem, CienciaesFeed } from '../models/cienciaes-feed';

const methods = new MethodsService();

export function feedParser() {
  return (old$: Observable<string>) => {
    return old$.pipe(
      map((data) => {
        const domParser = new window.DOMParser().parseFromString(
          data,
          'text/xml'
        );
        const items = Array.from(domParser.querySelectorAll('item'));

        const cienciaesFeedItems = items.map<CienciaesFeedItem>((el) => {
          const enclosure = domParser.querySelector('enclosure');
          return {
            url: enclosure.getAttribute('url'),
            type: methods.parseMimeType(enclosure.getAttribute('type')),
            title: el.querySelector('title').innerHTML,
            description: el.querySelector('description').innerHTML,
            link: el.querySelector('link').innerHTML,
            pubDate: methods.parseDate(el.querySelector('pubDate').innerHTML)
          };
        });

        const result: CienciaesFeed = {
          ttile: domParser.querySelector('title').innerHTML,
          link: domParser.querySelector('link').innerHTML,
          description: domParser.querySelector('description').innerHTML,
          copyright: domParser.querySelector('copyright').innerHTML,
          image: {
            url: domParser.querySelector('image url').innerHTML,
            link: domParser.querySelector('image link').innerHTML,
            title: domParser.querySelector('image title').innerHTML
          },
          items: cienciaesFeedItems,
          pubDate: methods.parseDate(
            domParser.querySelector('pubDate').innerHTML
          ),
          lastBuildDate: methods.parseDate(
            domParser.querySelector('lastBuildDate').innerHTML
          )
        };
        return result;
      }),
      tap((data) => console.log(data))
    );
  };
}
