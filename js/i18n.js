/*global window */
/*global chrome */
/*jslint browser: true*/
var startDate = "";
var days = "";
var language = "";
var resolution = "";
var download = "";
var tips = "";
var back = "";
var browserLanguage = "";
var optionHtml = '' + 
        '<option value="zh-cn">China</option>' + 
        '<option value="zh-tw">‎(Taiwan)‎</option>' + 
        '<option value="zh-hk">‎(Hong Kong S.A.R.)‎</option>' + 
        '<option value="en-us">‎(United States - English)‎</option>' + 
        '<option value="en-au">‎(Australia)‎</option>' + 
        '<option value="es-ar">‎(Argentina)‎</option>' + 
        '<option value="de-at">‎(Austria)‎</option>' + 
        '<option value="nl-be">‎(Belgium - Dutch)‎</option>' + 
        '<option value="fr-be">‎(Belgium - French)‎</option>' + 
        '<option value="pt-br">(Brazil)‎</option>' + 
        '<option value="fr-ca">‎(Canada - French)‎</option>' + 
        '<option value="en-ca">‎(Canada - English)‎</option>' + 
        '<option value="es-cl">‎(Chile)‎</option>' + 
        '<option value="fr-fr">‎(France)‎</option>' + 
        '<option value="da-dk">‎(Denmark)‎</option>' + 
        '<option value="fi-fi">‎(Finland)‎</option>' + 
        '<option value="de-de">‎(Germany)‎</option>' + 
        '<option value="en-in">‎(India)‎</option>' + 
        '<option value="en-id">‎(Indonesia)‎</option>' + 
        '<option value="it-it">‎(Italy)‎</option>' + 
        '<option value="ja-jp">‎(Japan)‎</option>' + 
        '<option value="ko-kr">‎(Korea)‎</option>' + 
        '<option value="en-my">‎(Malaysia)‎</option>' + 
        '<option value="es-mx">‎(Mexico)‎</option>' + 
        '<option value="nl-nl">‎(Netherlands)‎</option>' + 
        '<option value="en-nz">‎(New Zealand)‎</option>' + 
        '<option value="nb-no">‎(Norway)‎</option>' + 
        '<option value="pl-pl">‎(Poland)‎</option>' + 
        '<option value="en-ph">‎(Philippines)‎</option>' + 
        '<option value="ru-ru">‎(Russia)‎</option>' + 
        '<option value="ar-sa">(Saudi Arabia)‎</option>' + 
        '<option value="en-za">‎(South Africa)‎</option>' + 
        '<option value="es-es">‎(Spain)‎</option>' + 
        '<option value="sv-se">‎(Sweden)‎</option>' + 
        '<option value="fr-ch">(Switzerland - French)‎</option>' + 
        '<option value="de-ch">‎(Switzerland - German)‎</option>' + 
        '<option value="tr-tr">‎(Turkey)‎</option>' + 
        '<option value="en-gb">‎(United Kingdom)‎</option>' + 
        '<option value="es-us">(United States - Spanish)‎</option>';

function loadLanguages() {
  browserLanguage = chrome.i18n.getUILanguage();
  if ("zh-CN" !== browserLanguage) {
    document.getElementById("js-country-choice").innerHTML = optionHtml;
  }
  startDate = chrome.i18n.getMessage("startDate");
  days = chrome.i18n.getMessage("days");
  language = chrome.i18n.getMessage("language");
  resolution = chrome.i18n.getMessage("resolution");
  download = chrome.i18n.getMessage("download");
  tips = chrome.i18n.getMessage("tips");
  back = chrome.i18n.getMessage("back");
  document.getElementsByClassName("js-start-date")[0].innerHTML = startDate;
  document.getElementsByClassName("js-days")[0].innerHTML = days;
  document.getElementsByClassName("js-language")[0].innerHTML = language;
  document.getElementsByClassName("js-resolution")[0].innerHTML = resolution;
  document.getElementById("js-download0").innerHTML = download;
  document.getElementsByClassName("js-tips")[0].innerHTML = tips;
  document.getElementById("js-cancle-button").innerHTML = back;
}

// Fill in the strings as soon as possible
window.addEventListener("DOMContentLoaded", loadLanguages, true);