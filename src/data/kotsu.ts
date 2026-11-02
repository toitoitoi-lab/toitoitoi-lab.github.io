// 学び方のコツの「くわしいページ」（/manabi/kotsu/<slug>/）。
// 方針：一般によく言われることは「一般には」で1〜2行だけ。中心は「AT ならこう使える」という提案。
// 提案の根拠は、運営者が集めている「世界の AT ノート」「国内の実践ストック」（スプレッドシート）の記事。
// 記事の文章は写さず、自分のことばで要約してリンクする。数字は出典どおりに書く。
// AI の年齢のきまり：Gemini API（自作アプリに組み込む AI）は18歳以上。学校のアカウントの Gemini アプリ・NotebookLM は、学校の管理者が許可すれば児童生徒も使える。

export type KotsuSource = {
  where: 'world' | 'domestic';   // 世界 / 国内
  label: string;                 // 出典の名前（発行元・題名を短く）
  url: string;
  note: string;                  // 何が分かったか（自分のことばで1〜2文。数字は出典どおり）
};

export type KotsuIdea = {
  id: string;
  title: string;                 // 提案（AT ならこう使える）
  body: string;                  // 提案の中身
  sources: KotsuSource[];        // 世界・国内の記事
  tryIt: string;                 // この教室で試すなら
  caution?: string;              // 気をつけること
};

export type KotsuDetail = {
  slug: string;                  // manabi.ts の KOTSU の slug と同じ
  updated: string;
  ippan: { text: string; ref?: { label: string; url: string } };  // 一般には（1〜2行）
  lead: string;                  // このページで伝えたいこと
  ideas: KotsuIdea[];
  apps?: { label: string; href: string; note: string }[];          // 自作アプリ・関連ページ
  memo?: string;                 // 運営者のひとこと
  related?: { label: string; href: string }[];
};

export const KOTSU_DETAIL: KotsuDetail[] = [
  {
    slug: 'mimide',
    updated: '2026-11-02',
    ippan: {
      text: '読むのに時間がかかる人にとって、耳から聞くことは「ずる」ではなく、内容にたどり着くもう一つの道です。多くの本や研修でも、そう紹介されています。',
      ref: { label: '文部科学省「音声教材」', url: 'https://www.mext.go.jp/a_menu/shotou/kyoukasho/1374019.htm' },
    },
    lead: 'このページでは、その先の「AT（支援技術）を使うなら、どう使うとよいか」を、国内外の実践や研究から考えます。',
    ideas: [
      {
        id: 'erabu',
        title: '読み上げは「試して、比べて、本人が選ぶ」',
        body: '読み上げの道具はたくさんあります。どれが合うかは人によってちがいます。速さ・声・文字の大きさ・ハイライトの出し方などを本人が試して比べ、自分で選ぶところまでを、支援の中に入れておくと効果が出やすくなります。',
        sources: [
          { where: 'domestic', label: '松江市立島根小学校（パナソニック教育財団 実践研究助成）', url: 'https://www.pef.or.jp/db/pdf/2025/2025_17.pdf',
            note: '読み書きに困難のある子が、テストで読み上げと音声入力などを自分で試して選んだ。これまで45分で半分程度しか書けなかった子が、約20分で全問を解き終え、正答率は9割前後だった。' },
          { where: 'domestic', label: '国立特別支援教育総合研究所 支援機器等教材ポータル', url: 'https://kyozai.nise.go.jp/file/1342',
            note: '小学6年生が、テストで自分で読む方法と読み上げを試し、読み上げのほうが点数が高かった。本人が「自分に合う学び方」を知るきっかけになった。' },
          { where: 'domestic', label: '大阪教育大学（文部科学省の委託事業 成果報告書）', url: 'https://www.mext.go.jp/content/20200908-mxt_tokubetu02-000009342_07-1.pdf',
            note: '読み上げ教材（マルチメディアDAISY）の設定を、検査の結果をもとに調整した。読む速さは「読み上げの速さ」、音読の正確さは「文字の大きさ」「行間」と関係していた。' },
        ],
        tryIt: 'Chromebook の「選択して読み上げ」や iPad の「読み上げコンテンツ」で、同じ文章を速さを変えて2〜3回聞き、本人に「どれが分かりやすかった？」と選んでもらう。選んだ設定は、次の担任にも引き継げるようにメモしておく。',
      },
      {
        id: 'mimitome',
        title: '「耳だけ」より「耳と目をいっしょに」',
        body: '読み上げを聞きながら、今読んでいる所に色が付く（ハイライト）と、内容をつかみやすくなる人がいます。反対に、聞こえにくい人には、声を文字にして目で追えるようにします。どちらも「耳と目の両方の道」を用意するという考え方です。',
        sources: [
          { where: 'domestic', label: '広島大学 特別支援教育実践センター研究紀要（UD-Book）', url: 'https://csnerp.hiroshima-u.ac.jp/dl/CSNERP_23/CSNERP_23_09.pdf',
            note: '教科書と同じレイアウトで読み上げる音声教材の利用者を調べた。どの障害の種類にも当たらない読みの困難のある人が25.0%（39名）で、効果があったという回答が有意に多かった。' },
          { where: 'domestic', label: 'Google Japan ブログ（運営者の実践）', url: 'https://blog.google/intl/ja-jp/company-news/outreach-initiatives/ai-google-for-education/',
            note: '対面の授業でも Chromebook の自動字幕を使い、先生の口頭の指示を字幕で確かめながら、作業を止めずに授業に参加できる形にした。' },
          { where: 'world', label: 'ギャロデット大学ほか（ASSETS 2026・アメリカ）', url: 'https://arxiv.org/pdf/2609.11408',
            note: 'ろう・難聴の人を中心に216人が字幕を評価した。評価をいちばん下げたのは「字幕の遅れ」で、遅れのない字幕では、人がつけた字幕と AI 字幕の評価はほぼ同じだった。' },
        ],
        tryIt: '読み上げは「今読んでいる所に色が付く」設定を選ぶ。自動字幕を使うときは、正確さだけでなく「遅れが少ないか」「字幕の位置や大きさを本人が選べるか」も確かめる。',
      },
      {
        id: 'ai-koe',
        title: 'むずかしい資料や図は、AI に「声で」説明してもらう',
        body: '文字の多い資料や、目で見る図・まわりの様子を、AI が声で説明したり、やさしく言い換えたりできるようになってきました。読む前に「だいたいの中身」を耳でつかんでおくと、そのあとで読むのが楽になります。',
        sources: [
          { where: 'domestic', label: '兵庫県立氷上特別支援学校（パナソニック教育財団 実践研究助成）', url: 'https://www.pef.or.jp/db/pdf/2025/2025_57.pdf',
            note: '知的障害のある高等部の生徒が、NotebookLM の言い換えや音声概要を使って市の資料を読み解き、市議会で提言した。資料を「読みやすい」と答えた生徒は、事前の80%から事後は100%になった。' },
          { where: 'domestic', label: 'Google Japan ブログ（奈良県立盲学校の実証）', url: 'https://blog.google/intl/ja-jp/company-news/outreach-initiatives/global-accessibility-awareness-day/',
            note: '全盲の子どもが、触覚ディスプレイで図やグラフを指で確かめ、分からないところは Gemini に尋ねて、答えを点字や図で受け取った。' },
          { where: 'world', label: 'Google（Gemini Live の Guided Vision・アメリカ）', url: 'https://blog.google/innovation-and-ai/products/gemini-app/guided-vision-gemini-live/',
            note: 'スマホのカメラに写したものを AI が声で説明し、うまく写せないときは「もう少し右へ」のように向け方も教えてくれる。視覚障害者の遠隔支援サービスと組んで作られた。' },
        ],
        tryIt: '学校のアカウントの NotebookLM に教材を入れて、音声概要（2人の会話のような説明）を作り、読む前に聞いてみる。図やプリントは、Gemini に写真を見せて説明してもらう。',
        caution: '学校のアカウントの Gemini アプリや NotebookLM は、学校の管理者が許可していれば児童生徒も使えます（使えるかどうかは自治体・学校の設定によります）。AI の説明はまちがうことがあるので、大事なところは先生といっしょに確かめます。Guided Vision は、日本での提供・日本語対応を確かめてから使います。',
      },
    ],
    apps: [
      { label: 'Sunlit Path（英語アプリ）', href: '/kyozai/#sunlit-path', note: '英語の文を「基本・発展・会話」の3段で聞き比べられる。「～」の所は少し間をあけて読み上げ、ことばのまとまりをつかみやすくしている。' },
      { label: 'ことむすび（QOL）', href: '/qol/#kotomusubi', note: '選んだことばを声で読み上げる。自分のことばを「聞いて確かめる」使い方もできる。' },
    ],
    memo: '耳で学べるのは大きな助けです。ただ、日本語や英語を母語としない子には、読み上げを聞いても、ことばのまとまりがつかみにくいことがあります。耳だけに頼らず、目で見る手がかりもいっしょに用意するようにしています。',
    related: [
      { label: '困りごと「読む」', href: '/komari/yomu/' },
      { label: '困りごと「聞く・見る」', href: '/komari/kiku/' },
      { label: '世界の AT ノート', href: '/articles/sekai/' },
    ],
  },
];
