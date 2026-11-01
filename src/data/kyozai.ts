// 教材の部屋（児童生徒・家族向け：/kyozai/）と、支援者の部屋（先生・支援者向け：/kyozai/shien/）の目次。
// for に 'honnin' があれば教材の部屋に、'sensei' があれば支援者の部屋に、'qol' があれば QOL（/qol/：くらしと仕事を楽にする道具）に出る（いくつ出してもよい）。
// ※このファイルを手で上げ直すときは、いまの GitHub の版をもとに直す（古い版で上書きすると QOL の項目が消える）。
// 教材はここに1件ずつ書き足す。
// 教材そのものは1か所（GitHub Pages など）にだけ置き、ここは「目次」。
// url は変えないリンク（URL）にする（学校などからも同じリンクで開いてもらうため）。
export type KyozaiKind = 'app' | 'print' | 'slide' | 'video';
export type KyozaiFor = 'sensei' | 'honnin' | 'qol';

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
  ja: { sensei: '先生・支援者', honnin: '児童生徒・家族', qol: 'くらし・QOL' },
  en: { sensei: 'Teachers & supporters', honnin: 'Students & families', qol: 'Everyday life (QOL)' },
};

export const KYOZAI: Kyozai[] = [
  {
    slug: 'manazashi-atelier', kind: 'app', for: ['honnin', 'sensei'], komari: ['sousa', 'tsutaeru'],
    url: 'https://toitoitoi-lab.github.io/manazashi-atelier/',
    code: 'https://github.com/toitoitoi-lab/manazashi-atelier',
    guide: 'https://github.com/toitoitoi-lab/manazashi-atelier#readme',
    updated: '2026-11-01',
    ja: {
      title: 'まなざしアトリエ（見つめて えがく）',
      text: '見つめたところに色が広がる、視線入力のお絵描きアプリです。じっと見るとしゃぼん玉や花がふくらみ、見つめて選ぶ大きなボタンで、いろ・ふで・もようを自分で切り替え、もどる・すすむ・けすもできます。視線入力装置のほか、iPad・iPhone の視線トラッキング、パソコンやタブレットのカメラ、マウス・タッチでも使え、反応の速さをその子に合わせられます。',
      note: 'ログインなしで使えます。作品と記録は、使っている人のパソコンやタブレットの中だけに保存されます（学校の Google アカウントで設定すると、スプレッドシートに記録する学校版になります）。カメラの映像はどこにも送りません。',
    },
    en: {
      title: 'Manazashi Atelier (paint with your eyes)',
      text: 'An eye-gaze painting app: color spreads where you look, and bubbles or flowers grow while you hold your gaze. Large dwell buttons let the painter change color, brush and pattern, and undo, redo or erase, on their own. Works with eye trackers, iPad/iPhone eye tracking, a laptop or tablet camera, a mouse or touch, with adjustable response speed. (Japanese)',
      note: 'No login needed. Artwork and records stay on the device you are using (set it up with a school Google account to record to a spreadsheet). Camera images are never sent anywhere.',
    },
  },
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
  {
    slug: 'kotomusubi', kind: 'app', for: ['qol'], komari: ['tsutaeru'],
    url: 'https://toitoitoi-lab.github.io/kotomusubi/',
    code: 'https://github.com/toitoitoi-lab/kotomusubi',
    guide: 'https://github.com/toitoitoi-lab/kotomusubi#readme',
    updated: '2026-10-17',
    ja: {
      title: 'ことむすび（ことばを えらんで つたえる）',
      text: '話すことが難しい人が、立場・場面・気持ちを選ぶだけで、自分のことばを読み上げて伝えられるアプリ（VOCA）です。50音やアルファベットで自分のことばをつくったり、よく使うことばを「ことば帖」にまとめて印刷したりできます。少ない大きなボタンだけの「かんたんボード」もあります。',
      note: 'ログインなしで使えます。入力した内容は、使っている人のスマホやタブレットの中だけに保存され、外には送りません。緊急通報サービスではありません。学校の端末で開けないときは、アプリの「せってい → このアプリについて」にある Google 版の入口を使ってください。',
    },
    en: {
      title: 'Kotomusubi (choose words, get them across)',
      text: 'A voice output communication aid (VOCA) web app: choose who you are, the scene and what you want to say, and it reads your words aloud. Build your own words from kana or the alphabet, keep favourites in a printable word book, or use the simple board with a few large buttons. (Japanese and English)',
      note: 'No login needed. What you enter is saved only on the phone or tablet you are using and is never sent anywhere. This is not an emergency service.',
    },
  },
  {
    slug: 'techo', kind: 'app', for: ['qol'], komari: ['mitoosu'],
    url: 'https://toitoitoi-lab.github.io/techo/',
    code: 'https://github.com/toitoitoi-lab/techo',
    guide: 'https://github.com/toitoitoi-lab/techo#readme',
    updated: '2026-09-27', needsSetup: true,
    ja: {
      title: 'techo（話すだけで予定が入る手帳）',
      text: '予定やタスクをまとめて話すと、AI が1件ずつに分けて Google カレンダーに入れます。やることに A・B・C の順番を付け、終わらなかったものは翌日に持ち越せます。役割がいくつもある大人や支援者が、「今週いちばん大事なこと」を見渡すための手帳です。',
      note: 'AI の機能に使う Gemini API は、Google の規約で18歳以上の人しか使えず、18歳未満の人が使うことが見込まれるアプリにも組み込めません。そのため techo は大人・支援者向けとし、児童生徒には使わないでください。デモは架空のデータで画面だけ試せます。自分で使うには、自分の Google アカウントでの準備（20分ほど・無料）が必要です。AI の無料枠では入力した内容が Google の改善に使われることがあるので、人に知られたくない予定は入れないでください。',
    },
    en: {
      title: 'techo (a planner you fill in by talking)',
      text: 'Say your plans and tasks in one go, and AI splits them into single entries in Google Calendar. Rank tasks A, B or C and carry unfinished ones over to the next day. A planner for adults and supporters juggling many roles to see what matters most this week. (Japanese)',
      note: 'The Gemini API used for the AI features may only be used by people aged 18 or over under Google’s terms, and may not be built into services likely to be used by under-18s. techo is therefore for adults and supporters only; please do not use it with students. The demo shows the screens with made-up data. To use it yourself, set it up with your own Google account (about 20 minutes, free). On the free AI tier, what you enter may be used to improve Google products, so leave out anything private.',
    },
  },
];
