/**
 * toi toi toi サイト用 GAS（お問い合わせ・閲覧数・運営者ページ）
 * https://github.com/toitoitoi-lab/toitoitoi-lab.github.io/tree/main/backend
 * v1.6  2026-10-18  MIT License
 *   v1.5 からの変更：用件に「まちがいの指摘・情報提供」「アプリを子どもに合わせて調整したい」を追加（どちらも優先3）
 *   v1.4 → v1.5 の変更：急ぎ度に「急ぎではない（感想・ご報告など）」を追加（優先は「いつでもよい」と同じ扱い）
 *   v1.3 → v1.4 の変更：用件を複数選べるようにした（スプレッドシートの「用件」には、選んだものを「、」でつないで記録）
 *   v1.2 → v1.3 の変更：
 *   - 通知は「1日1回、20時台に、まとめて1通」にした（届くたびに鳴らない）。新しい問い合わせがない日は送らない
 *   - まとめの通知では、優先1（今まさに現場で困っている など）を先頭に、目立つ印で並べる
 *   - 関数 setupDigest を1回実行すると、毎日のまとめ通知が動き出す
 *   v1.1 → v1.2 の変更：
 *   - 問い合わせを分類する（用件・急ぎ度・返信の要否・立場・わかり方・対象アプリ）
 *   - 優先（1〜4）を自動で付け、通知の件名に【優先1】【返信要】のように出す
 *   - 返信不要のときは、メールアドレスを書かなくても送れる
 *   - 迷惑な書き込みの対策を強める（リンクだらけ・同じ内容の連投を捨てる）
 *
 * ■ できること
 *  1. お問い合わせフォームの受付：スプレッドシートに記録し、運営者にメールで知らせる
 *  2. 閲覧数：ページが開かれた回数を「日付・ページ」ごとに数える（個人を特定する情報は記録しない）
 *  3. 運営者ページ：パスワードが合ったときだけ、未対応の件数と閲覧数を返す
 *
 * ■ スクリプト プロパティ（歯車 → プロジェクトの設定 → スクリプト プロパティ）
 *  ADMIN_PW     … 運営者ページのパスワード（必須。12文字以上。ほかで使っていないもの）
 *  NOTIFY_EMAIL … 通知を受け取るメールアドレス。カンマ区切りで複数OK。省略すると、この GAS の持ち主のアドレス
 *  SHEET_ID     … 自動で入ります（最初に setup を実行したとき）
 *
 * ■ はじめに一度だけ
 *  上のメニューで関数「setup」を選んで ▶実行 → 権限を許可。記録用のスプレッドシートができます。
 *  続けて関数「setupDigest」を ▶実行 → 毎日20時台のまとめ通知が動き出します。
 *  そのあと「デプロイ → 新しいデプロイ → ウェブアプリ」
 *    次のユーザーとして実行：自分 ／ アクセスできるユーザー：全員
 */

const SHEET_CONTACT = '問い合わせ';
const SHEET_VIEWS = '閲覧数';
const STATUS_OPEN = '未対応';
const MAX_CONTACTS_PER_HOUR = 20;   // 1時間に受けつける問い合わせの上限（いたずら対策）
const MAX_LINKS = 3;                // 本文のリンク（http）がこれより多い送信は、受けつけたふりをして捨てる
const DUP_MINUTES = 10;             // 同じ本文がこの時間内にもう一度来たら捨てる（二重送信・連投）
const MAX_LOGIN_FAILS = 5;          // パスワードをこの回数まちがえると…
const LOCK_MINUTES = 15;            // …この時間、ログインを受けつけない
const TOKEN_DAYS = 90;              // 「このブラウザでお知らせを表示」の有効期間
const DIGEST_HOUR = 20;             // まとめ通知の時刻（日本時間。20 なら 20時台のどこかで届く）。変えたら setupDigest をもう一度実行

// 用件・急ぎ度（サイトのフォームと同じ記号）
const PURPOSES = {
  shiteki: 'まちがいの指摘・情報提供', iken: '感想・サイトへの意見', app: 'アプリの不具合・要望',
  chosei: 'アプリを子どもに合わせて調整したい', riyou: '記事・教材を使いたい', kenshu: '研修・講演の依頼',
  renkei: '共有・取材・連携', soudan: '困りごとの相談',
};
const URGENCY = { kyu: '今まさに現場で困っている', week: '今週中だと助かる', itsu: 'いつでもよい', nashi: '急ぎではない（感想・ご報告など）' };
const WAKARI = ['見る', '聞く', '話す', '動く', '感じる', '見通す'];
// スプレッドシートの列（順番を変えるときは、ここだけ直す）
const HEAD = ['受付日時', '対応状況', '優先', '用件', '急ぎ度', '返信', '呼び名', 'メール', '立場', '困りごとの区分', 'わかり方', '対象アプリ・ページ', '内容', '研修の日程・人数など', '使いたいページ', '言語'];

// ───────── はじめに一度だけ実行 ─────────
function setup() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('SHEET_ID');
  let ss = null;
  if (id) { try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; } }
  if (!ss) {
    ss = SpreadsheetApp.create('toi toi toi 問い合わせ・閲覧数');
    props.setProperty('SHEET_ID', ss.getId());
  }
  let c = ss.getSheetByName(SHEET_CONTACT);
  if (!c) {
    c = ss.getSheets()[0]; c.setName(SHEET_CONTACT);
    c.appendRow(HEAD);
    c.setFrozenRows(1);
    c.getRange('B2:B1000').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList([STATUS_OPEN, '対応中', '対応済み'], true).build());
    // 優先の色（1＝赤、2＝橙、3＝青、4＝灰）
    const r = c.getRange('C2:C1000');
    c.setConditionalFormatRules([
      SpreadsheetApp.newConditionalFormatRule().whenNumberEqualTo(1).setBackground('#F4CCCC').setRanges([r]).build(),
      SpreadsheetApp.newConditionalFormatRule().whenNumberEqualTo(2).setBackground('#FCE5CD').setRanges([r]).build(),
      SpreadsheetApp.newConditionalFormatRule().whenNumberEqualTo(3).setBackground('#CFE2F3').setRanges([r]).build(),
      SpreadsheetApp.newConditionalFormatRule().whenNumberEqualTo(4).setBackground('#EEEEEE').setRanges([r]).build(),
    ]);
  }
  let v = ss.getSheetByName(SHEET_VIEWS);
  if (!v) { v = ss.insertSheet(SHEET_VIEWS); v.appendRow(['日付', 'ページ', '回数']); v.setFrozenRows(1); }
  if (!props.getProperty('ADMIN_PW')) Logger.log('スクリプト プロパティに ADMIN_PW を登録してください。');
  Logger.log('準備ができました：' + ss.getUrl());
}

// ───────── 入口 ─────────
function doGet() {
  return json({ ok: true, name: 'toi toi toi backend', version: '1.5' });
}

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    switch (data.action) {
      case 'contact': return json(handleContact(data));
      case 'hit': handleHit(data); return json({ ok: true });
      case 'login': return json(handleLogin(data));
      case 'status': return json(handleStatus(data));
      case 'logout': return json(handleLogout(data));
      default: return json({ ok: false, error: '不明な操作です。' });
    }
  } catch (err) {
    return json({ ok: false, error: String(err && err.message || err) });
  }
}

// ───────── 1. お問い合わせ ─────────
// 優先：1＝今まさに困っている、または不具合で返信がほしい ／ 2＝返信がほしい ／ 3＝アプリの要望・研修・連携（返信不要） ／ 4＝そのほか
function priority(plist, urgency, reply) {
  const has = (x) => plist.indexOf(x) >= 0;
  if (urgency === 'kyu' || (has('app') && reply)) return 1;
  if (reply) return 2;
  if (has('app') || has('shiteki') || has('chosei') || has('kenshu') || has('renkei')) return 3;
  return 4;
}

function handleContact(d) {
  // いたずら対策：人には見えない欄に入力がある／速すぎる送信は、受けつけたふりをして捨てる
  if (d.website) return { ok: true };
  if (typeof d.elapsed !== 'number' || d.elapsed < 3000) return { ok: true };

  const cache = CacheService.getScriptCache();
  const n = Number(cache.get('contacts_hour') || 0);
  if (n >= MAX_CONTACTS_PER_HOUR) throw new Error('ただいま送信が集中しています。時間をおいて、もう一度お試しください。');

  // 用件は複数選べる（purposes）。古いフォームの purpose（1つ）にも対応
  const plist = (Array.isArray(d.purposes) && d.purposes.length ? d.purposes : [d.purpose])
    .filter((k, i, a) => PURPOSES[k] && a.indexOf(k) === i);
  const urgency = URGENCY[d.urgency] ? d.urgency : '';
  const reply = d.reply === 'yes';
  const email = clip(d.email, 200).trim();
  const body = clip(d.body, 4000);
  if (!plist.length) throw new Error('用件を選んでください。');
  if (!urgency) throw new Error('急ぎ度を選んでください。');
  if (d.reply !== 'yes' && d.reply !== 'no') throw new Error('返信が必要かどうかを選んでください。');
  if ((reply || email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('メールアドレスを確認してください。');
  if (!body.trim()) throw new Error('内容を書いてください。');
  if (d.agree !== true) throw new Error('個人情報の扱いへの同意が必要です。');

  // リンクだらけの送信・同じ本文の連投は、受けつけたふりをして捨てる
  if ((body.match(/https?:\/\//gi) || []).length > MAX_LINKS) return { ok: true };
  const dupKey = 'dup_' + hash(body).slice(0, 40);
  if (cache.get(dupKey)) return { ok: true };

  const wakari = (Array.isArray(d.wakari) ? d.wakari : []).filter((w) => WAKARI.indexOf(w) >= 0);
  const pri = priority(plist, urgency, reply);
  const row = [
    new Date(), STATUS_OPEN, pri, plist.map((k) => PURPOSES[k]).join('、'), URGENCY[urgency], reply ? '要' : '不要',
    clip(d.name, 60), email, clip(d.role, 40),
    clip(Array.isArray(d.komari) ? d.komari.join('、') : '', 200), wakari.join('、'),
    clip(d.target, 200), body, clip(d.event, 1000), clip(d.pages, 1000), d.lang === 'en' ? 'en' : 'ja',
  ].map(safeCell);

  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try { sheet(SHEET_CONTACT).appendRow(row); } finally { lock.releaseLock(); }
  cache.put('contacts_hour', String(n + 1), 3600);
  cache.put(dupKey, '1', DUP_MINUTES * 60);

  // 通知はここでは送らない（毎日のまとめ通知 dailyDigest で、1通にまとめて送る）
  return { ok: true };
}

// ───────── まとめ通知（1日1回） ─────────
// setupDigest：毎日 DIGEST_HOUR 時台に dailyDigest が動くようにする（前の設定は消してから作り直す）
function setupDigest() {
  ScriptApp.getProjectTriggers().filter((tr) => tr.getHandlerFunction() === 'dailyDigest').forEach((tr) => ScriptApp.deleteTrigger(tr));
  ScriptApp.newTrigger('dailyDigest').timeBased().atHour(DIGEST_HOUR).everyDays(1).inTimezone('Asia/Tokyo').create();
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('LAST_DIGEST')) props.setProperty('LAST_DIGEST', String(Date.now()));
  Logger.log('毎日 ' + DIGEST_HOUR + '時台に、新しい問い合わせをまとめて通知します。');
}

// dailyDigest：前回の通知のあとに届いた問い合わせを、1通のメールにまとめて送る。なければ何もしない
function dailyDigest() {
  const props = PropertiesService.getScriptProperties();
  const since = Number(props.getProperty('LAST_DIGEST') || 0);
  const now = Date.now();
  const col = (r, name) => r[HEAD.indexOf(name)];
  const rows = sheetValues(SHEET_CONTACT).filter((r) => r[0] instanceof Date && r[0].getTime() > since);
  props.setProperty('LAST_DIGEST', String(now));
  if (!rows.length) return;
  rows.sort((a, b) => Number(col(a, '優先')) - Number(col(b, '優先')) || a[0] - b[0]);
  const urgent = rows.filter((r) => Number(col(r, '優先')) === 1).length;
  const replyN = rows.filter((r) => col(r, '返信') === '要').length;
  const fmt = (d) => Utilities.formatDate(d, 'Asia/Tokyo', 'M/d HH:mm');
  const prop = props.getProperty('NOTIFY_EMAIL') || Session.getEffectiveUser().getEmail();
  const to = String(prop || '').split(/[,\s]+/).filter(Boolean).join(',');
  if (!to) return;
  // 件名の「📩【toi toi toi】」は Gmail のフィルタの目印。優先1があるときは先頭に【優先1あり】
  const subject = '📩【toi toi toi】' + (urgent ? '【優先1あり】' : '') + 'お問い合わせ ' + rows.length + '件' + (replyN ? '（返信要 ' + replyN + '件）' : '');
  const lines = ['前回の通知のあと、サイトからお問い合わせが ' + rows.length + ' 件届きました。', ''];
  if (urgent) lines.push('★★ 優先1（今まさに現場で困っている／不具合で返信がほしい）が ' + urgent + ' 件あります。先に確認してください ★★', '');
  rows.forEach((r, i) => {
    const p = Number(col(r, '優先'));
    lines.push((p === 1 ? '★ ' : '') + (i + 1) + '. 【優先' + p + '】' + col(r, '用件') + '　' + fmt(r[0]));
    lines.push('   急ぎ度：' + col(r, '急ぎ度') + '／返信：' + col(r, '返信') + '／呼び名：' + (col(r, '呼び名') || '（なし）') + (col(r, '立場') ? '／' + col(r, '立場') : ''));
    if (col(r, '対象アプリ・ページ')) lines.push('   対象：' + col(r, '対象アプリ・ページ'));
  });
  lines.push('', '内容は、次のスプレッドシートで確認してください（Google アカウントでのログインが必要です）。', SpreadsheetApp.openById(sheetId()).getUrl(), '',
    '※ この通知に返信しても、相手には届きません。返信は、スプレッドシートの「メール」あてに、新しいメールで送ってください。',
    '対応したら「対応状況」を「対応済み」に変えると、運営者ページの未対応の数が減ります。');
  // 本文には相談の中身を入れない（メールの転送・誤送信で広がらないように）
  MailApp.sendEmail({ to: to, subject: subject, body: lines.join('\n'), name: 'toi toi toi' });
}

// ───────── 2. 閲覧数 ─────────
function handleHit(d) {
  let path = String(d.path || '');
  if (!/^\/[A-Za-z0-9\-_\/.#]*$/.test(path) || path.length > 120) return;
  path = path.replace(/#.*$/, '').replace(/index\.html$/, '');
  if (path === '/kanri/' || path === '/en/kanri/') return;
  const day = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd');

  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    const sh = sheet(SHEET_VIEWS);
    const key = day + '|' + path;
    const cache = CacheService.getScriptCache();
    let r = Number(cache.get('row_' + key) || 0);
    if (!r) {
      const last = sh.getLastRow();
      if (last >= 2) {
        const n = Math.min(last - 1, 3000); // 最近の行だけ探す
        const vals = sh.getRange(last - n + 1, 1, n, 2).getDisplayValues();
        for (let i = vals.length - 1; i >= 0; i--) {
          if (vals[i][0] === day && vals[i][1] === path) { r = last - n + 1 + i; break; }
        }
      }
    }
    if (r) {
      const c = sh.getRange(r, 3); c.setValue(Number(c.getValue() || 0) + 1);
    } else {
      sh.appendRow([day, path, 1]); r = sh.getLastRow();
      sh.getRange(r, 1).setNumberFormat('@');
    }
    cache.put('row_' + key, String(r), 21600);
  } finally { lock.releaseLock(); }
}

// ───────── 3. 運営者ページ ─────────
function handleLogin(d) {
  const props = PropertiesService.getScriptProperties();
  const pw = props.getProperty('ADMIN_PW');
  if (!pw || pw.length < 12) throw new Error('GAS の ADMIN_PW が未設定か、短すぎます（12文字以上）。');
  const cache = CacheService.getScriptCache();
  const fails = Number(cache.get('login_fails') || 0);
  if (fails >= MAX_LOGIN_FAILS) throw new Error('まちがいが続いたため、' + LOCK_MINUTES + '分間ログインできません。');
  if (!same(String(d.pw || ''), pw)) {
    cache.put('login_fails', String(fails + 1), LOCK_MINUTES * 60);
    Utilities.sleep(800);
    throw new Error('パスワードがちがいます。');
  }
  cache.remove('login_fails');
  const token = Utilities.getUuid() + Utilities.getUuid().slice(0, 8);
  const list = tokens().filter((t) => t.exp > Date.now()).slice(-4);
  list.push({ h: hash(token), exp: Date.now() + TOKEN_DAYS * 864e5 });
  props.setProperty('TOKENS', JSON.stringify(list));
  return { ok: true, token: token, data: summary() };
}

function handleStatus(d) {
  if (!validToken(d.token)) return { ok: false, error: 'ログインの有効期限が切れました。もう一度パスワードを入れてください。', expired: true };
  return { ok: true, data: d.light ? summaryLight() : summary() };
}

function handleLogout(d) {
  const h = hash(String(d.token || ''));
  PropertiesService.getScriptProperties().setProperty('TOKENS', JSON.stringify(tokens().filter((t) => t.h !== h)));
  return { ok: true };
}

function summaryLight() {
  const c = contacts();
  return { open: c.open, openUrgent: c.openUrgent, latest: c.latest };
}

function summary() {
  const c = contacts();
  const tz = 'Asia/Tokyo';
  const now = new Date();
  const days = [];
  for (let i = 13; i >= 0; i--) days.push(Utilities.formatDate(new Date(now.getTime() - i * 864e5), tz, 'yyyy-MM-dd'));
  const d30 = Utilities.formatDate(new Date(now.getTime() - 29 * 864e5), tz, 'yyyy-MM-dd');
  const d7 = days[7];
  const today = days[13];
  const vals = sheetValues(SHEET_VIEWS);
  const perDay = {}; const perPage = {};
  let total = 0, t30 = 0, t7 = 0, tToday = 0;
  vals.forEach((r) => {
    const day = String(r[0]), page = String(r[1]), n = Number(r[2] || 0);
    total += n;
    if (day >= d30) { t30 += n; perPage[page] = (perPage[page] || 0) + n; }
    if (day >= d7) t7 += n;
    if (day === today) tToday += n;
    if (days.indexOf(day) >= 0) perDay[day] = (perDay[day] || 0) + n;
  });
  const top = Object.keys(perPage).map((p) => ({ page: p, n: perPage[p] })).sort((a, b) => b.n - a.n).slice(0, 10);
  return {
    open: c.open, openUrgent: c.openUrgent, latest: c.latest, totalContacts: c.total,
    sheetUrl: SpreadsheetApp.openById(sheetId()).getUrl(),
    views: { today: tToday, week: t7, month: t30, total: total, daily: days.map((day) => ({ day: day, n: perDay[day] || 0 })), top: top },
  };
}

function contacts() {
  const vals = sheetValues(SHEET_CONTACT);
  const iPri = HEAD.indexOf('優先');
  let open = 0, openUrgent = 0, latest = '';
  vals.forEach((r) => {
    if (String(r[1]) === STATUS_OPEN) { open++; if (Number(r[iPri]) === 1) openUrgent++; }
    const t = r[0] instanceof Date ? Utilities.formatDate(r[0], 'Asia/Tokyo', 'yyyy-MM-dd HH:mm') : String(r[0]);
    if (t > latest) latest = t;
  });
  return { open: open, openUrgent: openUrgent, latest: latest, total: vals.length };
}

// ───────── 小さな道具 ─────────
function json(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
function sheetId() {
  const id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  if (!id) throw new Error('準備ができていません（GAS で setup を実行してください）。');
  return id;
}
function sheet(name) { return SpreadsheetApp.openById(sheetId()).getSheetByName(name); }
function sheetValues(name) { const sh = sheet(name); const last = sh.getLastRow(); return last < 2 ? [] : sh.getRange(2, 1, last - 1, sh.getLastColumn()).getValues(); }
function clip(v, n) { return String(v == null ? '' : v).slice(0, n); }
// 「=」などで始まる入力が、スプレッドシートの式として動かないようにする
function safeCell(v) { return (typeof v === 'string' && /^[=+\-@\t\r]/.test(v)) ? "'" + v : v; }
function tokens() { try { return JSON.parse(PropertiesService.getScriptProperties().getProperty('TOKENS') || '[]'); } catch (e) { return []; } }
function validToken(t) { if (!t) return false; const h = hash(String(t)); return tokens().some((x) => x.h === h && x.exp > Date.now()); }
function hash(s) { return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, s, Utilities.Charset.UTF_8)); }
function same(a, b) { const x = hash(a), y = hash(b); let r = 0; for (let i = 0; i < x.length; i++) r |= x.charCodeAt(i) ^ y.charCodeAt(i); return r === 0 && x.length === y.length; }
