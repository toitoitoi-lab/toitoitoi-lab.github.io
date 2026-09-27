// 「教科と学び方」：教科ごとの学習支援アプリと、学び方のコツ。
// ready: false のものには「準備中」が付く。中身を書いたら ready: true にする。
import type { Stage } from './site';

export type Kyoka = {
  slug: string;
  glyph: string; // タイルに大きく出す1文字（読み上げでは読まない）
  stage: Stage;
  ready: boolean;
  ja: { title: string; text: string };
  en: { title: string; text: string; glyph?: string };
};

export const KYOKA: Kyoka[] = [
  { slug: 'kokugo', glyph: '国', stage: 'violet', ready: false,
    ja: { title: '国語', text: '読む・書く・話す・聞くを助けるアプリ' },
    en: { title: 'Japanese', text: 'Apps for reading, writing, speaking and listening', glyph: 'あ' } },
  { slug: 'sansu', glyph: '数', stage: 'sky', ready: false,
    ja: { title: '算数・数学', text: '数や形を、目と手で確かめるアプリ' },
    en: { title: 'Mathematics', text: 'See and touch numbers and shapes', glyph: '＋' } },
  { slug: 'eigo', glyph: 'A', stage: 'coral', ready: false,
    ja: { title: '英語', text: '音から入る・声で練習するアプリ' },
    en: { title: 'English', text: 'Start from sounds and practise aloud' } },
  { slug: 'rika', glyph: '理', stage: 'sky', ready: false,
    ja: { title: '理科', text: '観察・記録・シミュレーションのアプリ' },
    en: { title: 'Science', text: 'Observe, record and simulate', glyph: '⚗' } },
  { slug: 'shakai', glyph: '社', stage: 'coral', ready: false,
    ja: { title: '社会', text: '地図・年表・資料を見やすくするアプリ' },
    en: { title: 'Social studies', text: 'Maps, timelines and sources made easier', glyph: '⌖' } },
  { slug: 'joho', glyph: '情', stage: 'violet', ready: false,
    ja: { title: '情報', text: 'プログラミングと情報の使い方を学ぶアプリ' },
    en: { title: 'Computing', text: 'Programming and using information', glyph: '</>' } },
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
