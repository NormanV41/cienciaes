import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MethodsService } from '../../services/methods.service';
import {
  CienciaesFeedItem,
  CienciaesFeed,
  ItemImage
} from '../models/cienciaes-feed';
import { Feed } from '../url';

const methods = new MethodsService();

export function feedParser(feed: Feed) {
  return (old$: Observable<string>) => {
    return old$.pipe(
      map((data) => {
        const domParser = new window.DOMParser().parseFromString(
          data,
          'text/xml'
        );
        const items = Array.from(domParser.querySelectorAll('item'));

        const cienciaesFeedItems = items.map<CienciaesFeedItem>((el, index) =>
          parseItem(el, domParser, feed, index)
        );

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
          id: feed,
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

function modifyTitle() {
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

function parseItem(
  el: Element,
  domParser: Document,
  feed: Feed,
  index: number
): CienciaesFeedItem {
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
    id: `${feed}-${index}`,
    url: itemUrl,
    type: methods.parseMimeType(itemType),
    title: itemTitle.innerHTML,
    description: parseItemDescription(itemDescription.innerHTML),
    link: itemLink.innerHTML,
    pubDate: methods.parseDate(itemPubDate.innerHTML)
  };
}

function parseItemDescription(
  description: string
): { img: ItemImage; paragraph: string } {
  let url = '';
  let imageClass = '';
  let alt = '';
  let paragraph = '';
  matchWrapper(description, /(?<=<img src=").+(?=" clas)/g, (match) => {
    url = match[0];
  });
  matchWrapper(description, /(?<=<img .+class=").+(?=" alt=)/g, (match) => {
    imageClass = match[0];
  });
  matchWrapper(
    description,
    /(?<=<img .+alt=").+(?=" ?\/>)/g,
    (match) => {
      alt = match[0];
    },
    () => {
      if (!/ alt=""/g.test(description)) {
        console.log(description);
        throw new Error('not handled');
      }
    }
  );
  paragraph = description.replace(/<!\[.+\/>/g, '').replace(/\]\]>/g, '');
  if (!/<p>/g.test(paragraph)) {
    paragraph = '<p>' + paragraph + '</p>';
  }
  return { img: { url, class: imageClass, alt }, paragraph };
}

function matchWrapper(
  s: string,
  pattern: RegExp,
  action: (match: RegExpMatchArray) => void,
  noMatchHandler?: () => void
) {
  const match = s.match(pattern);
  if (!match && noMatchHandler) {
    noMatchHandler();
    return;
  }

  if (!match) {
    console.log(s);
    console.log(pattern);
    throw new Error('no match');
  }

  action(match);
}
