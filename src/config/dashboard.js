const getDashboardData = (callback) => {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const data = JSON.parse(xhr.responseText);
      callback(data);
    }
  };
  xhr.open("GET", "/dashboard_data.json");
  xhr.send();
};
export {getDashboardData};
