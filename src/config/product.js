function getAllProduct(callback) {
  Promise.all(
    [
      "https://kjjy1aie8i.execute-api.ap-southeast-1.amazonaws.com/dev/product/",
      "https://kjjy1aie8i.execute-api.ap-southeast-1.amazonaws.com/dev/productvariant",
    ].map((id) => fetch(id).then((resp) => resp.json()))
  ).then((result) => callback(result));
}

function getProductById(id, callback) {
  fetch("https://kjjy1aie8i.execute-api.ap-southeast-1.amazonaws.com/dev/product/" + id)
    .then((resp) => resp.json())
    .then((result) => callback(result));
}

function createProduct(data) {
  console.log(data);
}

function getSubProduct() {}

function updateProduct(id, value) {}

function deleteProduct(id) {}

export { getAllProduct, createProduct, updateProduct, deleteProduct, getSubProduct, getProductById };
