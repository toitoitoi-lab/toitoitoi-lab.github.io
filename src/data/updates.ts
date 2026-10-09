// お知らせ・更新履歴。新しいものを「いちばん上」に1行足すだけで、
// トップ・支援する人の部屋の「お知らせ欄」と、/updates/ の履歴ページの両方に反映される。
// date は YYYY-MM-DD。ja / en は、それぞれの言語の1文（です・ます調、短く）。
// href を入れると、その文の後ろに「くわしく」のリンクが付く（サイト内は / から始める）。

export type Update = { date: string; ja: string; en: string; href?: string };

export const UPDATES: Update[] = [
  {
    date: '2026-10-10',
    ja: '「支援の前に、立ち止まる」を追加しました。支援する人と子どもの持ち味を、同じ6つの軸で見比べるチェックです。',
    en: 'Added “Pause before you support”: a check that compares a supporter’s and a child’s traits on the same six axes (Japanese only for now).',
    href: '/tachidomaru/',
  },
  {
    date: '2026-10-04',
    ja: '操作ボタンの並びを変えました。「動かす」を端に、「たたむ／ひらく」をその内側に置き、ボタンは反対側にひらきます。',
    en: 'Rearranged the action buttons: “Move” sits at the edge, “Fold/Open” next to it, and the buttons open toward the other side.',
    href: '/about/#mieyasusa',
  },
  {
    date: '2026-09-30',
    ja: '操作ボタンを「画面の最上部」にも固定できるようにしました。固定しても、本文や表示設定が隠れません。',
    en: 'The action buttons can now be fixed to the top edge of the screen, without covering the text or the display settings.',
    href: '/about/#mieyasusa',
  },
  {
    date: '2026-09-30',
    ja: 'せんせいアシスト v1.1.2（公開版）を更新しました。Gemini が混み合っているときの自動再試行と、エラー表示を改善しました。',
    en: 'Updated Sensei Assist v1.1.2 (public version): automatic retry when Gemini is busy, and clearer error messages.',
    href: '/kyozai/shien/',
  },
  {
    date: '2026-09-30',
    ja: '利用ルールを、使う直前の場所で一行お知らせするようにしました。',
    en: 'A one-line note about the terms of use now appears right where you use materials.',
    href: '/rules/',
  },
  {
    date: '2026-09-30',
    ja: '困りごと・立場のページに「印刷・保存する」を追加しました（印刷・PDF・Word）。',
    en: 'Added “Print / Save” to the needs and role pages (print, PDF, Word).',
  },
  {
    date: '2026-09-28',
    ja: '教材の部屋を、児童生徒・家族向けと支援者向けの2つに分けました。',
    en: 'Split the materials room in two: one for learners and families, one for supporters.',
    href: '/kyozai/',
  },
  {
    date: '2026-09-27',
    ja: '利用ルールを公開しました。',
    en: 'Published the terms of use.',
    href: '/rules/',
  },
];

export const SHOW_COUNT = 4; // お知らせ欄に出す件数（これより古いものは履歴ページへ）
