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
          if (!enclosure) {
            throw new Error('enclosure is null');
          }
          const itemUrl = enclosure.getAttribute('url');
          const itemType = enclosure.getAttribute('type');
          const itemDescription = el.querySelector('description');
          const itemTitle = el.querySelector('title');
          const itemLink = el.querySelector('link');
          const itemPubDate = el.querySelector('pubDate');
          if (
            itemUrl === null ||
            itemType === null ||
            itemDescription === null ||
            itemTitle === null ||
            itemLink === null ||
            itemPubDate === null
          ) {
            throw new Error('something is null');
          }
          return {
            url: itemUrl,
            type: methods.parseMimeType(itemType),
            title: itemTitle.innerHTML,
            description: itemDescription.innerHTML,
            link: itemLink.innerHTML,
            pubDate: methods.parseDate(itemPubDate.innerHTML)
          };
        });

        const title = domParser.querySelector('title');
        const link = domParser.querySelector('link');
        const description = domParser.querySelector('description');
        const copyright = domParser.querySelector('copyright');
        const imageUrl = domParser.querySelector('image url');
        const imageLink = domParser.querySelector('image link');
        const imageTitle = domParser.querySelector('image title');
        const pubDate = domParser.querySelector('pubDate');
        const lastBuildDate = domParser.querySelector('lastBuildDate');
        if (
          title === null ||
          link === null ||
          description === null ||
          copyright === null ||
          imageUrl === null ||
          imageLink === null ||
          imageTitle === null ||
          pubDate === null ||
          lastBuildDate === null
        ) {
          throw new Error('something is null');
        }
        const result: CienciaesFeed = {
          title: title.innerHTML,
          link: link.innerHTML,
          description: description.innerHTML,
          copyright: copyright.innerHTML,
          image: {
            url: imageUrl.innerHTML,
            link: imageLink.innerHTML,
            title: imageTitle.innerHTML
          },
          items: cienciaesFeedItems,
          pubDate: methods.parseDate(pubDate.innerHTML),
          lastBuildDate: methods.parseDate(lastBuildDate.innerHTML)
        };
        return result;
      }),
      modifyTitle()
    );
  };
}

export function modifyTitle() {
  return (old$: Observable<CienciaesFeed>) => {
    return old$.pipe(
      map((data) => {
        if (data.title === 'Cienciaes.com') {
          data.title = 'Cienciaes';
          return data;
        }
        data.title = data.title.replace(' - Cienciaes.com', '');
        return data;
      })
    );
  };
}
