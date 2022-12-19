let productInLocalStorage = JSON.parse(localStorage.getItem("productCart"));

let data = [];
let totalPrice = 0;
let totalPriceProduct = 0;
let totalQuantity = 0;
let messageErrorQuantity = false;

if (productInLocalStorage === "0" || productInLocalStorage == null) {
  alert("votre panier est vide, redirection vers la page d'accueil");
  window.location.href = `index.html`;
} else {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((product) => {
      data = product;
      for (let i = 0; i < productInLocalStorage.length; i++) {
        let productId = productInLocalStorage[i].myId;
        let productColor = productInLocalStorage[i].colors;
        let productQuantity = productInLocalStorage[i].quantity;

        const dataApi = data.find((element) => element._id === productId);
        create(productId, productColor, productQuantity, dataApi);
        totalProductsPrice(productQuantity, dataApi);
        totalProductsQuantity(productQuantity);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  function create(productId, productColor, productQuantity, dataApi) {
    const cart = document.getElementById("cart__items");
    const article = createArticleProduct(
      "article",
      "cart__item",
      productId,
      productColor
    );
    cart.appendChild(article);
    article.appendChild(image(dataApi));
    article.appendChild(cartItem(productColor, productQuantity, dataApi));
    changeQuantity(productId, productColor);
    deletProduct();
  }

  function image(dataApi) {
    const divImage = createElement("div", "cart__item__img"); //Utilisation de fonction réutilisable
    const image = createElement(
      "img",
      (elementClass = null),
      dataApi.imageUrl,
      dataApi.altTxt
    );
    divImage.appendChild(image);
    return divImage;
  }

  function cartItem(productColor, productQuantity, dataApi) {
    const divCartItem = createElement("div", "cart__item__content");
    const divCartItemDescription = createElement(
      "div",
      "cart__item__content__description"
    );
    const title = createElement(
      "h2",
      (elementClass = null),
      (src = null),
      (alt = null),
      dataApi.name
    );
    const color = createElement(
      "p",
      (elementClass = null),
      (src = null),
      (alt = null),
      productColor
    );
    const price = createElement(
      "p",
      (elementClass = null),
      (src = null),
      (alt = null),
      dataApi.price + "€"
    );

    divCartItem.appendChild(divCartItemDescription);
    divCartItem.appendChild(cartSettings(productQuantity));
    divCartItemDescription.appendChild(title);
    divCartItemDescription.appendChild(color);
    divCartItemDescription.appendChild(price);
    return divCartItem;
  }

  function cartSettings(productQuantity) {
    const divSettings = createElement("div", "cart__item__content__settings");
    const settingsQuantity = createElement(
      "div",
      "cart__item__content__settings__quantity"
    );
    const qte = createElement(
      "p",
      (elementClass = null),
      (src = null),
      (alt = null),
      "Qte:"
    );
    const input = createInput(
      "input",
      "Number",
      "itemQuantity",
      "itemQuantity",
      productQuantity
    );
    const deleteDiv = createElement(
      "div",
      "cart__item__content__settings__delete"
    );
    const deleteProducts = createElement(
      "p",
      "deleteItem",
      (src = null),
      (alt = null),
      "Supprimer"
    );
    divSettings.appendChild(settingsQuantity);
    settingsQuantity.appendChild(qte);
    settingsQuantity.appendChild(input);
    settingsQuantity.appendChild(deleteDiv);
    deleteDiv.appendChild(deleteProducts);
    return divSettings;
  }
}

// FORMULAIRE

form();
function form() {
  const email = document.getElementById("email");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const address = document.getElementById("address");
  const city = document.getElementById("city");
  //création d'évènement pour chaque input
  email.addEventListener("change", () => {
    validEmail();
  });
  firstName.addEventListener("keydown", () => {
    validFirstName();
  });
  lastName.addEventListener("keydown", () => {
    validLastName();
  });
  address.addEventListener("keydown", () => {
    validAddress();
  });
  city.addEventListener("keydown", () => {
    validCity();
  });

  function validEmail() {
    //test de la value de l'input selon la regexp
    const testEmail = valid(
      "^[a-zA-Z0-9.-_-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
      email.value
    );
    errorMessage(testEmail, "#emailErrorMsg");
    return testEmail;
  }
  function validFirstName() {
    const testFirstName = valid("^[a-zA-Z]+$", firstName.value);
    errorMessage(testFirstName, "#firstNameErrorMsg");
    return testFirstName;
  }

  function validLastName() {
    const testLastName = valid("^[a-zA-Z]+$", lastName.value);
    errorMessage(testLastName, "#lastNameErrorMsg");
    return testLastName;
  }
  function validAddress() {
    const testAddress = valid("^[0-9a-z]", address.value);
    errorMessage(testAddress, "#addressErrorMsg");
    return testAddress;
  }
  function validCity() {
    const testCity = valid("^[A-Za-z]", city.value);
    errorMessage(testCity, "#cityErrorMsg");
    return testCity;
  }
}

// On vérifie que les champs sont correctement remplis suivant les regex mises en place

function postForm() {
  const order = document.getElementById("order");
  order.addEventListener("click", (e) => {
    e.preventDefault();
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    // je récupère les données du formulaire dans un objet

    //récupération de l'iD
    let products = [];
    for (let i = 0; i < productInLocalStorage.length; i++) {
      products.push(productInLocalStorage[i].myId);
    }

    const finalOrder = {
      contact,
      products,
    };

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(finalOrder),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (productInLocalStorage) {
          document.location.href = "confirmation.html?id=" + data.orderId;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
postForm();

function createArticleProduct(balise, elementClass, dataSetId, dataSetColor) {
  const createdElement = document.createElement(balise);
  createdElement.className = elementClass;
  createdElement.dataset.id = dataSetId;
  createdElement.dataset.color = dataSetColor;
  return createdElement;
}

function createElement(balise, elementClass, src, alt, text) {
  const created = document.createElement(balise);
  created.className = elementClass;
  created.src = src;
  created.alt = alt;
  created.textContent = text;
  return created;
}
function createInput(balise, type, className, inputName, inputValue) {
  const input = document.createElement(balise);
  input.type = type;
  input.className = className;
  input.name = inputName;
  input.max = "100";
  input.min = "1";
  input.value = inputValue;
  return input;
}
function errorMessage(test, selector) {
  const message = document.querySelector(selector);
  //message d'erreur ou non
  if (test) {
    message.textContent = "";
  } else {
    message.textContent = "Veuillez entrer une information valide";
  }
  return message;
}
function valid(detailRegExp, value) {
  let testRegExp = new RegExp(detailRegExp);
  let test = testRegExp.test(value);
  return test;
}
function totalProductsPrice(productQuantity, dataApi) {
  totalPriceProduct = productQuantity * dataApi.price;
  totalPrice += totalPriceProduct;
  document.getElementById("totalPrice").textContent = totalPrice;
}

//fonction pour les calcul de quantité et de prix
function totalProductsQuantity(productQuantity) {
  totalQuantity += parseInt(productQuantity);
  document.getElementById("totalQuantity").textContent = totalQuantity;
}

//fonction pour les mise à jour de prix et de quantitée
function changeQuantity(productId, productColor) {
  let buttonQuantity = document.querySelectorAll("itemQuantity");
  buttonQuantity.forEach((item) => {
    item.addEventListener("change", (event) => {
      event.preventDefault();
      newQuantity = Number(item.value);
      const id = productId;
      const color = productColor;
      const product = productInLocalStorage.find(
        (element) => element.myId === id && element.colors === color
      );
      if (
        newQuantity > 0 &&
        newQuantity <= 100 &&
        Number.isInteger(newQuantity)
      ) {
        parseNewQuantity = parseInt(newQuantity);
        product.quantity = parseNewQuantity;
        localStorage.setItem(
          "productCart",
          JSON.stringify(productInLocalStorage)
        );
        recalculQuantity();
        recalculPrice();
        messageErrorQuantity = false;
      } else {
        item.value = productInLocalStorage.quantity;
        messageErrorQuantity = true;
      }
      if (messageErrorQuantity) {
        alert("Veuillez selectionner une quantité comprise entre 1 et 100");
      }
    });
  });
}

function recalculPrice() {
  let newPrice = 0;
  for (const item of productInLocalStorage) {
    const idProductsLocalStorage = item.myId;
    const quantityProductsLocalStorage = item.quantity;
    const findProducts = data.find(
      (element) => element._id === idProductsLocalStorage
    );
    if (findProducts) {
      const newTotalProductPricePanier =
        findProducts.price * quantityProductsLocalStorage;
      newPrice += newTotalProductPricePanier;
    }
    //On affichage le nouveau prix total du panier dans le html
    document.getElementById("totalPrice").textContent = newPrice;
  }
}

function recalculQuantity() {
  let newQuantity = 0;
  for (const item of productInLocalStorage) {
    newQuantity += parseInt(item.quantity);
  }
  document.getElementById("totalQuantity").textContent = newQuantity;
  return newQuantity;
}

function deletProduct() {
  let deletProduct = document.querySelectorAll(".deleteItem");
  deletProduct.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      let myArticle = item.closest("article");
      productInLocalStorage = productInLocalStorage.filter(
        (item) =>
          item.myId !== myArticle.dataset.id ||
          item.colors !== myArticle.dataset.color
      );
      localStorage.setItem(
        "productCart",
        JSON.stringify(productInLocalStorage)
      );

      alert("Votre produit a bien été supprimé");
      if (myArticle.parentNode) {
        myArticle.parentNode.removeChild(myArticle);
      }
      if (
        productInLocalStorage === null ||
        productInLocalStorage.length === 0
      ) {
        alert("votre panier est vide, redirection vers la page d'accueil");
        window.location.href = `index.html`;
      } else {
        recalculQuantity();
        recalculPrice();
      }
    });
  });
}
