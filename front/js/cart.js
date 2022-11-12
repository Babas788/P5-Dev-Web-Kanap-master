// récupération de mon localStorage

let productInLocalStorage = JSON.parse(localStorage.getItem("productCart"));

//Creation de tableau pour modification depuis notre page panier
let priceOfBasket = [];
let quantityOfProduct = [];

// utilisation de la méthode Fetch afin de récupérer les informations manquantes de nos produits depuis l'API
dataApi(productInLocalStorage);

function dataApi(productInLocalStorage) {
  // utilisation d'une boucle pour chaque produit (récuparation grace à l'id depuis le localStorage)
  productInLocalStorage.forEach((item) => {
    const myUrl = `http://localhost:3000/api/products/${item.myId}`;
    fetch(myUrl)
      .then((response) => response.json())
      .then((product) => create(product, item));
  });
}

// creation de la fonction générale afin de mettre en page et faire passer les arguments
function create(product, item) {
  const article = articleProduct(item);
  const image = picture(product);
  const content = itemContent();
  const itemDescription = productDescription();
  const productName = title(product);
  const price = productPrice(product);
  const settings = itemSetting(item);
  const delet = deleteProduct(item);
  const color = productColor(item);

  priceBasket(item, product);
  quantityOfBasket(item);

  insert(article);
  article.appendChild(image);
  article.appendChild(content);
  content.appendChild(itemDescription);
  itemDescription.appendChild(productName);
  itemDescription.appendChild(color);
  itemDescription.appendChild(price);
  article.appendChild(settings);
  article.appendChild(delet);
}

// mise en page des produits
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

function picture(product) {
  const pictureDiv = document.createElement("div");
  pictureDiv.classList.add("cart__item__img");

  const imageProduct = document.createElement("img");
  pictureDiv.appendChild(imageProduct);
  imageProduct.src = product.imageUrl;
  imageProduct.alt = product.altTxt;

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

function title(product) {
  const name = document.createElement("h2");
  name.textContent = product.name;
  return name;
}

function productColor(item) {
  const color = document.createElement("p");
  color.textContent = item.colors;
  return color;
}

function productPrice(product) {
  const prodPrice = document.createElement("p");
  prodPrice.textContent = product.price;
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

  inputQuantity.max = "100";
  inputQuantity.min = "1";
  inputQuantity.value = item.quantity;
  inputQuantity.type = "Number";
  inputQuantity.name = "itemQuantity";

  // modification de quantité grace à la comparaison d'ID puis chargement de la nouvelle quantité
  inputQuantity.addEventListener("change", () => {
    const id = item.myId;
    const itemId = productInLocalStorage.find((item) => item.myId === id);
    itemId.quantity = inputQuantity.value;
    localStorage.setItem("productCart", JSON.stringify(productInLocalStorage));

    const totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.textContent = itemId.quantity;

    location.reload();
  });

  return div;
}

function deleteProduct(item) {
  const settingsDelete = document.createElement("div");
  settingsDelete.classList.add("cart__item__content__settings__delete");

  const deleteItem = document.createElement("p");
  deleteItem.classList.add("deleteItem");
  deleteItem.textContent = "Supprimer";

  // modification de quantité grace à la comparaison d'ID puis chargement de la nouvelle quantité
  deleteItem.addEventListener("click", () => {
    let id = item.myId;
    let color = item.colors;

    productInLocalStorage = productInLocalStorage.filter(
      (item) => item.myId !== id || item.colors !== color
    );
    localStorage.setItem("productCart", JSON.stringify(productInLocalStorage));
    location.reload();
    alert("Le produit a bien été supprimé de votre panier!");
  });
  settingsDelete.appendChild(deleteItem);
  return settingsDelete;
}

// mise à jour de la quantité globale grace à l'accumulation
function quantityOfBasket(item) {
  const totalQuantity = document.getElementById("totalQuantity");
  const productQuantity = item.quantity;

  quantityOfProduct.push(parseInt(productQuantity));

  const reducer = (accumulator, curr) => accumulator + curr;
  const totQuantity = quantityOfProduct.reduce(reducer);

  totalQuantity.textContent = totQuantity;
}

// mise à jour du prix global grace à l'accumulation

function priceBasket(item, product) {
  const priceBasket = document.getElementById("totalPrice");

  const totPrice = item.quantity * product.price;

  priceOfBasket.push(totPrice);

  const reducer = (accumulator, curr) => accumulator + curr;
  const totalPrice = priceOfBasket.reduce(reducer);

  priceBasket.textContent = totalPrice;
}

// formulaire de saisie
