export function OBJtoXML(obj:any) {
    var xml = '<element>\n';
    for (var prop in obj) {
      xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
      if (obj[prop] instanceof Array) {
        for (var array in obj[prop]) {
          xml += "" + prop + ">";
          xml += OBJtoXML(new Object(obj[prop][array]));
          xml += "</" + prop + ">";
        }
      } else if (typeof obj[prop] == "object") {
        xml += OBJtoXML(new Object(obj[prop]));
      } else {
        xml += obj[prop];
      }
      xml += obj[prop] instanceof Array ? '' : "</" + prop + ">\n";
    }
    xml = xml +'</element>'
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml
  }