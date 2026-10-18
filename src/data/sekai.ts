// 世界の AT ノート：運営者が勉強のために集めている、海外の AT 活用の一例
// 載せるときのルール：元の文や画像は写さず、自分のことばで要約＋出典リンク。確認した日付を必ず入れる。
// 週ごとの候補は Project の claude/world_AT_jirei_log.md。載せると決めたものだけ、ここに足す（新しいものを上に）。
export interface SekaiNote {
  id: string;
  title: string;
  country: string;            // 国・地域
  kind: string;               // 研究／学校の実践／製品・サービス の別
  taisho: string;             // 対象（障害種や困りごと）
  wakari: string[];           // サイトの「わかり方」：見る・聞く・話す・動く・感じる・見通す
  body: string[];             // どんな使い方か（2〜3文）
  nihon: string;              // 日本の教室で試すなら
  memo?: string;              // 運営者メモ
  sources: { label: string; url: string }[];
  checked: string;            // 確認した日（YYYY-MM-DD）
}

export const SEKAI: SekaiNote[] = [
  {
    id: 'microbit-sr', title: 'micro:bit のプログラミングが、スクリーンリーダーで使えるように',
    country: 'イギリス', kind: '製品・サービス（2026年7月）', taisho: '視覚障害（全盲・弱視）',
    wakari: ['聞く', '動く'],
    body: [
      'micro:bit のブロックプログラミング（MakeCode）が、画面を読み上げる道具（スクリーンリーダー）と点字ディスプレイに対応しました。マウスを使わず、キーボードだけでブロックを選び、組み立てられます。',
      'イギリス・オランダ・アメリカの盲学校の子どもたちといっしょに作られ、Windows や Mac の主なスクリーンリーダーで使えます。',
    ],
    nihon: '見えない・見えにくい子も、同じ教材で同じ授業に参加できる入口になります。キーボード操作だけでも使えるので、手の動きに困りがある子にも役立ちます。',
    memo: '画期的だと思います。ただ、英語を母語としない子にとっては、読み上げを聞いても、ことばのまとまり（どこからどこまでが1つのブロックか）がつかみにくいかもしれません。日本語でどこまで分かりやすく読まれるかは、まだ確かめていません。',
    sources: [
      { label: 'micro:bit Educational Foundation（英語）', url: 'https://microbit.org/news/2026-07-13/makecode-screen-reader-support/' },
      { label: 'Microsoft MakeCode ブログ（英語）', url: 'https://makecode.com/blog/microbit/2026-release' },
    ],
    checked: '2026-10-18',
  },
  {
    id: 'eyegaze-coding', title: '目の動き（視線入力）で、プログラミングをする',
    country: 'イギリス', kind: '開発・実践（2026年）', taisho: '肢体不自由（手でキーボードやマウスを使えない）',
    wakari: ['見る', '動く', '見通す'],
    body: [
      'ブロックプログラミングの仕組み（Blockly）に、視線入力で操作する機能を加える取り組みです。目で見るだけで、ブロックを組み、プログラムを動かせます。',
      '初めてコードにふれる小学生から大人まで、視線入力を使う人たちと試しながら作られています。',
    ],
    nihon: '視線入力を「選ぶ・伝える」だけでなく、「つくる」ことに広げられます。視線入力で生活している子が、自分でロボットや micro:bit を動かす授業の可能性があります。',
    sources: [
      { label: '開発者の報告（英語）', url: 'https://kmcnaught.co.uk/2026/03/01/Eye-gaze-coding-with-Blockly.html' },
      { label: 'Blockly のアクセシビリティの取り組み一覧（英語）', url: 'https://www.blockly.com/accessibility-projects' },
    ],
    checked: '2026-10-18',
  },
  {
    id: 'switch-toy', title: '3D プリントのスイッチで、おもちゃを遊べるように',
    country: 'シンガポール', kind: '施設での実践（2026年5月）', taisho: '肢体不自由・重い障害（ボタンを押すことがむずかしい）',
    wakari: ['動く', '感じる'],
    body: [
      'エンジニアのグループが、70個のおもちゃの回路を改造し、軽くふれるだけで動かせる 3D プリントのスイッチを付けました。',
      '3D プリントのスイッチは、市販品のおよそ5分の1の費用で作れます。設計データと作り方の動画を施設に渡し、職員が自分で印刷・修理できるようにしています。',
    ],
    nihon: '市販のスイッチやおもちゃは高価で、壊れると修理にも時間がかかります。3D プリンターがあれば、学校の中で作り、壊れても直せます。',
    memo: '市販だと高いものも、自分で作れば部品代はずっと安くすみます。「買う」だけでなく「作る・直す」が選べることが大切だと思います。',
    sources: [
      { label: 'The Straits Times の記事（英語・Rainbow Centre が掲載）', url: 'https://rainbowcentre.org.sg/wp-content/uploads/2026/05/29_05_2026_Adaptive-switches-rewired-circuits-allow-children-with-special-needs-to-play-with-toys-like-others-_-The-Straits-Times.pdf' },
    ],
    checked: '2026-10-18',
  },
  {
    id: 'ai-jijogu', title: '生成 AI と 3D プリンターで、自助具の形を考える',
    country: 'アメリカ', kind: '研究（2025年）', taisho: '手の動きに困りがある人（食べる・書く・身だしなみ など）',
    wakari: ['動く'],
    body: [
      '作業療法士やエンジニアなど18人が、ことばで説明した形を AI で絵にし、さらに AI で立体のデータにして、3D プリンターで自助具を作りました。スプーン、歯ブラシ、書くときのグリップ、ボトルを持つ道具、スイッチなどです。',
      '3D の設計ソフトが使えない人でも形にできた一方で、寸法を正確に合わせること、一人ひとりに合わせることは苦手でした。安全かどうかは、人が確かめる必要があります。',
    ],
    nihon: '本人や家族と「こんな形はどう？」と話し合うときの、最初のたたき台に使えます。仕上げと安全の確認は、作業療法士など専門の人といっしょに行います。',
    sources: [
      { label: '論文（ASSETS 2025・英語）', url: 'https://doi.org/10.1145/3663547.3746343' },
    ],
    checked: '2026-10-18',
  },
  {
    id: 'ai-shokuzu', title: 'ことばで頼むと、AI が触図（さわる図）を作る',
    country: 'アメリカ', kind: '研究（2026年7月）', taisho: '視覚障害（全盲・弱視）',
    wakari: ['感じる', '見る'],
    body: [
      '「〇〇の図」と文章で頼むと、さわって分かる浮き出た図を、点字のラベルつきで 3D プリント用に作る研究です。',
      '見えない・見えにくい人に実際にさわってもらって確かめ、これまでの方法より分かりやすいと評価されました。まだ研究の段階です。',
    ],
    nihon: '理科や社会の図、地図などを、先生がその場で触図にできる日が近づいています。今は、触図を作るときの考え方の参考になります。',
    sources: [
      { label: '論文（arXiv・英語）', url: 'https://arxiv.org/abs/2607.22674' },
    ],
    checked: '2026-10-18',
  },
];
