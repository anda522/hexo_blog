/**
 * 给 `wordcount` / `min2read` / `totalcount` 三个 helper 加结果缓存。
 *
 * 原因：原版 hexo-wordcount 没有任何缓存，而主题在
 *   - themes/matery/layout/_partial/footer.ejs     -> totalcount(site)  遍历全部文章
 *   - themes/matery/layout/_partial/post-detail.ejs -> wordcount / min2read
 * 中调用它们。渲染 N 个页面就会触发 N 次「全站文章 stripHTML + 正则扫描」，
 * 复杂度 O(页面数 × 文章数)，本站约 330 × 100 = 3 万次，实测占用 15s 左右。
 *
 * 文章 content 在一次构建内是稳定的，因此按 content 缓存即可，结果与原版完全一致。
 */
const { stripHTML } = require('hexo-util');

const cache = new Map();

function count(content) {
  const cached = cache.get(content);
  if (cached !== undefined) return cached;

  const text = stripHTML(content);
  const cn = (text.match(/[\u4E00-\u9FA5]/g) || []).length;
  const en = (text
    .replace(/[\u4E00-\u9FA5]/g, '')
    .match(/[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g) || [])
    .length;

  const ret = [cn, en];
  cache.set(content, ret);
  return ret;
}

function format(total) {
  return total < 1000 ? total : Math.round(total / 100) / 10 + 'k';
}

hexo.extend.helper.register('wordcount', function (content) {
  const len = count(content);
  return format(len[0] + len[1]);
});

hexo.extend.helper.register('min2read', function (content, { cn = 300, en = 160 } = {}) {
  const len = count(content);
  const readingTime = len[0] / cn + len[1] / en;
  return readingTime < 1 ? '1' : parseInt(readingTime, 10);
});

hexo.extend.helper.register('totalcount', function (site) {
  let cn = 0;
  let en = 0;
  site.posts.forEach(function (post) {
    const len = count(post.content);
    cn += len[0];
    en += len[1];
  });
  return format(cn + en);
});
