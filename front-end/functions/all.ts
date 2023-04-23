export function OBJtoXML(obj:any) {
    var xml = '<user>\n';
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
    xml = xml +'</user>'
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml
  }

//function for prohibits characters in group number
export function handleKeyPress(e:any) {
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }else if (e.target.value.length >= 10) {
      // Prevent input longer than 10 digits
      e.preventDefault();
    }
}
export function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function OBJtoXMLFILM(obj:any) {
  var xml = '<film>\n';
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
  xml = xml +'</film>'
  var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
  return xml
}


export function parseFilms(xmlString:any) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

  const films = xmlDoc.getElementsByTagName('film');
  const result = [];

  for (let i = 0; i < films.length; i++) {
    const film = films[i];
    const title = film.getElementsByTagName('title')[0]?.textContent;
    const screeningDate = film.getElementsByTagName('the_screening_date')[0]?.textContent;
    const projectionRoom = film.getElementsByTagName('the_projection_room')[0]?.textContent;

    result.push({ title, screeningDate, projectionRoom });
  }

  return result;
}
