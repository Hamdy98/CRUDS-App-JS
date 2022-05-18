let productNameInput = document.getElementById('productName');
let productPriceInput = document.getElementById('productPrice');
let productCategoryInput = document.getElementById('productCategory');
let productDescriptionInput = document.getElementById('productDescription');
let serachInput = document.getElementById('serachInput');

let productList;
let updateProductindex;

if(localStorage.getItem("productData") != null) {
  productList = JSON.parse(localStorage.getItem("productData"));
  displayData();
} else {
  productList = [];
}

function addProduct() {
  if(validName() && validPrice()) {
    let product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescriptionInput.value
    }
  
    productList.push(product);
    localStorage.setItem("productData", JSON.stringify(productList));
    displayData();
  }
}

function displayData() {
  let temp = "";
  for(let i = 0; i < productList.length; i++) {
    temp += `
      <tr>  
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].description}</td>
        <td><button class="btn btn-outline-warning" onclick="updateProduct(${i})">updata</button></td>
        <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">delete</button></td>
      </tr>
    `
  }
  document.getElementById('tableBody').innerHTML = temp;
}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem('productData', JSON.stringify(productList));
  displayData();
}

function updateProduct(index) {
  productNameInput.value = productList[index].name;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  productDescriptionInput.value = productList[index].description;

  document.getElementById('editBtn').style.display = "inline";
  document.getElementById('addBtn').style.display = "none";

  updateProductindex = index;
}

function addEdit() {
  productList[updateProductindex].name = productNameInput.value;
  productList[updateProductindex].price = productPriceInput.value;
  productList[updateProductindex].category = productCategoryInput.value;
  productList[updateProductindex].description = productDescriptionInput.value;

  document.getElementById('editBtn').style.display = 'none';
  document.getElementById('addBtn').style.display = 'inline';

  localStorage.setItem('productData', JSON.stringify(productList));

  displayData();
}

function clearForm() { 
  productNameInput.value ='';
  productPriceInput.value ='';
  productCategoryInput.value ='';
  productDescriptionInput.value ='';
}

function search() {
  let temp = "";
  let searchValue = serachInput.value;
  for(let i = 0; i < productList.length; i++) {
    if(productList[i].name.toLowerCase().includes(searchValue.toLowerCase())
      ||
      productList[i].category.toLowerCase().includes(searchValue.toLowerCase()))
      {
        temp += `
          <tr>  
            <td>${i}</td>
            <td><p>${productList[i].name.replace(searchValue,`<span class="text-info">${searchValue}</span>`)}</p></td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].description}</td>
            <td><button class="btn btn-outline-warning" onclick="updateProduct(${i})">updata</button></td>
            <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">delete</button></td>
          </tr>
        `
      }
      console.log(productList[i].name);
      console.log(productList[i].category);
  } 
  document.getElementById('tableBody').innerHTML = temp;
}

function validName() {
  let regex = /^[A-Z][a-z]{3,12}[0-9]?$/;
  let testValid = false;
  if(regex.test(productNameInput.value)) {
    document.getElementById('alertName').style.display = 'none';
    testValid = true;
  } else {
    document.getElementById('alertName').style.display = 'block';
    testValid = false;
  }
  return testValid;
}

function validPrice() {
  let regex = /^[1-9][0-9]{2,5}$/;
  let testValid = false;
  if(regex.test(productPriceInput.value)) {
    document.getElementById('alertPrice').style.display = 'none';
    testValid = true;
  } else {
    document.getElementById('alertPrice').style.display = 'block';
    testValid = false;
  }
  return testValid;
}