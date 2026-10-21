/**
 * EORACCO website inquiries.
 * Deployed as a Google Apps Script web app from the "EORACCO Inquiries" Google Sheet.
 * The website POSTs the contact form here; each inquiry is added as a row in the sheet
 * and emailed to the owner, with Reply-To set to the customer so replying just works.
 */
const OWNER_EMAIL = 'eoraccoofficial@gmail.com';
const SHEET_NAME = 'Inquiries';
const HEADERS = ['Received (PT)', 'Name', 'Email', 'Business', 'Phone', 'Needs', 'Message', 'Plan', 'Site language'];

function doPost(e) {
  const p = (e && e.parameter) || {};
  const clip = (v, n) => String(v || '').trim().slice(0, n);

  // Bots fill the hidden "website" field; real people never see it.
  if (p.website) return json_({ ok: true });

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

  // Only one write at a time, so rows never collide.
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = sheet_();
    const when = Utilities.formatDate(new Date(), 'America/Los_Angeles', 'yyyy-MM-dd HH:mm');
    sheet.appendRow([when, row.name, row.email, row.business, row.phone, row.need, row.message, row.plan, row.lang]);
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

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
