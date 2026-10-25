/**
 * EORACCO website inquiries.
 * Deployed as a Google Apps Script web app from the "EORACCO Inquiries" Google Sheet.
 * The website POSTs the contact form here; each inquiry is added as a row in the sheet
 * and emailed to the owner, with Reply-To set to the customer so replying just works.
 */
const OWNER_EMAIL = 'eoraccoofficial@gmail.com';
const SHEET_NAME = 'Inquiries';
const HEADERS = ['Received (PT)', 'Name', 'Email', 'Business', 'Phone', 'Needs', 'Message', 'Plan', 'Site language'];

// Limits that keep a spam flood from filling the sheet or using up the daily email quota.
const MAX_PER_EMAIL_PER_HOUR = 3;
const MAX_PER_HOUR = 30;
const MIN_FILL_MS = 2500;

function doPost(e) {
  const p = (e && e.parameter) || {};
  // strip control characters (keeps line breaks in the message), trim and cap length
  const clip = (v, n) => String(v || '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, n);
  const oneLine = (v) => v.replace(/[\r\n]+/g, ' ');

  // Bots fill the hidden "website" field, or submit faster than a person can type.
  if (p.website) return json_({ ok: true });
  if (Number(p.t || 0) < MIN_FILL_MS) return json_({ ok: true });
  if (JSON.stringify(p).length > 8000) return json_({ ok: false, error: 'too_large' });

  const row = {
    name: clip(p.name, 120),
    email: clip(p.email, 160),
    business: clip(p.business, 160),
    phone: clip(p.phone, 40),
    need: clip(p.need, 120),
    message: clip(p.message, 3000),
    plan: clip(p.plan, 1500),
    lang: clip(p.lang, 8),
  };
  if (!row.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) return json_({ ok: false, error: 'invalid' });
  ['name', 'email', 'business', 'phone', 'need', 'plan', 'lang'].forEach((k) => { row[k] = oneLine(row[k]); });

  // Rate limits: per email address and across the whole form.
  const cache = CacheService.getScriptCache();
  const hourKey = 'h:' + Utilities.formatDate(new Date(), 'UTC', 'yyyyMMddHH');
  const mailKey = 'e:' + row.email.toLowerCase();
  const perHour = Number(cache.get(hourKey) || 0);
  const perMail = Number(cache.get(mailKey) || 0);
  if (perHour >= MAX_PER_HOUR || perMail >= MAX_PER_EMAIL_PER_HOUR) return json_({ ok: false, error: 'rate_limited' });
  cache.put(hourKey, String(perHour + 1), 3600);
  cache.put(mailKey, String(perMail + 1), 3600);

  // Only one write at a time, so rows never collide.
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = sheet_();
    const when = Utilities.formatDate(new Date(), 'America/Los_Angeles', 'yyyy-MM-dd HH:mm');
    // cell() stops text like =IMPORTXML(...) from running as a formula when the sheet is opened
    sheet.appendRow([when, cell_(row.name), cell_(row.email), cell_(row.business), cell_(row.phone), cell_(row.need), cell_(row.message), cell_(row.plan), cell_(row.lang)]);
  } finally {
    lock.releaseLock();
  }

  const lines = [
    'New inquiry from eoracco website / 网站新询盘',
    '',
    'Name 姓名: ' + row.name,
    'Email 邮箱: ' + row.email,
    'Business 公司: ' + (row.business || '-'),
    'Phone 电话: ' + (row.phone || '-'),
    'Needs 需求: ' + (row.need || '-'),
    '',
    'Message 备注:',
    row.message || '-',
    '',
    'Plan 方案: ' + (row.plan || '-'),
    'Site language 网站语言: ' + (row.lang || '-'),
    '',
    'All inquiries: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
  ];
  MailApp.sendEmail({
    to: OWNER_EMAIL,
    replyTo: row.email,
    name: 'EORACCO Website',
    subject: 'New inquiry: ' + row.name + (row.need ? ' (' + row.need + ')' : ''),
    body: lines.join('\n'),
  });

  return json_({ ok: true });
}

function doGet() {
  return json_({ ok: true, service: 'eoracco-inquiries' });
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sh;
}

function cell_(v) {
  return /^[=+\-@\t\r]/.test(v) ? "'" + v : v;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
