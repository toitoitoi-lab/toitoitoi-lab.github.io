// 教材の部屋（児童生徒・家族向け：/kyozai/）と、支援者の部屋（先生・支援者向け：/kyozai/shien/）の目次。
// for に 'honnin' があれば教材の部屋に、'sensei' があれば支援者の部屋に出る（両方に出すこともできる）。
// 教材はここに1件ずつ書き足す。
// 教材そのものは1か所（GitHub Pages など）にだけ置き、ここは「目次」。
// url は変えないリンク（URL）にする（学校などからも同じリンクで開いてもらうため）。
export type KyozaiKind = 'app' | 'print' | 'slide' | 'video';
export type KyozaiFor = 'sensei' | 'honnin';

export type Kyozai = {
  slug: string;            // ページ内の目印（/kyozai/#slug）。変えない
  kind: KyozaiKind;
  for: KyozaiFor[];        // だれ向けか
  kyoka?: string[];        // 関係する教科（manabi.ts の slug）
  komari?: string[];       // 関係する困りごと（site.ts の KOMARI の slug）
  url: string;             // 教材のリンク（URL）
  code?: string;           // コードの場所（GitHub）
  guide?: string;          // 使い方・セットアップの説明
  updated: string;         // 最終更新（YYYY-MM-DD）
  needsSetup?: boolean;    // 自分の Google アカウントでの準備が必要か
  ready?: boolean;         // false なら「準備中」として出す（開くボタンなし）
  // use：「教科と学び方」の教科の欄に出す、使いどころの紹介（kyoka があり、use がある教材だけ出る）
  ja: { title: string; text: string; note?: string; use?: string; useTag?: string };
  en: { title: string; text: string; note?: string; use?: string; useTag?: string };
};

export const KIND_LABEL = {
  ja: { app: 'アプリ', print: 'プリント', slide: 'スライド', video: '動画' },
  en: { app: 'App', print: 'Printable', slide: 'Slides', video: 'Video' },
};
export const FOR_LABEL = {
  ja: { sensei: '先生・支援者', honnin: '児童生徒・家族' },
  en: { sensei: 'Teachers & supporters', honnin: 'Students & families' },
};

export const KYOZAI: Kyozai[] = [
  {
    slug: 'english-playlist', kind: 'app', for: ['honnin'], kyoka: ['eigo'],
    url: 'https://toitoitoi-lab.github.io/english-playlist/',
    updated: '2026-09-28', ready: false,
    ja: { title: 'ENGLISH PLAYLIST', text: '音楽アプリのような画面で、英語の音を聞いて、まねして、話してみる。' },
    en: { title: 'ENGLISH PLAYLIST', text: 'Listen to English, copy the sounds and try speaking, in a music-app style screen.' },
  },
  {
    slug: 'sensei-assist', kind: 'app', for: ['sensei'], komari: [],
    url: 'https://toitoitoi-lab.github.io/sensei-assist/',
    code: 'https://github.com/toitoitoi-lab/sensei-assist',
    guide: 'https://github.com/toitoitoi-lab/sensei-assist#readme',
    updated: '2026-09-28', needsSetup: true,
    ja: {
      title: 'せんせいアシスト（仮想の児童生徒で支援を学ぶ）',
      text: '不特定の児童生徒を想定した仮想の児童生徒の特性を、自立活動の6区分27項目で置き、典型的に考えられる支援を AI といっしょに考えて学びます。',
      note: '実際の児童生徒のデータは入力しません。AI の機能を使うには、自分の Google アカウントでの準備（無料）が必要です。',
    },
    en: {
      title: 'Sensei Assist (learning support with virtual learners)',
      text: 'Set the traits of a virtual, non-specific learner across 27 items of "activities for independence", and think through typical support together with AI. (Japanese)',
      note: 'Never enter real student data. The AI features need a free setup with your own Google account.',
    },
  },
  {
    slug: 'sunlit-path', kind: 'app', for: ['honnin'], kyoka: ['eigo'],
    url: 'https://toitoitoi-lab.github.io/Sunlit-Path/',
    code: 'https://github.com/toitoitoi-lab/Sunlit-Path',
    guide: 'https://github.com/toitoitoi-lab/Sunlit-Path#readme',
    updated: '2026-10-18',
    ja: {
      title: 'Sunlit Path（場面から英語で伝える）',
      text: '高校「論理・表現Ⅰ」の場面ごとに、お手本を聞いて、自分の文をつくって伝える練習をします。キーボード・声・手書きで答えられ、CEFR A1–A2 の辞書つきです。',
      note: 'ログインなしで使えます。この版では、答えはどこにも送られません。',
      useTag: '中学校の英語の復習',
      use: '中学校で習った文法（There is ～、受け身、助動詞、比べる言い方など）を、「自分の町を紹介する」のような場面の中で復習し、高校の表現へつなげます。中学校の英語をもう一度確かめたい高校生や、学び直したい人に。',
    },
    en: {
      title: 'Sunlit Path (say it in English, scene by scene)',
      text: 'Listen to a model, then build and say your own sentences for everyday scenes, based on the high-school course Logic and Expression I. Answer by keyboard, voice or handwriting, with a CEFR A1–A2 dictionary. (Japanese and English)',
      note: 'No login needed. In this version, answers are not sent anywhere.',
      useTag: 'Review of junior-high English',
      use: 'Go over junior-high grammar (there is, the passive, modal verbs, comparisons and more) inside everyday scenes such as introducing your town, then step up to high-school expressions. For high-school students who want to review junior-high English, and for anyone relearning it. (Japanese and English)',
    },
  },
];
