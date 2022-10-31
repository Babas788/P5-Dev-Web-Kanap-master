const apiTest = [];
myCash();

function myCash() {
  for (let i = 0; i < localStorage.length; i++) {
    const basket = localStorage.getItem(localStorage.key(i));
    const object = JSON.parse(basket);
    apiTest.push(object);
  }

  console.log(apiTest);
}

apiTest.forEach((element) => {
  const article = document.createElement("article");
  const image = document.createElement("img");

  myArticle(element);
  picture(element);
  itemContentDiv(element);
  setting(element);
  totalQuantity(element);

  function myArticle(element) {
    document.getElementById("cart__items").appendChild(article);
    article.dataset.id = element.id;
    article.dataset.color = element.color;
  }

  function picture(element) {
    const myDiv = document.createElement("div");
    article.appendChild(myDiv);
    myDiv.classList.add("cart__item__img");
    myDiv.appendChild(image);
    image.src = element.picture;
  }

  function itemContentDiv(element) {
    const myDiv = document.createElement("div");
    article.appendChild(myDiv);
    myDiv.classList.add("cart__item__content");

    const settingDiv = document.createElement("div");
    myDiv.appendChild(settingDiv);
    settingDiv.classList.add("cart__item__content__description");

    const productName = document.createElement("h2");
    settingDiv.appendChild(productName);
    productName.innerHTML = element.productTitle;

    const productColor = document.createElement("p");
    settingDiv.appendChild(productColor);
    productColor.innerHTML = element.color;

    const productPrice = document.createElement("p");
    settingDiv.appendChild(productPrice);
    productPrice.innerHTML = element.price;
  }

  function setting(element) {
    const myDiv = document.createElement("div");
    article.appendChild(myDiv);
    myDiv.classList.add("cart__item__content__settings");

    const settingDiv = document.createElement("div");
    myDiv.appendChild(settingDiv);
    settingDiv.classList.add("cart__item__content__settings__quantity");

    const productQuantity = document.createElement("p");
    settingDiv.appendChild(productQuantity);
    productQuantity.innerHTML = element.quantity;

    const input = document.createElement("input");
    settingDiv.appendChild(input);
    input.classList.add("itemQuantity");
    (input.type = "Number"), (input.name = "itemquantity");
    input.min = "1";
    input.max = "100";
    input.value = element.quantity;

    const settingDelete = document.createElement("div");
    myDiv.appendChild(settingDelete);
    settingDelete.classList.add("cart__item__content__settings__delete");

    const deleteItems = document.createElement("p");
    settingDelete.appendChild(deleteItems);
    deleteItems.classList.add("deleteItem");
    deleteItems.innerHTML = "supprimer";
  }

  function totalQuantity(element) {
    for (let i = 0; i < totalQuantity.length; i++) {
      const totalQuantity = (document.getElementById(
        "totalQuantity"
      ).innerHTML = element.quantity);
    }
  }
});
