// English version of the "needs" pages. Same ids as methods.ts so pages line up.
// Feature names follow each platform's English interface. Japan-specific services are marked "(Japan)".
import type { Content } from './methods';

export const CHECKED_EN = '27 September 2026';

export const KIND_LABEL_EN = {
  os: 'Try first: built-in features',
  tool: 'Tools and apps',
  env: 'Changes to the environment and support',
} as const;

export const CONTENT_EN: Record<string, Content> = {
  yomu: {
    lead: 'Reading takes a long time, is tiring, or the meaning does not stick. Reading difficulties can happen at several stages: following the text with your eyes, linking letters to sounds, or grasping the meaning. Sharing the load of reading with a tool frees up energy for thinking about the content.',
    situations: [
      { id: 'r1', label: 'Reading is slow or tiring' },
      { id: 'r2', label: 'I skip lines or read the same line again' },
      { id: 'r3', label: 'Text is too small, hard to see, or too bright' },
      { id: 'r4', label: 'I cannot read some words (e.g. kanji)' },
      { id: 'r5', label: 'The meaning does not stick' },
      { id: 'r6', label: 'Paper textbooks and handouts are hard to read' },
    ],
    methods: [
      {
        id: 'yomiage', kind: 'os', title: 'Listen with text-to-speech',
        summary: 'The device reads on-screen text aloud. Combined with highlighting of the current word, you can follow with both eyes and ears. You can also change the speed.',
        devices: [
          { name: 'iPad / iPhone', how: 'Settings > Accessibility > Spoken Content ("Speak Selection", "Speak Screen", "Highlight Content")' },
          { name: 'Chromebook', how: 'Settings > Accessibility > Text-to-Speech > "Select-to-speak"' },
          { name: 'Windows', how: 'Microsoft Edge "Read aloud", or Immersive Reader' },
          { name: 'Android', how: 'Settings > Accessibility > "Select to Speak"' },
        ],
        situations: ['r1', 'r4', 'r5', 'r6'],
        keywords: ['read aloud', 'text to speech', 'tts', 'listen', 'audio', 'slow', 'tired', 'dyslexia', 'speak'],
      },
      {
        id: 'reader', kind: 'os', title: 'Switch to a reading view',
        summary: 'Removes ads and clutter and shows just the text, larger and with more space between lines. Some views can show only a few lines at a time.',
        devices: [
          { name: 'iPad / iPhone', how: 'Safari "Reader"' },
          { name: 'Windows', how: 'Microsoft Edge "Immersive Reader" ("Line focus" shows 1–5 lines)' },
          { name: 'Chromebook', how: 'Chrome "Reading mode"' },
        ],
        situations: ['r1', 'r2', 'r3', 'r5'],
        keywords: ['reader', 'reading mode', 'immersive reader', 'line', 'skip', 'clutter', 'spacing'],
      },
      {
        id: 'kakudai', kind: 'os', title: 'Make text bigger and easier to see',
        summary: 'Change text size and weight, zoom the screen, invert colors or adjust color. You can also use the camera to magnify printed text.',
        devices: [
          { name: 'iPad / iPhone', how: 'Settings > Accessibility > "Display & Text Size", "Zoom"; the "Magnifier" app' },
          { name: 'Chromebook', how: 'Settings > Accessibility > "Magnifier" (full-screen or docked), text size' },
          { name: 'Windows', how: '"Magnifier" (Windows logo key + Plus), Settings > Accessibility > Text size' },
          { name: 'Android', how: 'Settings > Accessibility > "Magnification", display size and text' },
        ],
        situations: ['r3'],
        keywords: ['small', 'see', 'zoom', 'bigger', 'magnify', 'low vision', 'bright', 'glare', 'invert', 'color', 'contrast'],
      },
      {
        id: 'ocr', kind: 'tool', title: 'Scan printed text with the camera and listen',
        summary: 'Take a photo of a handout or book and turn the text in the picture into digital text. Copy it into text-to-speech to listen to printed text.',
        devices: [
          { name: 'iPad / iPhone', how: '"Live Text" in Camera and Photos' },
          { name: 'Android / Chromebook', how: '"Google Lens"' },
        ],
        situations: ['r6', 'r4', 'r1'],
        keywords: ['paper', 'handout', 'photo', 'camera', 'scan', 'ocr', 'print', 'book', 'worksheet'],
      },
      {
        id: 'onsei-kyozai', kind: 'tool', title: 'Accessible digital textbooks (Japan)',
        summary: 'In Japan, students who find reading difficult can apply to use digital versions of their textbooks with text-to-speech, such as Multimedia DAISY textbooks, AccessReading and UD Browser. Many countries have similar services for accessible educational materials.',
        tips: ['Details for Japan are on the Ministry of Education (MEXT) "音声教材" page, in Japanese.'],
        situations: ['r6', 'r4', 'r1', 'r5'],
        keywords: ['textbook', 'daisy', 'accessible', 'digital textbook', 'accessreading', 'ud browser'],
      },
      {
        id: 'ruby', kind: 'tool', title: 'Add reading aids to difficult words',
        summary: 'In Japanese, small "ruby" letters above kanji show how to read them. Similar help in other languages includes built-in dictionaries and picture dictionaries.',
        devices: [
          { name: 'Word', how: '"Phonetic Guide" (Japanese ruby)' },
          { name: 'Windows', how: 'Immersive Reader "Picture dictionary"' },
        ],
        situations: ['r4'],
        keywords: ['kanji', 'ruby', 'furigana', 'word', 'vocabulary', 'dictionary', 'cannot read'],
      },
      {
        id: 'slit', kind: 'env', title: 'Make lines easier to follow',
        summary: 'A reading guide (a strip with a window that shows only one line) or a ruler helps prevent skipping lines. Changing the color of alternate lines can also help.',
        situations: ['r2', 'r1'],
        keywords: ['line', 'skip', 'reading guide', 'ruler', 'lose place', 'same line'],
      },
      {
        id: 'wakete', kind: 'env', title: 'Read in chunks and get the big picture first',
        summary: 'Read one paragraph at a time, check the headings and questions before reading, or listen while reading. Changing how you read can make the meaning easier to grasp.',
        situations: ['r5', 'r1'],
        keywords: ['meaning', 'understand', 'comprehension', 'summary', 'long text'],
      },
    ],
    points: {
      sensei: 'Listening with text-to-speech is still learning the content. Agree with the student and family how it can be used for tests and assignments, and record it in the individual plan or as a reasonable accommodation so it carries over to the next year.',
      honnin: 'Try just one method first, and keep the one that felt easiest. What feels easy is different for everyone.',
      tsukuru: 'Combine read-aloud with highlighting and let users change the speed; more people will be able to use it.',
    },
  },

  kaku: {
    lead: 'Forming letters, keeping them in the boxes, writing a lot. Writing combines hand movement, remembering letters, and putting ideas into words. Handing part of the job to a tool frees up energy for thinking and expressing ideas.',
    situations: [
      { id: 'w1', label: 'Writing by hand is slow or tiring' },
      { id: 'w2', label: 'Letters are uneven or go outside the lines' },
      { id: 'w3', label: 'I cannot remember how to write some words' },
      { id: 'w4', label: 'I cannot copy from the board in time' },
      { id: 'w5', label: 'Organising ideas into sentences is hard' },
      { id: 'w6', label: 'Pencils and pens are hard to hold' },
    ],
    methods: [
      {
        id: 'onsei-nyuryoku', kind: 'os', title: 'Write with your voice (dictation)',
        summary: 'What you say becomes text. On most devices you can say "comma" and "period" to add punctuation.',
        devices: [
          { name: 'iPad / iPhone', how: 'The microphone key on the keyboard' },
          { name: 'Chromebook', how: 'Settings > Accessibility > "Dictation"' },
          { name: 'Windows', how: '"Voice typing" (Windows logo key + H)' },
          { name: 'Android', how: 'The microphone in Gboard' },
        ],
        situations: ['w1', 'w3', 'w5', 'w6', 'w2'],
        keywords: ['voice', 'dictation', 'speak', 'microphone', 'cannot write', 'tired', 'dysgraphia', 'handwriting'],
      },
      {
        id: 'keyboard', kind: 'os', title: 'Type with a keyboard and word prediction',
        summary: 'Choose the input that suits you. Word prediction lets you pick words from suggestions instead of spelling everything.',
        tips: ['Even if you cannot remember how to write a word, you can often type it by sound and choose from the suggestions.'],
        situations: ['w1', 'w2', 'w3', 'w6'],
        keywords: ['typing', 'keyboard', 'prediction', 'spelling', 'messy handwriting', 'cannot write', 'remember'],
      },
      {
        id: 'shashin', kind: 'os', title: 'Take a photo instead of copying',
        summary: 'Photograph the board or slides with your device, or ask the teacher to share them digitally. You can focus on listening and thinking instead of copying.',
        situations: ['w4'],
        keywords: ['board', 'copy', 'copying', 'notes', 'photo', 'slides', 'in time', 'whiteboard'],
      },
      {
        id: 'pdf', kind: 'tool', title: 'Fill in worksheets on a device',
        summary: 'Turn a worksheet into a photo or PDF and write on it with the keyboard or a stylus. You can save and submit it too.',
        devices: [
          { name: 'iPad / iPhone', how: '"Markup" in Photos and Files' },
          { name: 'School apps', how: 'The annotation feature in your school’s learning app' },
        ],
        situations: ['w1', 'w2', 'w6'],
        keywords: ['worksheet', 'pdf', 'annotate', 'stylus', 'submit', 'handout'],
      },
      {
        id: 'yoshi', kind: 'env', title: 'Change the paper and writing tools',
        summary: 'Larger boxes, darker and thicker lines, pencil grips, smoother pens and non-slip mats all change how easy writing is.',
        situations: ['w2', 'w6', 'w1'],
        keywords: ['lines', 'grip', 'pencil', 'pen', 'paper', 'messy handwriting', 'hold', 'pressure'],
      },
      {
        id: 'ryo', kind: 'env', title: 'Write less, or answer in another way',
        summary: 'Fill-in-the-blank worksheets, multiple choice, keywords only, or answering out loud. Change the amount and form of writing to match the goal.',
        situations: ['w1', 'w4', 'w5'],
        keywords: ['too much writing', 'fill in', 'multiple choice', 'oral', 'tired'],
      },
      {
        id: 'seiri', kind: 'tool', title: 'Map your ideas before writing',
        summary: 'Put ideas on sticky notes or in a mind-mapping app first. Arrange them, then turn them into sentences.',
        situations: ['w5'],
        keywords: ['organise', 'organize', 'essay', 'ideas', 'mind map', 'structure', 'composition'],
      },
    ],
    points: {
      sensei: 'Separate "writing by hand" as a goal from "expressing ideas" as a goal. It makes clear when tools can be used.',
      honnin: 'Start dictation with short sentences. It is fine to fix only the parts that came out wrong afterwards.',
      tsukuru: 'Make answer boxes large and allow both typing and handwriting, so users can choose.',
    },
  },

  kiku: {
    lead: 'Catching what people say, focusing in noisy places, understanding by sight. Listening and seeing difficulties are about hearing and vision, but also about attention and the amount of information. Turning sound into text, and words into pictures, makes information easier to take in.',
    situations: [
      { id: 'h1', label: 'Spoken words are hard to catch, or I miss them' },
      { id: 'h2', label: 'Audio in videos or announcements is hard to follow' },
      { id: 'h3', label: 'Background noise makes it hard to focus' },
      { id: 'h4', label: 'I cannot remember spoken instructions' },
      { id: 'h5', label: 'Text and diagrams are hard to see or tell apart' },
      { id: 'h6', label: 'It is hard to keep up in online classes or meetings' },
    ],
    methods: [
      {
        id: 'caption', kind: 'os', title: 'Turn on live captions',
        summary: 'Shows speech — from the device or from people talking — as text, in real time.',
        devices: [
          { name: 'iPad / iPhone', how: 'Settings > Accessibility > "Live Captions"' },
          { name: 'Windows 11', how: '"Live captions" (Windows logo key + Ctrl + L)' },
          { name: 'Chromebook', how: 'Settings > Accessibility > "Live Caption"' },
          { name: 'YouTube', how: 'The "CC" button (auto-generated captions)' },
        ],
        situations: ['h1', 'h2', 'h6'],
        keywords: ['captions', 'subtitles', 'deaf', 'hard of hearing', 'hearing', 'video', 'transcribe'],
      },
      {
        id: 'mojiokoshi', kind: 'tool', title: 'Use a transcription app for conversations',
        summary: 'Transcribes the conversation in front of you. Online meeting apps also have caption features.',
        devices: [
          { name: 'Android', how: '"Live Transcribe"' },
          { name: 'Apps', how: 'Conversation transcription apps (e.g. UD Talk in Japan)' },
          { name: 'Online meetings', how: 'Captions in Teams, Google Meet and Zoom' },
        ],
        situations: ['h1', 'h6'],
        keywords: ['conversation', 'transcription', 'meeting', 'online', 'deaf', 'hearing'],
      },
      {
        id: 'shikaku', kind: 'env', title: 'Add visual cues',
        summary: 'Show key points on the board or on cards, use photos or pictures for steps, and say "I will tell you three things" before you start. Make spoken information something you can also check by eye.',
        situations: ['h4', 'h1'],
        keywords: ['remember', 'instructions', 'verbal', 'visual supports', 'picture cards', 'forget'],
      },
      {
        id: 'oto', kind: 'env', title: 'Adjust the sound environment',
        summary: 'Think about where to sit, use ear defenders or noise cancelling, and provide a quiet space. For people with hearing loss, there are assistive listening devices that send the teacher’s voice directly.',
        situations: ['h3', 'h1'],
        keywords: ['noise', 'noisy', 'loud', 'ear defenders', 'focus', 'sensory', 'hearing aid'],
      },
      {
        id: 'sokudo', kind: 'os', title: 'Slow videos down and rewatch',
        summary: 'Lower the playback speed, watch with captions, and record lessons so they can be watched again.',
        situations: ['h2', 'h4'],
        keywords: ['fast', 'playback speed', 'record', 'rewatch', 'repeat'],
      },
      {
        id: 'mieru', kind: 'os', title: 'Set up the display to be easier to see',
        summary: 'Zoom, text size, contrast, color inversion and color filters, and a larger pointer. See "Make text bigger and easier to see" on the Reading page.',
        situations: ['h5'],
        keywords: ['hard to see', 'low vision', 'color', 'zoom', 'contrast', 'color blind'],
      },
    ],
    points: {
      sensei: 'Captions help not only students who find hearing hard, but also those whose attention wanders. Turning captions on for the whole class means no one stands out.',
      honnin: 'Captions and transcription are more accurate when the device is placed where the speaker’s voice reaches it clearly.',
      tsukuru: 'Add captions to video materials, plus diagrams that make the steps clear without sound.',
    },
  },

  tsutaeru: {
    lead: 'Even when speaking or finding words is hard, there is always something a person wants to say. AAC (augmentative and alternative communication) combines voice, text, pictures and devices to give people more ways to communicate.',
    situations: [
      { id: 't1', label: 'Speaking is difficult' },
      { id: 't2', label: 'Finding or choosing words takes time' },
      { id: 't3', label: 'I want to say "yes / no" or "I want / I don’t want"' },
      { id: 't4', label: 'I cannot speak in front of people or in new situations' },
      { id: 't5', label: 'I want to say when I don’t understand or need help' },
      { id: 't6', label: 'Writing is easier for me than speaking' },
    ],
    methods: [
      {
        id: 'ekado', kind: 'tool', title: 'Picture cards and communication boards',
        summary: 'Point to or hand over photos and pictures. Start with a small set of often-used words, and include "I don’t understand", "Again, please" and "I need a break".',
        situations: ['t1', 't2', 't3', 't5'],
        keywords: ['picture cards', 'communication board', 'symbols', 'nonverbal', 'cannot speak', 'pointing'],
      },
      {
        id: 'voca', kind: 'tool', title: 'Voice output devices (VOCA)',
        summary: 'Press a button and a recorded voice plays. Devices range from a single button to many.',
        situations: ['t1', 't3'],
        keywords: ['voca', 'voice output', 'button', 'switch', 'yes', 'no', 'speech device'],
      },
      {
        id: 'aac-app', kind: 'tool', title: 'AAC apps on a tablet',
        summary: 'Choose pictures or words and the tablet speaks them. Some apps let you add your own photos and voice (e.g. DropTalk, Yubidenwa, TalkingAid in Japan).',
        situations: ['t1', 't2'],
        keywords: ['app', 'aac', 'tablet', 'ipad', 'speak', 'communication app'],
      },
      {
        id: 'moji', kind: 'os', title: 'Communicate in writing',
        summary: 'Write in a notes app and show it, chat by text, or let the device read your typed words aloud.',
        devices: [
          { name: 'iPad / iPhone', how: 'Settings > Accessibility > "Live Speech" (speaks what you type)' },
          { name: 'Any device', how: 'Notes apps, chat' },
        ],
        situations: ['t4', 't6', 't1'],
        keywords: ['write it down', 'chat', 'texting', 'notes app', 'live speech', 'selective mutism', 'nervous', 'cannot speak'],
      },
      {
        id: 'bamen', kind: 'env', title: 'Make communication easier for the speaker',
        summary: 'Offer choices, give time to answer, share questions in advance, and agree on how the person will respond. How the listener behaves makes a big difference.',
        situations: ['t4', 't5', 't2'],
        keywords: ['wait', 'choices', 'nervous', 'thinking time', 'questions'],
      },
      {
        id: 'shokai', kind: 'env', title: 'Put your communication style on one page',
        summary: 'Summarise how you communicate, what you are good at, what is hard, and what helps when you are stuck. Give it to people you meet for the first time.',
        situations: ['t4', 't5'],
        keywords: ['profile', 'introduce', 'passport', 'new people', 'handover'],
      },
    ],
    points: {
      sensei: 'Research shows AAC does not hold back the development of speech. Rather than waiting until a child can talk, focus on adding ways they can communicate now.',
      honnin: 'Using the same cards and words at home, at school and in shops makes them easier to learn.',
      tsukuru: 'When adding vocabulary, order it by frequency and never move a word once placed. Many users remember words by position.',
    },
  },

  sousa: {
    lead: 'Even if touch, mouse or keyboard are hard to use, you can change the way you give input to match the parts of your body that move most easily.',
    situations: [
      { id: 's1', label: 'Taps land in the wrong place or become long presses' },
      { id: 's2', label: 'A mouse or trackpad is hard to use' },
      { id: 's3', label: 'Typing on a keyboard is hard' },
      { id: 's4', label: 'Only some parts of my body move easily' },
      { id: 's5', label: 'I want to use a device without my hands' },
      { id: 's6', label: 'Too many steps; I get lost' },
    ],
    methods: [
      {
        id: 'touch', kind: 'os', title: 'Adjust how touch works',
        summary: 'Require a longer touch before it registers, ignore repeated touches, or use an on-screen button menu.',
        devices: [
          { name: 'iPad / iPhone', how: 'Settings > Accessibility > Touch > "Touch Accommodations", "AssistiveTouch"' },
          { name: 'Android', how: 'Settings > Accessibility > "Touch & hold delay" and more' },
        ],
        situations: ['s1'],
        keywords: ['touch', 'tap', 'long press', 'accidental', 'tremor', 'shaky'],
      },
      {
        id: 'mouse', kind: 'tool', title: 'Use an alternative to the mouse',
        summary: 'Trackballs, joysticks and mice with large buttons are available. A larger, slower pointer can also help.',
        situations: ['s2', 's4'],
        keywords: ['mouse', 'trackball', 'joystick', 'pointer', 'click', 'cursor'],
      },
      {
        id: 'kotei', kind: 'os', title: 'Keyboard settings and aids',
        summary: '"Sticky Keys" lets you press Shift and other keys one after another instead of together. A keyguard frame stops neighbouring keys being pressed by mistake.',
        devices: [
          { name: 'Windows', how: 'Settings > Accessibility > Keyboard > "Sticky keys"' },
          { name: 'Chromebook', how: 'Settings > Accessibility > Keyboard > "Sticky keys"' },
          { name: 'iPad', how: 'Settings > Accessibility > Keyboards ("Sticky Keys" for hardware keyboards)' },
        ],
        situations: ['s3'],
        keywords: ['keyboard', 'sticky keys', 'keyguard', 'typing', 'two keys'],
      },
      {
        id: 'switch', kind: 'os', title: 'Use switches',
        summary: 'Connect an easy-to-press switch. Items on screen are highlighted one by one, and you press the switch to choose. One movement is enough.',
        devices: [
          { name: 'iPad / iPhone', how: 'Settings > Accessibility > "Switch Control"' },
          { name: 'Chromebook', how: 'Settings > Accessibility > "Switch Access"' },
          { name: 'Android', how: 'Settings > Accessibility > "Switch Access"' },
        ],
        tips: ['Connecting a switch may require a switch interface.'],
        situations: ['s4', 's5'],
        keywords: ['switch', 'button', 'scanning', 'physical disability', 'switch control'],
      },
      {
        id: 'shisen', kind: 'os', title: 'Control with your eyes or face',
        summary: 'Move the pointer with your gaze or head and face movements, and select by looking or making a facial gesture.',
        devices: [
          { name: 'iPad', how: 'Settings > Accessibility > "Eye Tracking" (iPadOS 18 or later)' },
          { name: 'Chromebook', how: 'Settings > Accessibility > "Face control"' },
          { name: 'Dedicated devices', how: 'Eye-gaze systems' },
        ],
        situations: ['s5', 's4'],
        keywords: ['eye', 'gaze', 'eye tracking', 'face', 'head', 'hands-free'],
      },
      {
        id: 'koe', kind: 'os', title: 'Control with your voice',
        summary: 'Say commands such as "Go home" or "Tap [name]" to operate the device.',
        devices: [{ name: 'iPad / iPhone', how: 'Settings > Accessibility > "Voice Control"' }],
        situations: ['s5'],
        keywords: ['voice', 'commands', 'voice control', 'speak', 'hands-free'],
      },
      {
        id: 'simple', kind: 'os', title: 'Simplify the screen',
        summary: 'Show only the apps you need, with large buttons, or lock the device to a single app.',
        devices: [
          { name: 'iPad / iPhone', how: 'Settings > Accessibility > "Assistive Access", "Guided Access"' },
        ],
        situations: ['s6'],
        keywords: ['lost', 'complicated', 'simple', 'mistakes', 'lock', 'guided access', 'assistive access'],
      },
    ],
    points: {
      sensei: 'Assess access methods together with an occupational therapist (OT) or similar professional, so posture and fatigue are taken into account.',
      honnin: 'A method that works can stop working when you are tired. Try it at different times of day.',
      tsukuru: 'Large buttons with space between them, and generous time limits, make your app work with many input methods.',
    },
  },

  mitoosu: {
    lead: 'What happens next? When does it end? How much do I need to do? Not knowing can cause anxiety and make it hard to get started. Making plans, time and steps visible helps people act on their own.',
    situations: [
      { id: 'p1', label: 'Not knowing what comes next makes me anxious' },
      { id: 'p2', label: 'It is hard to sense time (when will it end?)' },
      { id: 'p3', label: 'I forget tasks or things to bring' },
      { id: 'p4', label: 'Tasks with many steps trip me up' },
      { id: 'p5', label: 'Switching from one activity to another is hard' },
      { id: 'p6', label: 'Changes to plans are hard for me' },
    ],
    methods: [
      {
        id: 'schedule', kind: 'env', title: 'Make the schedule visible',
        summary: 'Show the day in pictures, photos and words. Mark each item when it is done. Announce changes early, using a "change" card.',
        situations: ['p1', 'p6'],
        keywords: ['schedule', 'plan', 'anxiety', 'change', 'routine', 'visual schedule'],
      },
      {
        id: 'timer', kind: 'tool', title: 'Use a visual timer',
        summary: 'A timer where a colored area shrinks shows "how much longer" even to people who cannot read numbers. A sound or vibration shortly before the end also helps.',
        situations: ['p2', 'p5'],
        keywords: ['timer', 'time left', 'sense of time', 'how long', 'remaining', 'clock', 'transition'],
      },
      {
        id: 'reminder', kind: 'os', title: 'Reminders and checklists',
        summary: 'Use reminders that alert you at a set time or place. A checklist with photos makes it easier to check what to bring.',
        devices: [
          { name: 'iPad / iPhone', how: 'The "Reminders" app' },
          { name: 'Android / Chromebook', how: '"Google Keep" or "Google Calendar"' },
          { name: 'Windows', how: '"Microsoft To Do"' },
        ],
        situations: ['p3'],
        keywords: ['forget', 'reminder', 'alarm', 'checklist', 'things to bring', 'homework'],
      },
      {
        id: 'tejun', kind: 'env', title: 'Make step-by-step guides with photos or video',
        summary: 'Show one step per page with a photo, or follow a model video. Tick each step when done.',
        situations: ['p4'],
        keywords: ['steps', 'how to', 'task', 'instructions', 'video', 'guide'],
      },
      {
        id: 'shuchu', kind: 'os', title: 'Device settings that help focus',
        summary: 'Turn off notifications with Focus modes, or lock the device to one app, to reduce distractions.',
        devices: [
          { name: 'iPad / iPhone', how: 'Settings > "Focus"; Accessibility > "Guided Access"' },
          { name: 'Windows', how: '"Focus" and "Do not disturb"' },
          { name: 'Android', how: '"Do Not Disturb"' },
        ],
        situations: ['p5', 'p1'],
        keywords: ['focus', 'notifications', 'distracted', 'games', 'videos', 'cannot stop'],
      },
      {
        id: 'kimochi', kind: 'env', title: 'A calm space and signals for feelings',
        summary: 'Agree on a place to calm down, show the strength of feelings with a "thermometer" card, and have a card to ask for a break, so people can manage their own feelings.',
        situations: ['p5', 'p6'],
        keywords: ['feelings', 'emotions', 'meltdown', 'break', 'calm down', 'frustrated'],
      },
    ],
    points: {
      sensei: 'Gradually turn schedules and step guides from "tools the teacher manages" into "tools the student uses"; this builds independence.',
      honnin: 'Using the same style of schedule and cards at home and at school makes things clearer when places change.',
      tsukuru: 'Schedule apps are easiest to use when people can add their own photos, reorder items, and see which items are done.',
    },
  },
};
