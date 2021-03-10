  function getAllOrder(callback) {
    fetch("https://kjjy1aie8i.execute-api.ap-southeast-1.amazonaws.com/dev/order")
      .then((resp) => resp.json())
      .then((result) => callback(result));
  }
  
  export { getAllOrder };
  