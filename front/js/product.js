const page = window.location.search;
const url = new URLSearchParams(page);
const id = url.get("id");
const myUrl = `http://localhost:3000/api/products/${id}`;

const numberOfProduct = document.getElementById("quantity");

fetch(myUrl)
  .then((response) => response.json())
  .then((data) => create(data));

function create(product) {
  picture(product);
  title(product);
  price(product);
  description(product);
  myColor(product);
  cart(product);
}

function picture(product) {
  const image = document.createElement("img");
  document.querySelector(".item__img").appendChild(image);
  image.src = product.imageUrl;
  image.alt = product.altTxt;
}

function title(product) {
  const title = document.getElementById("title");
  title.innerHTML = product.name;
}

function price(product) {
  const price = document.getElementById("price");
  price.innerHTML = product.price;
}

function description(product) {
  const description = document.getElementById("description");
  description.innerHTML = product.description;
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

function cart(product) {
  const myBasket = document.getElementById("addToCart");

  myBasket.addEventListener("click", () => {
    let quantity = numberOfProduct.value;
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
      const recherche = productInLocalStorage.find(
        (element) => element.myId === id && element.colors === colors
      );
      if (recherche) {
        let newQuantity =
          parseInt(basket.quantity) + parseInt(recherche.quantity);
        recherche.quantity = newQuantity;
        localStorage.setItem(
          "productCart",
          JSON.stringify(productInLocalStorage)
        );
      } else {
        productInLocalStorage.push(basket);
        localStorage.setItem(
          "productCart",
          JSON.stringify(productInLocalStorage)
        );
        window.location.href = `cart.html?id=${id}`;
      }
    } else {
      productInLocalStorage = [];
      productInLocalStorage.push(basket);
      localStorage.setItem(
        "productCart",
        JSON.stringify(productInLocalStorage)
      );
      window.location.href = `cart.html?id=${id}`;
    }
  });
}
