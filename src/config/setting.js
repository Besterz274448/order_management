const getSetting = (callback,old) => {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      callback(JSON.parse(xhttp.responseText));
      old(JSON.parse(xhttp.responseText));
    }
  };
  xhttp.open("GET", "/mockups/setting.json", true);
  xhttp.send();
};

export { getSetting };
