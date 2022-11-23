const id = new URL(window.location.href).searchParams.get("id");
const myUrl = `http://localhost:3000/api/products/${id}`;

fetch(myUrl)
  .then((response) => response.json())
  .then((products) => create(products));

function create(products) {
  createHtml(products);
  myColor(products);
  cart();
}

function createHtml(products) {
  const image = createElement(
    "img",
    products.imageUrl,
    products.altTxt,
    ".item__img"
  );
  const title = textContent("#title", products.name);
  const price = textContent("#price", products.price);
  const description = textContent("#description", products.description);
  return image + title + price + description;
}
function myColor(product) {
  const color = product.colors;
  color.forEach((color) => {
    const option = document.createElement("option");
    document.getElementById("colors").appendChild(option);
    option.value = color;
    option.textContent = color;
  });
}

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

function cart() {
  const myBasket = document.getElementById("addToCart");

  myBasket.addEventListener("click", () => {
    const quant = document.getElementById("quantity");
    let quantity = quant.value;
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
