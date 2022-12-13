// récupération de l'id du produit tranmis par la page précédente
const id = new URL(window.location.href).searchParams.get("id");

//récupération des données de l'api selon l'id avec fetch
const myUrl = `http://localhost:3000/api/products/${id}`;
fetch(myUrl)
  .then((response) => response.json())
  .then((products) => create(products));

// fonction générale de création
function create(products) {
  createHtml(products);
  ColorChoice(products);
  Createcart();
}

function createHtml(products) {
  // création du bloc produit
  const image = createElement(
    "img",
    products.imageUrl,
    products.altTxt,
    ".item__img"
  );
  textContent("#title", products.name);
  textContent("#price", products.price);
  textContent("#description", products.description);
  return image;
}

function ColorChoice(product) {
  //création du choix des couleurs
  const color = product.colors;
  color.forEach((color) => {
    const option = document.createElement("option");
    document.getElementById("colors").appendChild(option);
    option.value = color;
    option.textContent = color;
  });
}

// fonctions réutilisablent permettant de créer des éléments
function createElement(balise, src, alt, select) {
  const created = document.createElement(balise);
  created.src = src;
  created.alt = alt;
  document.querySelector(select).appendChild(created);
  return created;
}

function textContent(select, text) {
  const selection = document.querySelector(select);
  selection.textContent = text;
}

// gesttion du panier avec envoi d'éléments dans le localstorage
function Createcart() {
  const myBasket = document.getElementById("addToCart");
  myBasket.addEventListener("click", () => {
    let quantity = document.getElementById("quantity").value;
    let colors = document.getElementById("colors").value;

    let basket = {
      myId: id,
      quantity,
      colors,
    };
    if (
      colors === null ||
      colors === "" ||
      quantity === null ||
      quantity === "0"
    ) {
      alert("Veuillez selectionner une couleur et/ou une quantité valide!");
      return;
    }
    let productInLocalStorage = JSON.parse(localStorage.getItem("productCart"));
    if (productInLocalStorage) {
      const find = productInLocalStorage.find(
        (element) => element.myId === id && element.colors === colors
      );
      if (find) {
        let newQuantity = parseInt(basket.quantity) + parseInt(find.quantity);
        find.quantity = newQuantity;
        localStorage.setItem(
          "productCart",
          JSON.stringify(productInLocalStorage)
        );
        window.location.href = `cart.html`;
      } else {
        productInLocalStorage.push(basket);
        localStorage.setItem(
          "productCart",
          JSON.stringify(productInLocalStorage)
        );
        window.location.href = `cart.html`;
      }
    } else {
      productInLocalStorage = [];
      productInLocalStorage.push(basket);
      localStorage.setItem(
        "productCart",
        JSON.stringify(productInLocalStorage)
      );
      window.location.href = `cart.html`;
    }
  });
}
