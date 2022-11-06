saveBasket();

function saveBasket() {
  const myBasket = localStorage.length;
  for (let i = 0; i < myBasket; i++) {
    const myKey = localStorage.getItem(localStorage.key(i));
    const product = JSON.parse(myKey);
    product.forEach((item) => create(item));
  }
}

function create(item) {
  const article = articleProduct(item);
  insert(article);

  const image = picture(item);
  article.appendChild(image);

  const content = itemContent();
  article.appendChild(content);

  const itemDescription = productDescription();
  content.appendChild(itemDescription);

  const productName = title(item);
  itemDescription.appendChild(productName);

  const color = productColor(item);
  itemDescription.appendChild(color);

  const price = productPrice(item);
  itemDescription.appendChild(price);

  const settings = itemSetting(item);
  article.appendChild(settings);

  const deleteItem = deleteProduct();
  article.appendChild(deleteItem);
}

function insert(article) {
  document.getElementById("cart__items").appendChild(article);
}

function articleProduct(item) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.myId;
  article.dataset.color = item.colors;
  return article;
}

function picture(item) {
  const pictureDiv = document.createElement("div");
  pictureDiv.classList.add("cart__item__img");

  const imageProduct = document.createElement("img");
  pictureDiv.appendChild(imageProduct);
  imageProduct.src = item.image;
  imageProduct.alt = item.alt;

  return pictureDiv;
}

function itemContent() {
  const content = document.createElement("div");
  content.classList.add("cart__item__content");
  return content;
}

function productDescription() {
  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");
  return description;
}

function title(item) {
  const name = document.createElement("h2");
  name.textContent = item.productName;
  return name;
}

function productColor(item) {
  const color = document.createElement("p");
  color.textContent = item.colors;
  return color;
}

function productPrice(item) {
  const prodPrice = document.createElement("p");
  prodPrice.textContent = item.productPrice;
  return prodPrice;
}

function itemSetting(item, product) {
  const div = document.createElement("div");
  div.classList.add("cart__item__content__settings");

  const detailDiv = document.createElement("div");
  detailDiv.classList.add("cart__item__content__settings__quantity");
  div.appendChild(detailDiv);

  const qte = document.createElement("p");
  qte.textContent = "Qté";
  detailDiv.appendChild(qte);

  const inputQuantity = document.createElement("input");
  inputQuantity.classList.add("itemQuantity");
  detailDiv.appendChild(inputQuantity);

  inputQuantity.ariaValueMax = "100";
  inputQuantity.ariaValueMin = "1";
  inputQuantity.type = "Number";
  inputQuantity.name = "itemQuantity";
  inputQuantity.value = item.quantity;
  return div;
}

function deleteProduct() {
  const settingsDelete = document.createElement("div");
  settingsDelete.classList.add("cart__item__content__settings__delete");

  const deleteItem = document.createElement("p");
  deleteItem.classList.add("deleteItem");
  deleteItem.textContent = "Supprimer";
  settingsDelete.appendChild(deleteItem);

  return settingsDelete;
}
