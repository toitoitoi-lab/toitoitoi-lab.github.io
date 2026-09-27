// 「教科と学び方」：教科ごとの学習支援アプリと、学び方のコツ。
// ready: false のものには「準備中」が付く。中身を書いたら ready: true にする。
import type { Stage } from './site';

export type Kyoka = {
  slug: string;
  glyph: string; // タイルに大きく出す1文字（読み上げでは読まない）
  stage: Stage;
  ready: boolean;
  ja: { title: string; text: string };
  // local：日本での呼び名、note：日本での学びの系統（英語版だけに出す。海外の読者向けの補足）
  en: { title: string; text: string; glyph?: string; local?: string; note?: string };
};

// 英語版「教科から探す」の冒頭に出す、日本の教科の組み立ての説明
export const KYOKA_SYSTEM_EN = [
  'Subjects in Japanese schools do not always match those in other countries. For each one below, a short note shows what it is called in Japan and how it continues from elementary school (grades 1–6) through junior high (grades 7–9) and senior high school (grades 10–12).',
  'In special needs schools, subjects can be taught in combined forms, and there is an additional area called jiritsu katsudō ("activities for independence"), which works on health, movement, communication and daily living, based on each learner\'s needs. Many of the tools on this site are also used there.',
];

export const KYOKA: Kyoka[] = [
  { slug: 'kokugo', glyph: '国', stage: 'violet', ready: false,
    ja: { title: '国語', text: '読む・書く・話す・聞くを助けるアプリ' },
    en: { title: 'Japanese language', local: 'kokugo', text: 'Reading, writing, speaking and listening in Japanese', glyph: 'あ',
      note: 'Kokugo means "national language". It is the first-language subject, taught from grade 1 to the end of high school: reading, writing, speaking, listening, and later classical Japanese and Chinese texts. Learning kanji is a large part of it: about 1,000 in elementary school, and about 2,100 everyday kanji by the end of high school.' } },
  { slug: 'sansu', glyph: '数', stage: 'sky', ready: false,
    ja: { title: '算数・数学', text: '数や形を、目と手で確かめるアプリ' },
    en: { title: 'Mathematics', local: 'sansū → sūgaku', text: 'See and touch numbers and shapes', glyph: '＋',
      note: 'In elementary school the subject is called sansū ("arithmetic"). From junior high school it becomes sūgaku ("mathematics"). This site treats them as one continuous line of learning.' } },
  { slug: 'eigo', glyph: 'A', stage: 'coral', ready: false,
    ja: { title: '外国語（英語）', text: '音から入る・声で練習するアプリ' },
    en: { title: 'Foreign language (English)', local: 'gaikokugo', text: 'Start from sounds and practise aloud',
      note: 'English is learned as a foreign language rather than a second language, since it is rarely used outside the classroom. It starts as "foreign language activities" (listening and speaking) in grades 3–4, becomes the subject "foreign language" in grades 5–6, and continues as English in junior and senior high school. For children whose first language is not Japanese, schools teach Japanese as a second language separately.' } },
  { slug: 'rika', glyph: '理', stage: 'sky', ready: false,
    ja: { title: '理科', text: '観察・記録・シミュレーションのアプリ' },
    en: { title: 'Science', local: 'rika', text: 'Observe, record and simulate', glyph: '⚗',
      note: 'Science (rika) starts in grade 3. In grades 1–2, science and social studies are taught together as seikatsu ("life environment studies"). In senior high school it divides into physics, chemistry, biology and earth science.' } },
  { slug: 'shakai', glyph: '社', stage: 'coral', ready: false,
    ja: { title: '社会', text: '地図・年表・資料を見やすくするアプリ' },
    en: { title: 'Social studies', local: 'shakai', text: 'Maps, timelines and sources made easier', glyph: '⌖',
      note: 'Social studies (shakai) also starts in grade 3, after seikatsu in grades 1–2. In junior high school it has three strands: geography, history and civics. In senior high school these become separate subject areas: geography and history (chiri-rekishi) and civics (kōmin).' } },
  { slug: 'joho', glyph: '情', stage: 'violet', ready: false,
    ja: { title: '情報', text: 'プログラミングと情報の使い方を学ぶアプリ' },
    en: { title: 'Informatics', local: 'jōhō', text: 'Programming, data and using information well', glyph: '</>',
      note: 'Jōhō ("information") is a required senior high school subject: Informatics I has been compulsory since 2022, and it has been part of the national university entrance test since 2025. Before that, programming is learned inside other subjects in elementary school, and in the technology part of "technology and home economics" in junior high school.' } },
];

export type Kotsu = {
  slug: string;
  tag: { ja: string; en: string };
  ready: boolean;
  ja: { title: string; text: string };
  en: { title: string; text: string };
};

// 学び方のコツ（学びやすくなる、ちょっとした知識）
export const KOTSU: Kotsu[] = [
  { slug: 'omoidasu', ready: false, tag: { ja: '覚える', en: 'Remember' },
    ja: { title: '覚えるときは、読み返すより「思い出す」', text: '見ないで思い出してみる練習が、記憶を強くします。' },
    en: { title: 'Recall beats rereading', text: 'Trying to remember without looking makes memories stronger.' } },
  { slug: 'aidawo', ready: false, tag: { ja: '覚える', en: 'Remember' },
    ja: { title: '復習は、間をあけてくり返す', text: '一度にまとめるより、日をあけて何度か。忘れかけたころがちょうどいい。' },
    en: { title: 'Space out your review', text: 'A little, several times, with gaps in between.' } },
  { slug: 'kugiru', ready: false, tag: { ja: '集中する', en: 'Focus' },
    ja: { title: '時間を区切って、終わりを見せる', text: 'タイマーで「ここまで」が見えると、取りかかりやすくなります。' },
    en: { title: 'Show when it ends', text: 'A visible timer makes it easier to start.' } },
  { slug: 'mimide', ready: false, tag: { ja: '読む・聞く', en: 'Read & listen' },
    ja: { title: '耳でも学べる', text: '読み上げで聞いてから読むと、内容が入りやすいことがあります。' },
    en: { title: 'You can learn by ear', text: 'Listening first can make reading easier.' } },
  { slug: 'etokotoba', ready: false, tag: { ja: 'まとめる', en: 'Organise' },
    ja: { title: '絵とことばを、セットにする', text: '図や写真をそえると、思い出す手がかりが増えます。' },
    en: { title: 'Pair pictures with words', text: 'Images give you more ways back to the idea.' } },
  { slug: 'setsumei', ready: false, tag: { ja: 'たしかめる', en: 'Check' },
    ja: { title: '人に説明してみる', text: '説明しようとすると、分かっていないところが見えてきます。' },
    en: { title: 'Explain it to someone', text: 'Explaining shows you what you have not understood yet.' } },
];
