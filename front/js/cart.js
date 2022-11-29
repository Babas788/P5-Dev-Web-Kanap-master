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

// creation de la fonction générale
function create(product, item) {
  const cart = document.getElementById("cart__items");
  const article = createArticle(
    "article",
    "cart__item",
    item.myId,
    item.colors
  );
  // fonction décalrée dans create pour les paramètres
  image(product, article);
  divDescription(product, item, article);
  cartItemQuantity(item, article, product);
  totalProducts(item, product);
  cart.appendChild(article);
  return article;
}

function image(product, article) {
  const divImage = createDiv("div", "cart__item__img", article);
  createDiv("img", "none", divImage, product.imageUrl, product.altTxt);
  return divImage;
}

function divDescription(product, item, article) {
  const divDescription = createDiv("div", "cart__item__content", article);
  const desciptionProductsDiv = createDiv(
    "div",
    "cart__item__content__description",
    divDescription
  );
  createTextContent("h2", desciptionProductsDiv, product.name, "none");
  createTextContent("p", desciptionProductsDiv, item.colors, "none");
  createTextContent("p", desciptionProductsDiv, product.price, "none");
  return desciptionProductsDiv;
}

function cartItemQuantity(item, article) {
  const cartItemSettings = createDiv(
    "div",
    "cart__item__content__settings",
    article
  );
  createTextContent("p", cartItemSettings, "Qte :");
  const input = createInput(
    "input",
    cartItemSettings,
    "Number",
    "itemQuantity",
    "itemQuantity",
    item.quantity
  );
  input.addEventListener("change", () => {
    // mise à jour quantité
    const id = item.myId;
    const totalQuantity = document.getElementById("totalQuantity");
    const product = productInLocalStorage.find((item) => item.myId === id);
    product.quantity = input.value;
    localStorage.setItem("productCart", JSON.stringify(productInLocalStorage));
    totalQuantity.textContent = product.quantity;
    location.reload();
  });

  const deleteDiv = createDiv(
    "div",
    "cart__item__content__settings__delete",
    cartItemSettings
  );
  const deleteProducts = createTextContent(
    "p",
    deleteDiv,
    "Supprimer",
    "deleteItem"
  );
  deleteProducts.addEventListener("click", () => {
    let id = item.myId;
    let color = item.colors;
    productInLocalStorage = productInLocalStorage.filter(
      (item) => item.myId !== id || item.colors !== color
    );
    localStorage.setItem("productCart", JSON.stringify(productInLocalStorage));
    alert("Le produit a bien été supprimé de votre panier!");
    location.reload();
  });
  return cartItemSettings;
}

function totalProducts(item, products) {
  total("totalPrice", item.quantity * products.price, priceOfBasket);
  total("totalQuantity", item.quantity, quantityOfProduct);
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
    validEmail(this);
  });
  firstName.addEventListener("change", () => {
    validFirstName(this);
  });
  lastName.addEventListener("change", () => {
    validLastName(this);
  });
  address.addEventListener("change", () => {
    validAddress(this);
  });
  city.addEventListener("change", () => {
    validCity(this);
  });

  function validEmail() {
    //test de la value de l'input selon la regexp
    const testEmail = valid(
      "^[a-zA-Z0-9.-_-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
      email
    );
    errorMessage(testEmail, "#emailErrorMsg");
    return testEmail;
  }
  function validFirstName() {
    const testFirstName = valid("^[A-Za-z]", firstName);
    errorMessage(testFirstName, "#firstNameErrorMsg");
    return testFirstName;
  }

  function validLastName() {
    const testLastName = valid("^[A-Za-z]", lastName);
    errorMessage(testLastName, "#lastNameErrorMsg");
    return testLastName;
  }
  function validAddress() {
    const testAddress = valid("^[0-9a-z]", address);
    errorMessage(testAddress, "#addressErrorMsg");
    return testAddress;
  }
  function validCity() {
    const testCity = valid("^[A-Za-z]", address);
    errorMessage(testCity, "#cityErrorMsg");
    return testCity;
  }
}

function postForm() {
  const order = document.getElementById("order");
  order.addEventListener("click", (e) => {
    e.preventDefault();
    // je récupère les données du formulaire dans un objet
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

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
        localStorage.setItem("orderId");
        document.location.href = "confirmation.html?id=";
      });
  });
}
postForm();

function createArticle(balise, name, dataSetId, dataSetColor) {
  const createdElement = document.createElement(balise);
  createdElement.className = name;
  createdElement.dataset.id = dataSetId;
  createdElement.dataset.color = dataSetColor;
  return createdElement;
}

function createDiv(balise, name, selector, src, alt) {
  const created = document.createElement(balise);
  created.className = name;
  selector.append(created);
  created.src = src;
  created.alt = alt;
  return created;
}

function createTextContent(balise, selector, text, name) {
  const created = document.createElement(balise);
  selector.append(created);
  created.textContent = text;
  created.className = name;
  return created;
}

function createInput(balise, selector, type, className, inputName, inputValue) {
  const input = document.createElement(balise);
  selector.append(input);
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
    message.textContent = "Veuillez entrer une adresse Email valide";
  }
  return message;
}

function valid(detailRegExp, value) {
  let regExp = new RegExp(detailRegExp);
  let test = regExpTest(regExp, value);
  return test;
}

function regExpTest(RegExp, form) {
  let test = RegExp.test(form.value);
  return test;
}
function total(selector, totalProducts, baskets) {
  const element = document.getElementById(selector);
  const productsBakset = totalProducts;
  baskets.push(parseInt(productsBakset));
  const reducer = (accumulator, curr) => accumulator + curr;
  const totQuantity = baskets.reduce(reducer);
  element.textContent = totQuantity;
  return totQuantity;
}
