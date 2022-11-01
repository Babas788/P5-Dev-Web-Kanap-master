const apiTest = [];
myCash();

console.log(apiTest);
apiTest.forEach((item) => create(item));

function myCash() {
  const cash = localStorage.length;
  for (let i = 0; i < cash; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    const object = JSON.parse(item);
    apiTest.push(object);
  }
}

function create(item) {
  const thisArticle = article(item);
  createArticle(thisArticle);

  const myDiv = picture(item);
  thisArticle.appendChild(myDiv);

  const myCart = cartContent(item);
  thisArticle.appendChild(myCart);

  const setting = settings(item);
  thisArticle.appendChild(setting);
}

function createArticle(thisArticle) {
  document.getElementById("cart__items").appendChild(thisArticle);
}

function article(item) {
  const myArticle = document.createElement("article");
  myArticle.classList.add("cart__item");
  myArticle.dataset.id = item.id;
  myArticle.dataset.color = item.color;
  return myArticle;
}

function picture(item) {
  const divImage = document.createElement("div");
  divImage.classList.add("cart__item__img");
  const myImage = document.createElement("img");
  myImage.src = item.picture;
  myImage.alt = item.accessibility;

  divImage.appendChild(myImage);
  return divImage;
}

function cartContent(item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__content");

  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");

  const name = document.createElement("h2");
  name.textContent = item.productTitle;

  const color = document.createElement("p");
  color.textContent = item.color;

  const price = document.createElement("p");
  price.textContent = item.price;

  description.appendChild(name);
  description.appendChild(color);
  description.appendChild(price);
  div.appendChild(description);
  return div;
}

function settings(item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__content__settings");

  const quantity = document.createElement("div");
  quantity.classList.add("cart__item__content__settings__quantity");

  const qte = document.createElement("p");
  qte.textContent = item.quantity;

  const input = document.createElement("input");
  input.classList.add("itemQuantity");
  (input.type = "Number"), (input.name = "itemquantity");
  input.min = "1";
  input.max = "100";
  input.value = item.quantity;

  const divDelet = document.createElement("div");
  divDelet.classList.add("cart__item__content__settings__delete");

  const delet = document.createElement("p");
  delet.classList.add("deleteItem");
  delet.innerHTML = "supprimer";

  div.appendChild(divDelet);
  div.appendChild(quantity);
  quantity.appendChild(qte);
  quantity.appendChild(input);
  divDelet.appendChild(delet);
  return div;
}
