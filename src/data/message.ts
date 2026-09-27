// サイト開設にあたって（トップと「このサイトについて」で使う）
export const MESSAGE = {
  ja: {
    heading: 'サイト開設にあたって',
    lead: 'テクノロジーに救われる児童生徒や大人は、必ずいます。',
    // トップで表示するときの改行位置（3つ目の区切りはスマホ幅だけで改行）
    leadLines: ['テクノロジーに救われる', '児童生徒や大人は、', '必ずいます。'],
    second: 'その方法を知っているか、知らないか。\nそれだけで、人生が変わることがあります。',
    date: '2026-09',
    dateLabel: '2026年9月',
    sign: 'toi toi toi 運営者',
    body: [
      'テクノロジーに救われる児童生徒や大人は、必ずいます。その方法を知っているか、知らないか。それだけで、人生が変わることがあります。',
      'だからといって、アナログの学びを軽く見ているわけではありません。紙と鉛筆の手ざわり、体を動かして確かめること。そこからしか身につかないものも、たしかにあります。',
      '大切なのは、学ぶ本人が方法を選べることだと考えています。さまざまな手段を知り、試し、使いこなしたうえで、アナログか、デジタルか、その組み合わせかを自分で選ぶ。そのために、指導者・支援者が環境を整え、いっしょに体験しながら学んでいくことが欠かせません。',
      'このサイトが、その選択への一歩になれば幸いです。',
    ],
    more: '続きを読む',
  },
  en: {
    heading: 'On opening this site',
    lead: 'There are always children, students and adults whom technology can rescue.',
    leadLines: ['There are always children, students and adults', 'whom technology can rescue.'],
    second: 'Whether or not someone knows these methods\ncan change the course of their life.',
    date: '2026-09',
    dateLabel: 'September 2026',
    sign: 'toi toi toi',
    body: [
      'There are always children, students and adults whom technology can rescue. Whether or not someone knows these methods can change the course of their life.',
      'This does not mean looking down on analogue learning. The feel of pencil on paper, checking things with your own hands and body: some things can only be learned that way.',
      'What matters, I believe, is that learners can choose how they learn. Knowing many ways, trying them, and becoming fluent with them, and then choosing for themselves: analogue, digital, or a mix of both. For that, teachers and supporters need to prepare the environment and learn together with them, through shared experience.',
      'I hope this site can be one step toward that choice.',
    ],
    more: 'Read more',
  },
};

// いっしょに考えるメッセージ（全ページの下に出す）
export const TOGETHER = {
  ja: {
    heading: 'いっしょに考えていきませんか',
    body: [
      'お困りのことがあれば、どうぞ気軽にご連絡ください。',
      '答えを一つに決めるのではなく、その人に合う方法をいっしょに考えていけたらと思っています。このサイトも、みなさんの声を受けながら、少しずつ育てていきます。',
    ],
    cta: 'お問い合わせ',
  },
  en: {
    heading: "Let's think it through together",
    body: [
      'If you are facing a difficulty, please feel free to get in touch.',
      'Rather than settling on one right answer, I hope we can work out together what suits each person. This site will also keep growing, little by little, with your voices.',
    ],
    cta: 'Contact',
  },
};

// 支援のひと工夫（トップの「困りごとから探す」の上に短く、/hitokufu/ にくわしく）
export const KOKOROE = {
  ja: {
    kicker: 'Hint',
    heading: '支援のひと工夫',
    lead: '同じ方法でも、使い方ひとつで届き方が変わる。',
    intro: 'このサイトで紹介している方法は、どれも出発点です。同じ道具・同じ方法でも、ちょっとした目の付け所で、学び手への届き方が大きく変わります。選ぶ前に、3つの工夫を知っておいてください。',
    points: [
      { short: '組み合わせる', title: '学び手に合わせて、組み合わせる',
        text: '児童生徒にフィットする方法は、一人ひとりちがいます。一つの方法で決めず、組み合わせたり、少し変えたりしながら、その子に合う形を探してください。',
        ex: '例：読み上げが聞きにくそうなら、やめる前に「速さ」だけ変えてみる。文字を大きくするのと組み合わせると、読める量が増えることもあります。' },
      { short: '得意を生かす', title: '支える人の「得意」を生かす',
        text: '工作が好きな先生、体を動かすのが好きな先生、書くことが好きな先生。指導者・支援者にも、得意・不得意があります。自分の得意と組み合わせれば、無理なく続けられます。支える人が楽しくないと、支援は長続きしません。',
        ex: '例：工作が好きなら、スイッチや教材を手づくりで。体を動かすのが好きなら、動きの中に取り入れて。書くのが好きなら、手順カードにして。' },
      { short: 'いっしょにつくる', title: '学び手と、いっしょにつくる',
        text: '学び手の得意・不得意と、支える人の得意・不得意。そのミスマッチをできるだけ小さくしながら、学び手と共に創り上げていく（共創する）ことを大切にしています。',
        ex: '例：いくつか試したら「どれが使いやすかった？」と本人に聞いてみる。選んだ理由が、次の工夫のいちばんのヒントになります。' },
    ],
    more: '3つの工夫を見る',
    back: '困りごとから探す',
  },
  en: {
    kicker: 'Hint',
    heading: 'Small tweaks that make support work',
    lead: 'The same method can land very differently, depending on how it is used.',
    intro: 'Every method on this site is a starting point. With the same tool or method, a small change in how you look at it can make a big difference to the learner. Keep these three tweaks in mind before you choose.',
    points: [
      { short: 'Combine', title: 'Fit the learner, and combine',
        text: 'The method that fits each student is different. Rather than settling on one, combine and adjust methods until they fit the learner in front of you.',
        ex: 'e.g. If text-to-speech seems hard to follow, try changing only the speed before giving up. Combined with larger text, it can help a learner read much more.' },
      { short: 'Use your strengths', title: "Use the supporter's strengths",
        text: 'Some teachers love making things, some love moving, some love writing. Teachers and supporters have strengths and weaknesses too. Combine methods with what you are good at, and you can keep going without strain. If the supporter is not enjoying it, the support will not last.',
        ex: 'e.g. If you like making things, hand-make switches or materials. If you like moving, build it into movement. If you like writing, turn it into step cards.' },
      { short: 'Create together', title: 'Create it together with the learner',
        text: "The learner's strengths and weaknesses, and the supporter's: we try to keep the mismatch between them as small as possible, and build learning together with the learner.",
        ex: 'e.g. After trying a few, ask the learner "which one was easiest?". Their reason is the best hint for the next tweak.' },
    ],
    more: 'See the three tweaks',
    back: 'Find by need',
  },
};
