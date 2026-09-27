// サイト全体のデータ。ページを増やすときは、ここに足すと
// ナビゲーション・サイトマップ・カードに自動で反映される。

export const SITE = {
  name: 'toi toi toi',
  url: 'https://toitoitoi-lab.github.io',
};

export const LINKS = {
  youtube: 'https://www.youtube.com/@toitoitoi-lab',
  note: 'https://note.com/malu_malu',
  github: 'https://github.com/toitoitoi-lab',
};

// イラストの部品。k: 'f' = 塗り, 's' = 線。c は色の名前（CSSで配色ごとに切り替わる）。
export type Shape = { k: 'f' | 's'; c: string; d: string; w?: number };
export type Stage = 'violet' | 'sky' | 'coral';

const circ = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0`;
const F = (d: string, c: string): Shape => ({ k: 'f', c, d });
const S = (d: string, c: string, w: number): Shape => ({ k: 's', c, d, w });

const EAR =
  'M40 38 C40 22 52 12 64 12 C78 12 86 24 86 36 C86 48 76 50 74 56 C72 62 68 66 62 64 M52 38 C52 30 58 26 64 26 C70 26 74 32 72 38 C70 44 64 44 64 50';
const WAV = 'M94 24 Q100 34 94 44 M102 16 Q112 34 102 52';

export type Komari = {
  slug: string;
  ready: boolean;
  stage: Stage;
  ja: { title: string; examples: string };
  en: { title: string; examples: string };
  shapes: Shape[];
};

export const KOMARI: Komari[] = [
  {
    slug: 'yomu', ready: false, stage: 'violet',
    ja: { title: '読む', examples: '読み上げ・拡大・ルビ・点字' },
    en: { title: 'Reading', examples: 'Text-to-speech, zoom, ruby, braille' },
    shapes: [
      F('M6 98 Q34 88 60 106 Q86 88 114 98 V106 Q86 96 60 114 Q34 96 6 106 Z', 'violet'),
      F('M12 40 Q35 32 58 42 V100 Q35 90 12 98 Z M62 42 Q85 32 108 40 V98 Q85 90 62 100 Z', 'cream'),
      S('M22 56 H48 M22 68 H48 M22 80 H42 M72 56 H98 M72 68 H98', 'ink', 4),
      S('M46 24 Q60 12 74 24 M38 14 Q60 -4 82 14', 'lime', 6),
    ],
  },
  {
    slug: 'kaku', ready: false, stage: 'sky',
    ja: { title: '書く', examples: '音声入力・予測変換・写真で記録' },
    en: { title: 'Writing', examples: 'Voice input, word prediction, photo notes' },
    shapes: [
      F('M40 16 H104 Q110 16 110 22 V96 Q110 102 104 102 H40 Q34 102 34 96 V22 Q34 16 40 16 Z', 'sky'),
      F('M44 26 H100 V92 H44 Z', 'cream'),
      S('M52 40 H92 M52 52 H92 M52 64 H76', 'ink', 4),
      F('M10 54 a10 10 0 0 1 20 0 V72 a10 10 0 0 1 -20 0 Z', 'coral'),
      S('M6 72 a14 14 0 0 0 28 0 M20 86 V98 M12 98 H28', 'line', 4),
    ],
  },
  {
    slug: 'kiku', ready: false, stage: 'coral',
    ja: { title: '聞く・見る', examples: '字幕・文字起こし・視覚支援' },
    en: { title: 'Listening & seeing', examples: 'Captions, transcription, visual supports' },
    shapes: [
      F('M10 72 H110 V106 H10 Z', 'cream'),
      S(EAR, 'coral', 7),
      S('M22 84 H98 M22 95 H74', 'ink', 4),
      S(WAV, 'lime', 6),
    ],
  },
  {
    slug: 'tsutaeru', ready: false, stage: 'violet',
    ja: { title: '伝える', examples: 'AAC・VOCA・絵カード' },
    en: { title: 'Communicating', examples: 'AAC, VOCA, picture cards' },
    shapes: [
      F('M10 14 H74 V58 H34 L22 70 V58 H10 Z', 'violet'),
      F('M48 62 H110 V98 H98 V110 L86 98 H48 Z', 'lime'),
      S('M30 42 Q42 52 54 42 M32 30 H34 M50 30 H52 M66 80 H68 M79 80 H81 M92 80 H94', 'ink', 5),
    ],
  },
  {
    slug: 'sousa', ready: false, stage: 'coral',
    ja: { title: '操作する', examples: 'スイッチ・視線入力・設定' },
    en: { title: 'Operating', examples: 'Switches, eye gaze, device settings' },
    shapes: [
      F('M16 74 H104 V100 H16 Z', 'cream'),
      F('M30 74 Q30 40 60 40 Q90 40 90 74 Z', 'coral'),
      S('M104 88 C116 88 116 108 100 110 H78', 'line', 4),
      S('M60 10 V24 M36 16 L44 28 M84 16 L76 28', 'lime', 6),
    ],
  },
  {
    slug: 'mitoosu', ready: false, stage: 'sky',
    ja: { title: '見通す・整える', examples: 'スケジュール・タイマー' },
    en: { title: 'Planning & organizing', examples: 'Schedules, timers' },
    shapes: [
      F('M50 12 H108 V108 H50 Z', 'cream'),
      F(circ(30, 76, 20), 'sky'),
      S('M74 34 H98 M74 58 H98 M74 82 H98 M30 64 V76 L39 82', 'ink', 4),
      S('M57 32 L62 38 L69 28 M57 56 L62 62 L69 52', 'check', 6),
    ],
  },
];

export type Tachiba = {
  slug: string;
  ready: boolean;
  stage: Stage;
  tag: string;
  tagTone: 'accent' | 'violet';
  ja: { title: string; text: string };
  en: { title: string; text: string };
  shapes: Shape[];
};

export const TACHIBA: Tachiba[] = [
  {
    slug: 'sensei', ready: false, stage: 'sky', tag: 'teachers', tagTone: 'accent',
    ja: { title: '先生・支援者の方へ', text: 'ATを授業に取り入れる手順と支援の型' },
    en: { title: 'For teachers & supporters', text: 'How to bring AT into lessons and support' },
    shapes: [
      F('M52 18 H108 V68 H52 Z', 'cream'),
      S('M62 34 H98 M62 48 H86', 'ink', 5),
      F(circ(30, 40, 13), 'coral'),
      F('M10 104 Q10 60 30 60 Q50 60 50 104 Z', 'violet'),
      S('M44 72 L60 58', 'line', 5),
    ],
  },
  {
    slug: 'honnin', ready: false, stage: 'coral', tag: 'family', tagTone: 'violet',
    ja: { title: '本人・ご家族の方へ', text: '便利な設定を動画でいっしょに' },
    en: { title: 'For learners & families', text: 'Handy device settings, step by step on video' },
    shapes: [
      F(circ(40, 34, 14) + ' ' + circ(84, 56, 11), 'coral'),
      F('M16 106 Q16 58 40 58 Q64 58 64 106 Z', 'sky'),
      F('M66 106 Q66 74 84 74 Q102 74 102 106 Z', 'lime'),
    ],
  },
  {
    slug: 'tsukuru', ready: false, stage: 'violet', tag: 'builders', tagTone: 'accent',
    ja: { title: 'つくりたい方へ', text: '教材アプリのコードとお試し版' },
    en: { title: 'For builders', text: 'Code and demos of learning apps' },
    shapes: [
      F('M10 20 H110 V102 H10 Z', 'sky'),
      F('M16 36 H104 V96 H16 Z', 'cream'),
      S('M20 28 H22 M30 28 H32 M40 28 H42', 'ink', 5),
      S('M46 54 L34 66 L46 78 M74 54 L86 66 L74 78 M65 50 L55 82', 'code', 6),
    ],
  },
];

// サイトマップ（日本語）。ready: false のページには「準備中」が付く。
export type MapLink = { label: string; href: string; ready: boolean; external?: boolean };
export const SITEMAP_JA: { heading: string; links: MapLink[] }[] = [
  {
    heading: 'サイト全体',
    links: [
      { label: 'トップページ', href: '/', ready: true },
      { label: 'このサイトについて', href: '/about/', ready: true },
      { label: '利用ルール', href: '/rules/', ready: false },
      { label: 'お問い合わせ', href: '/contact/', ready: false },
      { label: '英語版（English）', href: '/en/', ready: true },
    ],
  },
  {
    heading: '困りごとから探す',
    links: KOMARI.map((k) => ({ label: k.ja.title, href: `/komari/${k.slug}/`, ready: k.ready })),
  },
  {
    heading: '立場から探す',
    links: TACHIBA.map((t) => ({ label: t.ja.title, href: `/tachiba/${t.slug}/`, ready: t.ready })),
  },
  {
    heading: '発信',
    links: [
      { label: '記事一覧', href: '/articles/', ready: true },
      { label: '研修・講演について', href: '/talks/', ready: false },
      { label: 'YouTube（外部サイト）', href: LINKS.youtube, ready: true, external: true },
      { label: 'note（外部サイト）', href: LINKS.note, ready: true, external: true },
      { label: 'GitHub（外部サイト）', href: LINKS.github, ready: true, external: true },
    ],
  },
];
