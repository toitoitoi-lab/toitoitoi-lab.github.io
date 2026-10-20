// 困りごとページの「実践の紹介」。公開されている記事を、自分のことばで要約してリンクで紹介する（文や写真は写さない）。
// kind：'own' は運営者自身の実践、'ref' はほかの学校などの実践（運営者が関わった場合は note に書く）。
export interface Jirei {
  id: string;
  kind: 'own' | 'ref';
  ja: { title: string; body: string; note: string; src: string };
  en: { title: string; body: string; note: string; src: string };
  url: string;
  date: string; // 記事の公開日 YYYY-MM-DD
}

export const JIREI: Record<string, Jirei[]> = {
  kiku: [
    {
      id: 'meet-caption', kind: 'own',
      ja: {
        title: '対面の授業でも Meet の字幕で、先生の指示を「見て」確かめる',
        body: '聴覚支援が必要な生徒が、Chromebook で Google Meet を開き、ChromeOS の自動字幕で先生の話を文字にして確かめます。画面を分けて教科書と Google ドキュメントを並べ、字幕の吹き出しは作業のじゃまにならない場所へ動かせます。特別な機器を足さず、学校の Chromebook だけで始められます。',
        note: '運営者（兵庫県立播磨特別支援学校）の授業の実践です。Google の公式ブログで紹介されました。',
        src: 'Google Japan ブログ「AI を活用した Google for Education のアクセシビリティ機能のご紹介」',
      },
      en: {
        title: 'Using Meet captions in face-to-face lessons to “see” the teacher’s instructions',
        body: 'A student who needs hearing support opens Google Meet on a Chromebook and uses ChromeOS live captions to read what the teacher says. The screen is split between the textbook and a Google Doc, and the caption bubble can be moved out of the way. No extra devices are needed — just the school Chromebook.',
        note: 'A practice from the operator’s own lessons (Hyogo Prefectural Harima Special Needs School), featured on Google’s official blog (in Japanese).',
        src: 'Google Japan blog (Japanese)',
      },
      url: 'https://blog.google/intl/ja-jp/company-news/outreach-initiatives/ai-google-for-education/',
      date: '2025-05-15',
    },
  ],
  yomu: [
    {
      id: 'dotpad', kind: 'ref',
      ja: {
        title: '図やグラフを指で読む：Chromebook × Dot Pad × Gemini',
        body: '奈良県立盲学校で、触覚ディスプレイ「Dot Pad」を使い、火山の断面図や地層、棒グラフなどを点字の図として指で確かめる実証が行われています。分からないところは生成AI（Gemini）に尋ね、答えを点字や図でその場に出せます。日本語点字の Chromebook への対応も進められています。',
        note: '奈良県立盲学校の実証です。運営者も、視覚障害のある生徒にとっての Chromebook の使いやすさについてコメントを寄せています。',
        src: 'Google Japan ブログ「Global Accessibility Awareness Day：テクノロジーで広がる、一人ひとりに合わせた学びの形」',
      },
      en: {
        title: 'Reading diagrams and graphs with your fingers: Chromebook × Dot Pad × Gemini',
        body: 'At Nara Prefectural School for the Blind, students use the Dot Pad tactile display to feel diagrams such as volcano cross-sections, rock layers and bar graphs as braille graphics. They can ask Gemini about anything unclear and get the answer in braille or graphics on the spot. Japanese braille support for Chromebooks is also in progress.',
        note: 'A trial at Nara Prefectural School for the Blind. The operator contributed a comment on how intuitive Chromebooks are for students with visual impairments.',
        src: 'Google Japan blog (Japanese)',
      },
      url: 'https://blog.google/intl/ja-jp/company-news/outreach-initiatives/global-accessibility-awareness-day/',
      date: '2026-05-21',
    },
  ],
};
