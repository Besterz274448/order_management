function getAllProduct(callback) {
    Promise.all(["products","products/sub"].map(id => 
        fetch(`https://asia-southeast2-ru-test-5ee10.cloudfunctions.net/${id}`).then(resp => resp.json())
      )).then(result => callback(result));
}

function createProduct(data) {
  console.log(data);
}

function getSubProduct() {}

function updateProduct(id, value) {}

function deleteProduct(id) {}

export { getAllProduct, createProduct, updateProduct, deleteProduct, getSubProduct };
