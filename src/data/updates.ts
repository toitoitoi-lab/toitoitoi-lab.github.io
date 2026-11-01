// お知らせ・更新履歴。新しいものを「いちばん上」に1行足すだけで、
// トップ・支援する人の部屋の「お知らせ欄」と、/updates/ の履歴ページの両方に反映される。
// date は YYYY-MM-DD。ja / en は、それぞれの言語の1文（です・ます調、短く）。
// href を入れると、その文の後ろに「くわしく」のリンクが付く（サイト内は / から始める）。
// 同じ日の更新は1件にまとめる（「○月○日更新分：」で始める）。休日の細かな修正は、その都度足さず、まとめて1件で出す。
// 新しく増えたもの（アプリ・教材を GitHub で公開、記事やコーナーの追加、アプリの版の更新）も必ず書く。
//   例：「〇〇（何をする道具か）を GitHub で公開しました。」「記事『〇〇』を追加しました。」。書く順は「増えたもの → 直したこと」。

// title：見出し（短く）。お知らせ欄と履歴では、見出しだけを出し、クリックで本文がひらく。
// pin: true にしたものは、お知らせ欄で最初からひらいて上に出す（なければ最新の1件をひらく）。
export type Update = { date: string; title: { ja: string; en: string }; ja: string; en: string; href?: string; jaOnly?: boolean; pin?: boolean }; // jaOnly: 日本語版だけのページ（英語版からも日本語ページへ）

export const UPDATES: Update[] = [
  {
    date: '2026-11-01',
    title: { ja: '「まなざしアトリエ」を v1.11.0 に更新', en: '“Manazashi Atelier” updated to v1.11.0' },
    ja: '「まなざしアトリエ」を v1.11.0 に更新しました。iPad・iPhone の視線トラッキングに対応し、入力方法を選ぶとその子に合う設定にそろうようにしました。反応の速さを3段階とスライダーで選べ、「ためし描き」で確かめられます。ボタンの場所と絵の紙をはっきり分け、作品を写真アプリに保存できるようにし、設定を4つのまとまりに整理しました。',
    en: 'Updated “Manazashi Atelier” to v1.11.0. It now supports iPad/iPhone eye tracking, and choosing an input method sets matching defaults. Response speed has three presets plus a slider, with a test area. The button area and the drawing paper are now clearly separated, artwork can be saved to the Photos app, and settings are grouped into four sections.',
    href: '/kyozai/#manazashi-atelier',
  },
  {
    date: '2026-10-31',
    title: { ja: '視線入力のお絵描きアプリ「まなざしアトリエ」を公開', en: 'Eye-gaze painting app “Manazashi Atelier”' },
    ja: '視線入力でお絵描きできるアプリ「まなざしアトリエ」を GitHub で公開し、教材の部屋と支援者の部屋に載せました。視線入力装置のほか、パソコンやタブレットのカメラでも使え、作品と「見ていた記録」を残せます。',
    en: 'Published “Manazashi Atelier”, an eye-gaze painting app, on GitHub and added it to both materials rooms. It works with eye trackers or a laptop or tablet camera, and keeps artwork along with a record of where the painter looked.',
    href: '/kyozai/#manazashi-atelier',
  },
  {
    date: '2026-10-21',
    title: { ja: '英語アプリ「Sunlit Path」と記事「世界の AT ノート」を公開ほか', en: 'English app “Sunlit Path”, “World AT notes” and more' },
    ja: '10月21日更新分：中学校の英語の復習アプリ「Sunlit Path」を GitHub で公開し、教材の部屋に載せました。記事に「世界の AT ノート」（海外の支援技術と AI の新しい動き）を追加しました。困りごとの「聞く・見る」「読む」に、Chromebook を使った実践の紹介を加えました。「つくりたい方へ」に、アプリを子どもに合わせて変える方法を加え、お問い合わせを作り直しました。「支援の前に、立ち止まる」の説明を分かりやすくしました。',
    en: 'Updates on 21 October: published “Sunlit Path”, an app for reviewing junior high school English, on GitHub and added it to the materials room. Added “World AT notes” (assistive technology and new AI developments from around the world). Added Chromebook practice examples to the “Listening & seeing” and “Reading” pages. “For builders” now explains how to adapt an app for a child, and the contact form was redesigned. Clearer wording in “Pause before you support”.',
    href: '/articles/sekai/', jaOnly: true,
  },
  {
    date: '2026-10-18',
    title: { ja: 'サイト名を「toi toi toi lab」に・強調色を追加', en: 'New site name and accent colors' },
    ja: 'サイト名を「toi toi toi lab」にしました。表示設定に「強調色」（ライム・イエロー・シアン）を加え、ライト・ダークのどちらでも選べるようにしました。',
    en: 'The site is now called “toi toi toi lab”. Display settings now include an accent color (lime, yellow or cyan) for both light and dark.',
  },
  {
    date: '2026-10-13',
    title: { ja: '「支援の前に、立ち止まる」を作り直しました', en: '“Pause before you support” rebuilt' },
    ja: '「支援の前に、立ち止まる」を作り直しました。スライダーで、あなたの得意と子どもに届くわかり方を置くと、2つが重なる所（ベン図）、ICT・AIで補う所、強みを行動の言葉にした「強みのことば」が出ます。',
    en: 'Rebuilt “Pause before you support”: set sliders for your strengths and how the child understands best, and see where they overlap (a Venn diagram), where ICT and AI can fill the gap, and your strengths put into plain words (Japanese only for now).',
    href: '/tachidomaru/', jaOnly: true,
  },
  {
    date: '2026-10-10',
    title: { ja: '「支援の前に、立ち止まる」を追加ほか', en: 'Added “Pause before you support” and more' },
    ja: '10月10日更新分：「支援の前に、立ち止まる」を追加しました。結論と「明日からの手立て」が先に出る形にし、Word形式で保存できるようにしました。表示設定に「説明の量」を加えました。',
    en: 'Updates on 10 October: added “Pause before you support”, which leads with the conclusion and next steps and can be saved as a Word file. Added an “amount of explanation” display setting (Japanese only for now).',
    href: '/tachidomaru/', jaOnly: true,
  },
  {
    date: '2026-10-04',
    title: { ja: '操作ボタンの並びを変えました', en: 'Action buttons rearranged' },
    ja: '操作ボタンの並びを変えました。「動かす」を端に、「たたむ／ひらく」をその内側に置き、ボタンは反対側にひらきます。',
    en: 'Rearranged the action buttons: “Move” sits at the edge, “Fold/Open” next to it, and the buttons open toward the other side.',
    href: '/about/#mieyasusa',
  },
  {
    date: '2026-09-30',
    title: { ja: '操作ボタンの固定・せんせいアシスト更新ほか', en: 'Fixed buttons, Sensei Assist update and more' },
    ja: '9月30日更新分：操作ボタンを「画面の最上部」にも固定できるようにしました。せんせいアシスト v1.1.2（公開版）を更新しました。利用ルールを、使う直前の場所で一行お知らせするようにしました。困りごと・立場のページに「印刷・保存する」を加えました。',
    en: 'Updates on 30 September: the action buttons can be fixed to the top edge; Sensei Assist v1.1.2 (public) updated; a one-line note about the terms of use where you use materials; “Print / Save” added to the needs and role pages.',
  },
  {
    date: '2026-09-28',
    title: { ja: '教材の部屋を2つに分けました', en: 'Materials room split in two' },
    ja: '教材の部屋を、児童生徒・家族向けと支援者向けの2つに分けました。',
    en: 'Split the materials room in two: one for learners and families, one for supporters.',
    href: '/kyozai/',
  },
  {
    date: '2026-09-27',
    title: { ja: '利用ルールを公開しました', en: 'Terms of use published' },
    ja: '利用ルールを公開しました。',
    en: 'Published the terms of use.',
    href: '/rules/',
  },
];

export const SHOW_COUNT = 4; // お知らせ欄に出す件数（これより古いものは履歴ページへ）
