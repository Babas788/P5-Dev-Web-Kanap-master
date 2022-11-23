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
      .then((products) => create(products, item));
  });
}

// creation de la fonction générale afin de mettre en page et faire passer les arguments
function create(products, item) {
  const cart = document.getElementById("cart__items");
  const article = createArticle(
    "article",
    "cart__item",
    item.myId,
    item.colors
  );
  image(products, article);
  divDescription(products, item, article);
  cartItemQuantity(item, article);
  totalPrice(products, item);
  totalQuantity(item);
  cart.appendChild(article);
  return article;
}

function image(products, article) {
  const divImage = createDiv("div", "cart__item__img", article);
  const imageProducts = createDiv(
    "img",
    "none",
    divImage,
    products.imageUrl,
    products.altTxt
  );
  return divImage;
}

function divDescription(products, item, article) {
  const divDescription = createDiv("div", "cart__item__content", article);
  const desciptionProductsDiv = createDiv(
    "div",
    "cart__item__content__description",
    divDescription
  );
  const productsDetails = createTextContent(
    "h2",
    desciptionProductsDiv,
    products.name,
    "none"
  );
  const productsColor = createTextContent(
    "p",
    desciptionProductsDiv,
    item.colors,
    "none"
  );
  const productsPrice = createTextContent(
    "p",
    desciptionProductsDiv,
    products.price,
    "none"
  );

  return (
    desciptionProductsDiv + productsPrice + productsColor + productsDetails
  );
}

function cartItemQuantity(item, article) {
  const cartItemSettings = createDiv(
    "div",
    "cart__item__content__settings",
    article
  );

  const quantity = createTextContent("p", cartItemSettings, "Qte :");

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
    const itemId = productInLocalStorage.find((item) => item.myId === id);
    itemId.quantity = input.value;
    localStorage.setItem("productCart", JSON.stringify(productInLocalStorage));
    totalQuantity.textContent = itemId.quantity;
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
  return cartItemSettings + quantity;
}

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

function totalPrice(products, item) {
  const price = document.getElementById("totalPrice");
  const totPrice = item.quantity * products.price;
  priceOfBasket.push(totPrice);
  const reducer = (accumulator, curr) => accumulator + curr;
  const totalPrice = priceOfBasket.reduce(reducer);
  price.textContent = totalPrice;
}

function totalQuantity(item) {
  const totalQuantity = document.getElementById("totalQuantity");
  const productQuantity = item.quantity;
  quantityOfProduct.push(parseInt(productQuantity));
  const reducer = (accumulator, curr) => accumulator + curr;
  const totQuantity = quantityOfProduct.reduce(reducer);
  totalQuantity.textContent = totQuantity;
  return totQuantity;
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
    //cration regexp
    let emailRegExp = new RegExp(
      "^[a-zA-Z0-9.-_-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
      "g"
    );

    //test de la value de l'input selon la regexp
    let testEmail = emailRegExp.test(email.value);
    let emailErrorMsg = document.getElementById("emailErrorMsg");

    //message d'erreur ou non
    if (testEmail) {
      emailErrorMsg.textContent = "";
    } else {
      emailErrorMsg.textContent = "Veuillez entrer une adresse Email valide";
    }
  }
  function validFirstName() {
    const nameRegExp = new RegExp("^[A-Za-z]");
    let testFirstName = nameRegExp.test(firstName.value);
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    if (testFirstName) {
      firstNameErrorMsg.textContent = "";
    } else {
      firstNameErrorMsg.textContent = "Veuillez entrer un prénom valide";
    }
  }
  function validLastName() {
    const nameRegExp = new RegExp("^[A-Za-z]");
    let testLastName = nameRegExp.test(lastName.value);
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    if (testLastName) {
      lastNameErrorMsg.textContent = "";
    } else {
      lastNameErrorMsg.textContent = "Veuillez entrer un nom valide";
    }
  }
  function validAddress() {
    let addressRegExp = new RegExp("^[0-9a-z]");
    let testAddress = addressRegExp.test(address.value);
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    if (testAddress) {
      addressErrorMsg.textContent = "";
    } else {
      addressErrorMsg.textContent = "Veuillez entrer une adresse valide";
    }
  }
  function validCity() {
    let cityRegExp = new RegExp("^[A-Za-z]");
    let testCity = cityRegExp.test(city.value);
    let cityErrorMsg = document.getElementById("cityErrorMsg");
    if (testCity) {
      cityErrorMsg.textContent = "";
    } else {
      cityErrorMsg.textContent = "Veuillez entrer une ville valide";
    }
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
        localStorage.setItem("orderId", data.orderId);
        document.location.href = "confirmation.html?id=" + data.orderId;
      });
  });
}
postForm();
