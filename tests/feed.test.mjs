import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFeed } from '../src/lib/feed/parse.ts';
import { FEED_SOURCES } from '../src/lib/feed/sources.ts';
import { readFileSync } from 'node:fs';
const source = FEED_SOURCES[0];
const wrap = (items) => `<rss version="2.0"><channel>${items}</channel></rss>`;
const item = (extra = {}) => `<item><title>${extra.title || 'Original &amp; unchanged'}</title><description>${extra.excerpt || 'An original excerpt.'}</description><link>${extra.url || source.url + '/one'}</link><pubDate>${extra.date || 'Mon, 21 Sep 2026 00:00:00 GMT'}</pubDate>${extra.author ? `<dc:creator>${extra.author}</dc:creator>` : ''}</item>`;

test('preserves source words, optional byline, date and canonical permalink', () => {
  const [post] = parseFeed(wrap(item({ author: 'The original author' })), source);
  assert.equal(post.title, 'Original & unchanged');
  assert.equal(post.excerpt, 'An original excerpt.');
  assert.equal(post.author, 'The original author');
  assert.equal(post.url, source.url + '/one');
  assert.equal(post.publishedAt, '2026-09-21T00:00:00.000Z');
  assert.equal(parseFeed(wrap(item()), source)[0].author, undefined);
});

test('only links to valid source articles and deduplicates', () => {
  const bad = ['javascript:alert(1)', 'https://evil.example/blog/story', source.url + '/one?ref=olc', source.url + '/one#top', 'http://' + source.host + '/blog/one', 'https://user@' + source.host + '/blog/one', 'https://' + source.host + '/about'];
  const posts = parseFeed(wrap(item() + item() + bad.map((url) => item({ url })).join('') + item({ date: 'invalid' })), source);
  assert.equal(posts.length, 1);
});

test('orders publication dates and strips markup without injecting source HTML', () => {
  const posts = parseFeed(wrap(item({ date: 'Tue, 22 Sep 2026 00:00:00 GMT', url: source.url + '/two', excerpt: '<![CDATA[<script>bad()</script>A <strong>good</strong> note.]]>' }) + item()), source);
  assert.equal(posts[0].excerpt, 'A good note.');
  assert.equal(posts[0].url, source.url + '/two');
});

test('rejects malformed, empty, oversized and entity-expanding feeds', () => {
  for (const xml of ['<rss>', wrap(''), '<!DOCTYPE rss [<!ENTITY x "bad">]>' + wrap(item()), ' '.repeat(2_000_001)]) assert.throws(() => parseFeed(xml, source));
});

test('all saved entries retain distinct HTTPS source permalinks, dates and unassigned bylines', () => {
  const snapshot = JSON.parse(readFileSync(new URL('../src/lib/feed/snapshot.json', import.meta.url)));
  assert.equal(new Set(snapshot.posts.map((post) => post.sourceId)).size, 3);
  assert.equal(new Set(snapshot.posts.map((post) => post.url)).size, snapshot.posts.length);
  for (const post of snapshot.posts) {
    const publisher = FEED_SOURCES.find((s) => s.id === post.sourceId);
    const url = new URL(post.url);
    assert.equal(url.hostname, publisher.host);
    assert.equal(url.protocol, 'https:');
    assert.ok(url.pathname.startsWith(publisher.articlePath));
    assert.ok(Number.isFinite(Date.parse(post.publishedAt)));
    assert.equal(post.author, undefined);
  }
});

test('full reader preserves attribution, source references and text while removing executable markup', async () => {
  const { parseArticle } = await import('../src/lib/feed/article.ts');
  const post = {title:'Original & unchanged',excerpt:'Original excerpt',url:source.url+'/one',publishedAt:'2026-09-21T00:00:00.000Z',sourceId:source.id};
  const body = '<p>'+ 'Original words. '.repeat(20) + '</p><p>More original words.</p><a href="/blog/two" onclick="bad()">Source reference</a><script>bad()</script><img src="/image.jpg" onerror="bad()">';
  const doc = `<link rel="canonical" href="${post.url}"><main><article><h1>Original &amp; unchanged</h1><div class="prose-post">${body}</div></article></main><script type="application/ld+json">${JSON.stringify({'@type':'BlogPosting',author:{'@type':'Person',name:'Source Author'},publisher:{'@type':'Organization',name:'Original Publisher',url:'https://'+source.host}})}</script>`;
  const article = parseArticle(doc, post, source);
  assert.equal(article.author.name, 'Source Author');assert.equal(article.publisher.name, 'Original Publisher');assert.equal(article.canonical,post.url);
  assert.ok(article.html.includes(source.url+'/two'));assert.ok(article.html.includes('Original words. '.repeat(20)));assert.ok(!/onclick|onerror|<script/.test(article.html));
  assert.throws(()=>parseArticle(doc.replace(post.url,'https://evil.example/wrong'),post,source));
  assert.throws(()=>parseArticle(doc.replace('class="prose-post"','class="changed"'),post,source));
});

test('organization bylines resolve from the source graph without inventing an author', async () => {
  const {parseArticle} = await import('../src/lib/feed/article.ts');
  const publication = FEED_SOURCES[2];const url=publication.url+'/one';
  const post={title:'An OLB story',excerpt:'Words',url,publishedAt:'2026-09-21T00:00:00.000Z',sourceId:publication.id};
  const content='<p>'+ 'Original paragraph. '.repeat(20) + '</p><p>Another paragraph.</p>';
  const data={'@graph':[{'@id':'https://ourlittlebook.com/#organization','@type':'Organization',name:'Our Little Book',url:'https://ourlittlebook.com'},{'@type':'BlogPosting',author:{'@id':'https://ourlittlebook.com/#organization'},publisher:{'@id':'https://ourlittlebook.com/#organization'}}]};
  const doc=`<link rel="canonical" href="${url}"><main><article><section><h1>An OLB story</h1></section><section></section><section><div>${content}</div></section></article></main><script type="application/ld+json">${JSON.stringify(data)}</script>`;
  const parsed=parseArticle(doc,post,publication);assert.equal(parsed.author.type,'Organization');assert.equal(parsed.author.name,'Our Little Book');
  assert.equal(parseArticle(doc.replace(JSON.stringify(data),'{}'),post,publication).author,undefined);
});
