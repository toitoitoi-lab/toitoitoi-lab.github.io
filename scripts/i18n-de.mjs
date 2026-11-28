// ドイツ語版（/de/）を、ビルドした英語版（dist/en/）から作る。
// しくみ：英語のページを読み、文（段落・見出し・ボタンなど）ごとに src/i18n/de.json の訳に置きかえて dist/de/ に書く。
//   ・訳がない文は英語のまま残し、ビルドのときに「未訳」として数を出す（node scripts/i18n-de.mjs --missing で一覧を書き出す）。
//   ・文の中のリンクや強調は <0>…</0> のような番号の印にして訳す（リンク先や見た目が変わっても訳はそのまま使える）。
//   ・リンク /en/… は /de/… に、html の lang は de に書きかえる。
//   ・全ページの言語の切りかえ（日本語・English・Deutsch）のうち、行き先のページがないものは、その言語のトップにする。
// 英語の文を変えたら、de.json の訳も足す・直す（未訳のときは英語で表示される）。
import fs from 'node:fs';
import path from 'node:path';
import { parse, serialize } from 'parse5';

const DICT_PATH = new URL('../src/i18n/de.json', import.meta.url);

const BLOCK = new Set(['address', 'article', 'aside', 'blockquote', 'body', 'details', 'dialog', 'dd', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'li', 'main', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'tbody', 'thead', 'tfoot', 'tr', 'td', 'th', 'caption', 'ul', 'summary', 'legend', 'select', 'option', 'optgroup', 'html', 'head', 'label', 'button', 'template', 'menu']);
const SKIP = new Set(['script', 'style', 'textarea', 'code', 'pre', 'noscript', 'template']);
const ATOM = new Set(['svg', 'img', 'br', 'input', 'wbr', 'hr', 'select', 'textarea', 'math', 'canvas', 'video', 'audio', 'iframe']);
const ATTRS = ['alt', 'title', 'aria-label', 'placeholder', 'aria-description', 'aria-roledescription', 'data-default'];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DE_M = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
const DE_S = ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'];
const MS = MONTHS.map((m) => m.slice(0, 3));
const MRE = `(?:${MONTHS.join('|')}|${MS.join('|')})`;
const DATE_RE = new RegExp(`\\b\\d{1,2} ${MRE}(?: \\d{4})?\\b|\\b${MRE} \\d{1,2}(?:, \\d{4})?\\b|\\b${MRE} \\d{4}\\b`, 'g');
function mi(w) { const i = MONTHS.indexOf(w); return i >= 0 ? [i, false] : [MS.indexOf(w), true]; }
function deDate(d) {
  let m;
  if ((m = d.match(/^(\d{1,2}) (\w+)(?: (\d{4}))?$/))) { const [i, sh] = mi(m[2]); return `${m[1]}. ${sh ? DE_S[i] : DE_M[i]}${m[3] ? ' ' + m[3] : ''}`; }
  if ((m = d.match(/^(\w+) (\d{1,2})(?:, (\d{4}))?$/))) { const [i, sh] = mi(m[1]); return `${m[2]}. ${sh ? DE_S[i] : DE_M[i]}${m[3] ? ' ' + m[3] : ''}`; }
  if ((m = d.match(/^(\w+) (\d{4})$/))) { const [i, sh] = mi(m[1]); return `${sh ? DE_S[i] : DE_M[i]} ${m[2]}`; }
  return d;
}
const norm = (s) => s.replace(/\s+/g, ' ').trim();
const isText = (n) => n.nodeName === '#text';
const isEl = (n) => n.tagName !== undefined;
const getAttr = (n, k) => n.attrs?.find((a) => a.name === k)?.value;
const setAttr = (n, k, v) => { const a = n.attrs.find((x) => x.name === k); if (a) a.value = v; else n.attrs.push({ name: k, value: v }); };

function hasBlock(n) {
  if (!n.childNodes) return false;
  return n.childNodes.some((c) => isEl(c) && !ATOM.has(c.tagName) && (BLOCK.has(c.tagName) || SKIP.has(c.tagName) || hasBlock(c)));
}

export function loadDict() {
  try { return JSON.parse(fs.readFileSync(DICT_PATH, 'utf8')); } catch { return {}; }
}

export function translateDir(dist, { report = true, missingOut = null } = {}) {
  const dict = loadDict();
  const missing = new Map(); // key → 最初に出たページ
  const used = new Set();
  let page = '';
  const tr = (s, word = false) => {
    const dates = [];
    const k0 = norm(s);
    // 日付は ⟦0⟧ のような印にして訳し、あとでドイツ語の書き方にもどす
    const k = k0.replace(DATE_RE, (m) => { dates.push(m); return `⟦${dates.length - 1}⟧`; });
    const r = tr1(k, word);
    if (r === null) return null;
    return r.replace(/⟦(\d+)⟧/g, (m, i) => deDate(dates[+i] || ''));
  };
  const tr1 = (k, word = false) => {
    if (!k || !/[A-Za-z]/.test(k)) return null;
    if (dict[k] !== undefined) { used.add(k); return dict[k]; }
    // 「<0>…</0>」で全体を包んだ形と、包まない形は、同じ訳を使う
    const w = k.match(/^<0>(.*)<\/0>$/);
    if (w && !/<\/?\d+\/?>/.test(w[1]) && dict[w[1]] !== undefined) { used.add(w[1]); return `<0>${dict[w[1]]}</0>`; }
    if (dict[`<0>${k}</0>`] !== undefined) { used.add(`<0>${k}</0>`); return dict[`<0>${k}</0>`].replace(/<\/?0>/g, ''); }
    if (/^(https?:|\/|#|[\w.-]+@)/.test(k) || (!word && /^[a-z0-9_-]+$/.test(k)) || /^[a-z]+:[a-z]\d+$/.test(k)) return null; // URL・記号・slug は訳さない
    if (!missing.has(k)) missing.set(k, page);
    return null;
  };

  // ひとつながりの文（テキスト＋行内の要素）を印つきの文字列にする
  function encode(nodes) {
    const elems = [];
    const walk = (list) => list.map((n) => {
      if (isText(n)) return n.value;
      if (n.nodeName === '#comment') return '';
      if (!isEl(n)) return '';
      const i = elems.length; elems.push(n);
      if (ATOM.has(n.tagName) || SKIP.has(n.tagName) || !n.childNodes?.length) return `<${i}/>`;
      return `<${i}>${walk(n.childNodes)}</${i}>`;
    }).join('');
    return { key: walk(nodes), elems };
  }
  // 訳の文字列を、元の要素を使って節点にもどす
  function decode(str, elems, parent) {
    const out = [];
    const re = /<(\d+)\/>|<(\d+)>|<\/(\d+)>/g;
    const stack = [{ children: out, idx: -1 }];
    let last = 0, m;
    const pushText = (t) => { if (t) stack[stack.length - 1].children.push({ nodeName: '#text', value: t, parentNode: null }); };
    while ((m = re.exec(str))) {
      pushText(str.slice(last, m.index)); last = re.lastIndex;
      if (m[1] !== undefined) { const e = elems[+m[1]]; if (e) stack[stack.length - 1].children.push(e); }
      else if (m[2] !== undefined) { const e = elems[+m[2]]; const node = e ? { ...e, attrs: e.attrs.map((a) => ({ ...a })), childNodes: [] } : null; stack.push({ children: node ? node.childNodes : [], node, idx: +m[2] }); }
      else { const top = stack.pop(); if (top.node) { top.node.childNodes.forEach((c) => (c.parentNode = top.node)); stack[stack.length - 1].children.push(top.node); } }
    }
    pushText(str.slice(last));
    out.forEach((c) => (c.parentNode = parent));
    return out;
  }
  function doRun(parent, run) {
    const { key, elems } = encode(run);
    const lead = key.match(/^\s*/)[0], tail = key.match(/\s*$/)[0];
    const t = tr(key);
    if (t === null) { run.forEach((n) => isEl(n) && !ATOM.has(n.tagName) && visit(n)); return run; }
    const nodes = decode(lead + t + tail, elems, parent);
    return nodes;
  }
  function visit(node) {
    if (!node.childNodes || SKIP.has(node.tagName)) return;
    if (node.tagName === 'svg') return;
    const kids = node.childNodes, out = [];
    let run = [];
    const flush = () => {
      if (!run.length) return;
      // 文として訳すのは、要素の外にじかに文字があるまとまりだけ（カードのように要素だけが並ぶときは、中を一つずつ訳す）
      const hasText = run.some((n) => isText(n) && /[A-Za-z]/.test(n.value));
      if (hasText) out.push(...doRun(node, run)); else { out.push(...run); run.forEach((n) => isEl(n) && visit(n)); }
      run = [];
    };
    for (const c of kids) {
      const inline = isText(c) || c.nodeName === '#comment' || (isEl(c) && !BLOCK.has(c.tagName) && !SKIP.has(c.tagName) && !hasBlock(c));
      if (inline) run.push(c);
      else { flush(); out.push(c); visit(c); }
    }
    flush();
    node.childNodes = out;
  }
  function textOf(n) { if (isText(n)) return n.value; if (n.tagName === 'svg' || SKIP.has(n.tagName)) return ''; return (n.childNodes || []).map(textOf).join(''); }
  function fixAttrs(node) {
    if (isEl(node)) {
      for (const k of ATTRS) { const v = getAttr(node, k); if (v) { const t = tr(v); if (t !== null) setAttr(node, k, t); } }
      if (node.tagName === 'meta') { const nm = getAttr(node, 'name') || getAttr(node, 'property'); if (/description|og:title|og:description/.test(nm || '')) { const t = tr(getAttr(node, 'content') || ''); if (t !== null) setAttr(node, 'content', t); } }
      if (node.tagName === 'input' && /radio|checkbox/.test(getAttr(node, 'type') || '')) { const v = getAttr(node, 'value'); if (v && /[A-Z\s]/.test(v) && dict[norm(v)] !== undefined) /* yes・no などの小文字の符号は変えない */ setAttr(node, 'value', dict[norm(v)]); }
      if (node.tagName === 'html') setAttr(node, 'lang', 'de');
      const sw = getAttr(node, 'data-langsw');
      if (sw) { // 言語の切りかえは、リンク先を変えず、「いまの言語」の印だけつけかえる
        node.attrs = node.attrs.filter((a) => a.name !== 'aria-current');
        if (sw === 'de') node.attrs.push({ name: 'aria-current', value: 'page' });
      }
      if (node.tagName === 'link' && getAttr(node, 'rel') === 'alternate') { /* hreflang はそのまま */ }
      else for (const a of node.attrs || []) {
        if (!sw && (a.name === 'href' || a.name === 'action') && /^\/en(\/|$)/.test(a.value)) a.value = a.value.replace(/^\/en/, '/de');
        if (a.name === 'data-lang' && a.value === 'en') a.value = 'de';
        if (a.name.startsWith('data-') && a.value.startsWith('{')) { a.value = jsonTr(a.value); }
        else if (a.name.startsWith('data-') && !['data-langsw', 'data-default', 'data-for'].includes(a.name) && (/[A-Z]/.test(a.value) || /^\d+ /.test(a.value))) { const t = tr(a.value); if (t !== null) a.value = t; } // ボタンの切りかえ文字など
      }
      if (node.tagName === 'link' && getAttr(node, 'rel') === 'canonical') setAttr(node, 'href', (getAttr(node, 'href') || '').replace('/en/', '/de/'));
      if (node.tagName === 'title') { const t = tr(textOf(node)); if (t !== null) node.childNodes = [{ nodeName: '#text', value: t, parentNode: node }]; }
      if (node.tagName === 'script') {
        const typ = getAttr(node, 'type') || '';
        const txt = node.childNodes?.[0];
        if (txt && isText(txt)) {
          if (typ === 'application/json' || typ === 'application/ld+json') txt.value = jsonTr(txt.value);
          else if (!getAttr(node, 'src')) txt.value = jsTr(txt.value);
        }
      }
    }
    (node.childNodes || []).forEach(fixAttrs);
    if (node.content) fixAttrs(node.content);
  }
  // JSON の中の文字列を訳す（リンクも /de/ に）
  function jsonTr(raw) {
    let data; try { data = JSON.parse(raw); } catch { return raw; }
    const KEEP = new Set(['id', 'slug', 'kind', 'page', 'role', 'mode', 'sit', 'lang', 'v', 'key', 'icon', 'date', 'type', 'for', 'hay']);
    const walk = (v, key = '') => {
      if (typeof v === 'string') {
        if (/^(https:\/\/toitoitoi-lab\.github\.io)?\/en(\/|$)/.test(v)) return v.replace('/en', '/de');
        if (key === 'hay' || (KEEP.has(key) && !/\s/.test(v))) return v;
        // 検索のキーワード（kws・keywords）は、1語の小文字でも訳す（ドイツ語で検索できるように）
        const t = (key === 'kws' || key === 'keywords') ? tr(v, true) : tr(v); return t === null ? v : t;
      }
      if (Array.isArray(v)) return v.map((x) => walk(x, key));
      if (v && typeof v === 'object') {
        const o = Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x, k)]));
        // 検索用の hay は、訳した見出し・キーワードなどからつくり直す（英語の hay は訳さない）
        if (typeof o.hay === 'string') o.hay = [o.title, o.summary, o.pageTitle, ...(o.kws || []), ...(o.keywords || [])].filter((x) => typeof x === 'string').join(' ');
        return o;
      }
      return v;
    };
    return JSON.stringify(walk(data)).replace(/</g, '\\u003c');
  }
  // スクリプトの中の文字列（'…' や "…"）のうち、辞書にあるものだけ訳す
  function jsTr(code) {
    return code.replace(/(['"])((?:\\.|(?!\1)[^\\\n])*)\1/g, (all, q, body) => {
      if (/^\/en(\/|$)/.test(body)) return q + body.replace(/^\/en/, '/de') + q;
      if (body === 'en-GB' || body === 'en-US') return q + 'de-DE' + q;
      if (body.length < 2 || !/[A-Za-z]{2}/.test(body) || !/\s/.test(body) && !/^[A-Z]/.test(body)) return all;
      if (body === 'en-GB' || body === 'en-US') return q + 'de-DE' + q;
      const k = norm(body.replace(/\\(['"\\])/g, '$1'));
      if (dict[k] === undefined) return all;
      used.add(k);
      const lead = body.match(/^\s*/)[0], tail = body.match(/\s*$/)[0];
      return q + lead + dict[k].replace(/\\/g, '\\\\').replace(new RegExp(q, 'g'), '\\' + q) + tail + q;
    });
  }

  const enDir = path.join(dist, 'en'), deDir = path.join(dist, 'de');
  const files = [];
  const list = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => { const p = path.join(d, e.name); if (e.isDirectory()) list(p); else if (e.name.endsWith('.html')) files.push(p); });
  list(enDir);
  for (const f of files) {
    page = '/' + path.relative(dist, f).replace(/index\.html$/, '');
    const doc = parse(fs.readFileSync(f, 'utf8'));
    const html = doc.childNodes.find((n) => n.tagName === 'html');
    const head = html.childNodes.find((n) => n.tagName === 'head');
    const body = html.childNodes.find((n) => n.tagName === 'body');
    visit(body);
    fixAttrs(head); fixAttrs(body); setAttr(html, 'lang', 'de');
    const out = path.join(deDir, path.relative(enDir, f));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, serialize(doc));
  }
  fixSwitchers(dist);
  if (report) console.log(`[de] ${files.length} pages, translated ${used.size}, missing ${missing.size}`);
  if (missingOut) {
    const obj = {}; for (const [k, p] of missing) obj[k] = p;
    fs.writeFileSync(missingOut, JSON.stringify(obj, null, 1));
  }
  return { missing, used };
}

// 言語の切りかえ：行き先のページがなければ、その言語のトップへ
function fixSwitchers(dist) {
  const all = [];
  const list = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => { const p = path.join(d, e.name); if (e.isDirectory()) list(p); else if (e.name.endsWith('.html')) all.push(p); });
  list(dist);
  const exists = (href) => { const p = href.split('#')[0]; return fs.existsSync(path.join(dist, p, 'index.html')) || fs.existsSync(path.join(dist, p)); };
  for (const f of all) {
    let s = fs.readFileSync(f, 'utf8');
    const t = s.replace(/<a([^>]*?)data-langsw="(ja|en|de)"([^>]*?)href="([^"]*)"/g, (m, a, l, b, href) => {
      if (exists(href)) return m;
      return `<a${a}data-langsw="${l}"${b}href="${l === 'ja' ? '/' : '/' + l + '/'}"`;
    }).replace(/<a([^>]*?)href="([^"]*)"([^>]*?)data-langsw="(ja|en|de)"/g, (m, a, href, b, l) => {
      if (exists(href)) return m;
      return `<a${a}href="${l === 'ja' ? '/' : '/' + l + '/'}"${b}data-langsw="${l}"`;
    });
    // hreflang の別言語の案内も、ないページを指しているものは消す
    const t2 = t.replace(/<link rel="alternate" hreflang="(ja|en|de)" href="https:\/\/toitoitoi-lab\.github\.io([^"]*)">/g, (m, l, p) => (exists(p) ? m : ''));
    if (t2 !== s) fs.writeFileSync(f, t2);
  }
}

// Astro の連携：ビルドの最後に /de/ を作る
export default function i18nDe() {
  return {
    name: 'i18n-de',
    hooks: {
      'astro:build:done': ({ dir }) => { translateDir(new URL(dir).pathname); },
    },
  };
}

// 単体で動かす：node scripts/i18n-de.mjs --missing（dist から未訳の一覧を i18n-missing.json に書き出す）
if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1])) && process.argv.includes('--missing')) {
  translateDir('dist', { missingOut: 'i18n-missing.json' });
}
