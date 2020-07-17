export enum Feed {
  main,
}

const urls = new Map<Feed, { prod: string; dev: string }>();

urls.set(Feed.main, {
  prod: 'https://cienciaes.com/feed/',
  dev: 'http://localhost:3142/feed.xml',
});

export default urls;
