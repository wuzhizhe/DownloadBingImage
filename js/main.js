/*global window */
/*global chrome */
/*global X2JS */
/*jslint browser: true*/
var x2js = new X2JS();
var firstPage = document.getElementsByClassName("js-first-page")[0];
var secondPage = document.getElementsByClassName("js-second-page")[0];
var firstPage;
var secondPage;

//将日期格式化为2014-02-03格式
function formatDate(indate) {
  var now = new Date(parseInt(indate, 10));
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var date = now.getDate();
  if (date < 10) {
    date = "0" + date;
  }
  var str = year + "-" + month + "-" + date;
  return str; //+ " " + hour + ":" + minute + ":" + second;
}

//隐藏下载页，显示提示信息页面
function hideFirstPage() {
  firstPage.style.display = "none";
  secondPage.style.display = "block";
}

function xdomain(par){//crossdomain function
   par.xpath=par.xpath==undefined?"*":par.xpath;
   par.type=par.type==undefined?"xml":par.type;
   var xmlhttp=new XMLHttpRequest();
   par.url = 'http://query.yahooapis.com/v1/public/yql?q='+encodeURIComponent('select * from html WHERE url="'+par.url+'" AND xpath="'+par.xpath+'"')+'&format='+par.type+'&callback=cb';
   xmlhttp.open("GET",par.url,false);
   xmlhttp.onload=function(){
    function cb(d){return d;}//callBack function for returning results from query
    par.callBack(xmlhttp.responseText);
   };
   xmlhttp.send();
};

//隐藏提示信息页面，显示下载页
function showFirstPage() {
  secondPage.style.display = "none";
  firstPage.style.display = "block";
}

var today = new Date().getTime();
var nowDate;

// Download all visible checked links.
function downloadCheckedLinks(url, index) {
  var saveAs = false;
  if (1 === index) {
    saveAs = true;
  }
  var imgurl = url || document.getElementById('filter').value;
  chrome.downloads.download({
    url: imgurl,
    method: "GET",
    saveAs : saveAs,
    conflictAction: "overwrite"
  }, function (downloadId) {
    
  });
}

//计算两个日期的天数差
function GetDateRegion(BeginDate, EndDate) {
  var aDate, oDate1, oDate2, iDays;
  var sDate1 = BeginDate; //sDate1和sDate2是2008-12-13格式
  var sDate2 = EndDate;
  aDate = sDate1.split("-");
  oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]); //转换为12/13/2008格式
  aDate = sDate2.split("-");
  oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
  var i = (oDate1 - oDate2) / 1000 / 60 / 60 / 24;
  iDays = i; //把相差的毫秒数转换为天数
  return iDays;
}

//Download today bing's iamge of the day
function downloadBingTodayImage() {
  var ratio = document.getElementById("js-ratio").value;
  var mkt = document.getElementById("js-country-choice").value;
  var i = 0;
  var choiceDate = document.getElementsByClassName("js-the-date")[0].value;
  if ("" === choiceDate) {
    choiceDate = nowDate;
  }
  var countDay = GetDateRegion(nowDate, choiceDate);
  var num = document.getElementsByClassName("div-day-num")[0].value;
  var ajaxRequest = new XMLHttpRequest();
  var requestUrl = "http://global.bing.com/HPImageArchive.aspx?format=xml&idx=" + countDay + "&n=" + num + "&mkt=" + mkt;
  xdomain({
    url:requestUrl,// url of site
    type:"xml",//return in xml or JSON format
    xpath:"*",//filter objects
    callBack:function(data){
      console.log("data==== " +data);
      data = data.replace("/**/cb(","").replace(");","");

      console.log(JSON.parse(data))
      data = JSON.parse(data);
      var xml2Json = x2js.xml_str2json(data.results);
      console.log(xml2Json);
      if (null === xml2Json) {
        hideFirstPage();
        return;
      }
      var images = xml2Json.html.body.images.image;
      var imageUrl = "";
      if (undefined === images.length) {
        imageUrl = 'http://www.bing.com' + images.url;
        imageUrl = imageUrl.replace("1366x768", ratio);
        downloadCheckedLinks(imageUrl, 1);
      } else {
        for (i = 0; i < images.length; i++) {
          imageUrl = 'http://www.bing.com' + images[i].url;
          imageUrl = imageUrl.replace("1366x768", ratio);
          downloadCheckedLinks(imageUrl, 2);
        }
      }
    }
  });
}



// Set up event handlers and inject send_links.js into all frames in the active
// tab.
window.onload = function () {
  firstPage = document.getElementsByClassName("js-first-page")[0];
  secondPage = document.getElementsByClassName("js-second-page")[0];
  nowDate = formatDate(today);
  document.getElementById("js-the-date").setAttribute("max", nowDate);
  document.getElementById("js-the-date").value = nowDate;
  document.getElementById('js-download0').onclick = downloadBingTodayImage;
  document.getElementById("js-cancle-button").onclick = showFirstPage;
};
