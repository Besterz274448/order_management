function getAllProduct(callback) {
    Promise.all(["products","products/sub"].map(id => 
        fetch(`https://asia-south1-ru-test-5ee10.cloudfunctions.net/${id}`).then(resp => resp.json())
      )).then(result => callback(result));
}

function createProduct() {}

function getSubProduct() {}

function updateProduct(id, value) {}

function deleteProduct(id) {}

export { getAllProduct, createProduct, updateProduct, deleteProduct, getSubProduct };
