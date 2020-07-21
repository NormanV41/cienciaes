export enum Feed {
  main = 'main',
  entrevistas = 'entrevistas',
  vanguardia = 'vanguardia',
  ulises = 'ulises',
  biografias = 'biografias',
  ciencianuestra = 'ciencianuestra',
  fosiles = 'fosiles',
  seispatas = 'seispatas',
  oceanos = 'oceanos',
  quilociencia = 'quilociencia',
  extrema = 'extrema',
  neutrino = 'neutrino',
  ciertaciencia = 'ciertaciencia',
  cienciafresca = 'cienciafresca'
}

const urls = new Map<Feed, { prod: string; dev: string }>();

Object.values(Feed).forEach((el) => {
  if (el === Feed.main) {
    urls.set(Feed.main, {
      prod: 'https://cienciaes.com/feed/',
      dev: 'http://localhost:3142/feed.xml'
    });
  } else {
    urls.set(el, {
      prod: `https://cienciaes.com/feed/${el}`,
      dev: `http://localhost:3142/${el}.xml`
    });
  }
});

export default urls;
