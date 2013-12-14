
if (typeof XMLHttpRequest === "undefined") {
  window.XMLHttpRequest = function () {
    try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
    catch (e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
    catch (e) {}
    try { return new ActiveXObject("Microsoft.XMLHTTP"); }
    catch (e) {}
    throw new Error("This browser does not support XMLHttpRequest.");
  };
}
if( typeof ajax == 'undefined' ) window.ajax = function(conf) {
  var type = conf.type ? conf.type : "GET" ;
  var url = conf.url;
  var data = conf.data;
  var dataType = conf.dataType ? conf.dataType : "text" ;
  var success = conf.success;
  var xhr = new XMLHttpRequest();

  xhr.open(type, url, true);
  if(type == "GET" || type == "get") {
    xhr.send(null);
  } else if(type == "POST" || type == "post") {
    xhr.setRequestHeader("content-type",
      "application/x-www-form-urlencoded");
    xhr.send(data);
  }
  
  if(typeof success == 'function') {
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
        if(dataType == "text" || dataType == "TEXT") {
          success(xhr.responseText);
        } else if(dataType == "xml" || dataType == "XML") {
          success(xhr.responseXML);
        }
      }
    }
  }
  return xhr;
}
