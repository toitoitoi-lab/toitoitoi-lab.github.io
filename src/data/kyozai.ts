// 教材の部屋：教材はここに1件ずつ書き足す。
// 教材そのものは1か所（GitHub Pages など）にだけ置き、ここは「目次」。
// url は変えない住所にする（学校などからも同じ住所にリンクしてもらうため）。
export type KyozaiKind = 'app' | 'print' | 'slide' | 'video';
export type KyozaiFor = 'sensei' | 'honnin';

export type Kyozai = {
  slug: string;            // ページ内の目印（/kyozai/#slug）。変えない
  kind: KyozaiKind;
  for: KyozaiFor[];        // だれ向けか
  kyoka?: string[];        // 関係する教科（manabi.ts の slug）
  komari?: string[];       // 関係する困りごと（site.ts の KOMARI の slug）
  url: string;             // 教材の住所（開くリンク）
  code?: string;           // コードの場所（GitHub）
  guide?: string;          // 使い方・セットアップの説明
  updated: string;         // 最終更新（YYYY-MM-DD）
  needsSetup?: boolean;    // 自分の Google アカウントでの準備が必要か
  ja: { title: string; text: string; note?: string };
  en: { title: string; text: string; note?: string };
};

export const KIND_LABEL = {
  ja: { app: 'アプリ', print: 'プリント', slide: 'スライド', video: '動画' },
  en: { app: 'App', print: 'Printable', slide: 'Slides', video: 'Video' },
};
export const FOR_LABEL = {
  ja: { sensei: '先生・支援者', honnin: '本人・家族' },
  en: { sensei: 'Teachers & supporters', honnin: 'Learners & families' },
};

export const KYOZAI: Kyozai[] = [
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
];
