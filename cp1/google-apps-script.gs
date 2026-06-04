/**
 * Скопируйте этот код в Google Таблицу:
 * Расширения → Apps Script → вставить → Сохранить → Развернуть → Новое развертывание
 * Тип: Веб-приложение, доступ: "Все", включая анонимных
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Заявки");
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  }

  var p = e.parameter;
  var row = [
    new Date(),
    p.formType || "",
    p.organization || "",
    p.direction || "",
    p.address || "",
    p.website || "",
    p.name || "",
    p.position || "",
    p.phone || "",
    p.email || "",
    p.message || p.comment || "",
    p.sentAt || ""
  ];

  sheet.appendRow(row);
  return ContentService
    .createTextOutput(JSON.stringify({ result: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function setupHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Заявки");
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Заявки");
  }
  sheet.getRange(1, 1, 1, 12).setValues([[
    "Дата",
    "Тип формы",
    "Организация",
    "Направление",
    "Адрес",
    "Сайт / соцсети",
    "ФИО",
    "Должность",
    "Телефон",
    "E-mail",
    "Сообщение",
    "Метка времени (с сайта)"
  ]]);
}
