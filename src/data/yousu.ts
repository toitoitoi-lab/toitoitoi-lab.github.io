// 「様子から探す」のデータ。
// 様子は、見たこと・聞いたことだけで書く（「やる気がない」「集中力がない」などの解釈や予想の言葉は使わない）。
// to には、その様子から考えられる困りごと（methods.ts の「こんなとき」）を「ページ:id」で入れる。
// 候補は「選ばれた様子のうち、いくつから挙がったか」の多い順に出す。最終的に選ぶのは使う人。

export type Yousu = { id: string; to: string[]; ja: string; en: string };
export type Scene = { id: string; ja: string; en: string; items: Yousu[] };

export const SCENES: Scene[] = [
  {
    id: 'kiku', ja: '授業中（聞く・見る）', en: 'In class (listening and looking)',
    items: [
      { id: 'y01', to: ['kiku:h1', 'kiku:h4', 'mitoosu:p1'], ja: '全体への指示のあと、まわりの様子を見てから動き出す', en: 'After an instruction to the whole class, looks at others before starting' },
      { id: 'y02', to: ['kiku:h1', 'kiku:h4'], ja: '同じことを何度か聞き返す', en: 'Asks for the same thing to be repeated several times' },
      { id: 'y03', to: ['kiku:h4'], ja: '口で説明されたときより、板書や絵があるときのほうが作業を早く始める', en: 'Starts work sooner when there is writing on the board or a picture than with spoken explanation only' },
      { id: 'y04', to: ['kiku:h3'], ja: '教室がざわついているとき、手が止まる・耳をふさぐ', en: 'Stops working or covers ears when the room is noisy' },
      { id: 'y05', to: ['kiku:h2'], ja: '動画や放送のあと、その内容についての質問に答えられない', en: 'Cannot answer questions about a video or announcement afterwards' },
      { id: 'y06', to: ['yomu:r3', 'kiku:h5'], ja: '黒板やスクリーンに近づいて見る・目を細めて見る', en: 'Moves closer to the board or screen, or narrows eyes to look' },
      { id: 'y07', to: ['kiku:h6'], ja: 'オンラインの授業で、発言の順番や画面の切りかえに遅れる', en: 'In online lessons, falls behind turn-taking or screen changes' },
    ],
  },
  {
    id: 'yomu', ja: '読む', en: 'Reading',
    items: [
      { id: 'y08', to: ['yomu:r2'], ja: '音読で、同じ行を二度読む・行を飛ばす', en: 'When reading aloud, reads the same line twice or skips lines' },
      { id: 'y09', to: ['yomu:r1'], ja: '音読で、1文字ずつ区切って読む', en: 'Reads aloud one character at a time' },
      { id: 'y10', to: ['yomu:r1', 'yomu:r6'], ja: '同じ文章を読み終えるのに、クラスの多くの子より時間がかかる', en: 'Takes longer than most classmates to finish reading the same text' },
      { id: 'y11', to: ['yomu:r4'], ja: '読めない漢字のところで、読むのが止まる', en: 'Stops reading at kanji they cannot read' },
      { id: 'y12', to: ['yomu:r5'], ja: '読み終えたあと、内容についての質問に答えられない', en: 'Cannot answer questions about a text after reading it' },
      { id: 'y13', to: ['yomu:r3'], ja: '教科書やプリントに顔を近づけて読む', en: 'Holds the textbook or worksheet very close to the face' },
      { id: 'y14', to: ['yomu:r1', 'yomu:r4'], ja: '読み上げてもらうと、内容についての質問に答えられる', en: 'Can answer questions about a text when it is read aloud to them' },
    ],
  },
  {
    id: 'kaku', ja: '書く', en: 'Writing',
    items: [
      { id: 'y15', to: ['kaku:w4', 'kaku:w1'], ja: '板書を写し終わる前に、次の説明が始まる', en: 'The next explanation starts before they finish copying from the board' },
      { id: 'y16', to: ['kaku:w1'], ja: '同じ量の字を書くのに、クラスの多くの子より時間がかかる', en: 'Takes longer than most classmates to write the same amount' },
      { id: 'y17', to: ['kaku:w2'], ja: '字がマスや行からはみ出す', en: 'Letters go outside the boxes or lines' },
      { id: 'y18', to: ['kaku:w3'], ja: '読める漢字を、書くときには書けない', en: 'Cannot write kanji that they can read' },
      { id: 'y19', to: ['kaku:w5'], ja: '口で答えられる内容を、文章に書くと短くなる・書けない', en: 'Writes much less, or nothing, about things they can explain aloud' },
      { id: 'y20', to: ['kaku:w5'], ja: '作文で、書き始めるまでに時間がかかる', en: 'Takes a long time to start writing a composition' },
      { id: 'y21', to: ['kaku:w6', 'kaku:w1'], ja: '鉛筆の持ち方がたびたび変わる・書いている途中で手を振る', en: 'Changes pencil grip often, or shakes their hand while writing' },
    ],
  },
  {
    id: 'tsutaeru', ja: '話す・伝える', en: 'Speaking and communicating',
    items: [
      { id: 'y22', to: ['tsutaeru:t2'], ja: '質問されてから答えるまでに時間がかかる', en: 'Takes a long time to answer after being asked' },
      { id: 'y23', to: ['tsutaeru:t2'], ja: '「あれ」「それ」が多く、物の名前が出てこない', en: 'Often says "that thing" instead of the name of an object' },
      { id: 'y24', to: ['tsutaeru:t4'], ja: '家では話すと聞いているが、学校や人前では話さない', en: 'Family reports they talk at home, but they do not talk at school or in front of others' },
      { id: 'y25', to: ['tsutaeru:t5'], ja: '分からないとき、手を挙げたり声をかけたりせずに手が止まっている', en: 'When stuck, stops working without raising a hand or asking' },
      { id: 'y26', to: ['tsutaeru:t1', 'tsutaeru:t3'], ja: '指さし・表情・身ぶりで伝えることが多い', en: 'Often communicates by pointing, facial expressions or gestures' },
      { id: 'y27', to: ['tsutaeru:t6'], ja: '話すときより、文字やチャットのときのほうが長く伝える', en: 'Says more in writing or chat than when speaking' },
    ],
  },
  {
    id: 'sousa', ja: '操作する', en: 'Using devices',
    items: [
      { id: 'y28', to: ['sousa:s1'], ja: 'タブレットで、押したいところと違うところが反応する', en: 'On a tablet, a different spot from the one they meant responds' },
      { id: 'y29', to: ['sousa:s1'], ja: 'タップが長押しになる', en: 'Taps turn into long presses' },
      { id: 'y30', to: ['sousa:s2'], ja: 'マウスのクリックやドラッグで、ポインターがずれる', en: 'The pointer slips when clicking or dragging with a mouse' },
      { id: 'y31', to: ['sousa:s3'], ja: 'キーボードで1文字打つのに時間がかかる・違うキーを押す', en: 'Takes a long time to type a letter, or presses the wrong key' },
      { id: 'y32', to: ['sousa:s4', 'sousa:s5'], ja: '手や指を動かせる範囲が限られている', en: 'The range of movement of hands or fingers is limited' },
      { id: 'y33', to: ['sousa:s6', 'mitoosu:p4'], ja: 'アプリの操作の途中で手が止まり、大人を呼ぶ', en: 'Stops partway through using an app and calls an adult' },
    ],
  },
  {
    id: 'mitoosu', ja: '見通し・切りかえ', en: 'Planning and transitions',
    items: [
      { id: 'y34', to: ['mitoosu:p1'], ja: '「次は何？」と何度もたずねる', en: 'Asks "what\'s next?" many times' },
      { id: 'y35', to: ['mitoosu:p2'], ja: '「あと何分？」と何度もたずねる', en: 'Asks "how many minutes left?" many times' },
      { id: 'y36', to: ['mitoosu:p5', 'mitoosu:p2'], ja: '終わりの合図のあとも、その活動を続ける', en: 'Keeps doing an activity after the signal to finish' },
      { id: 'y37', to: ['mitoosu:p3'], ja: '持ち物や提出物を忘れる日が、週に何度かある', en: 'Forgets belongings or homework several days a week' },
      { id: 'y38', to: ['mitoosu:p4'], ja: '手順の多い作業で、途中で手が止まる', en: 'Stops partway through tasks with many steps' },
      { id: 'y39', to: ['mitoosu:p6', 'mitoosu:p1'], ja: '時間割や予定が変わった日に、泣く・動けなくなる・その場を離れる', en: 'On days when the timetable or plans change, cries, freezes, or leaves the place' },
    ],
  },
];

export const SUGGEST_MAX = 5; // 「提案」として一番上に出す候補の数
