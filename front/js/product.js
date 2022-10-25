//creation image

// récupération id
const page = window.location.search;
const url = new URLSearchParams(page);
const id = url.get("id");
const myUrl = `http://localhost:3000/api/products/${id}`;

// récupération de mon prix
let myPrice;
let picture;
let accessibility;

fetch(myUrl)
  .then((response) => response.json())
  .then((data) => create(data));

function create(product) {
  myPicture(product);
  insert(product);

  //récup data
  const color = product.colors;
  myPrice = product.price;
  picture = product.imageUrl;
  accessibility = product.altTxt;

  //Mes fonctions

  function myPicture(product) {
    const image = document.createElement("img");
    document.querySelector(".item__img").appendChild(image);
    image.src = product.imageUrl;
    image.alt = product.altTxt;
  }

  function insert(product) {
    document.getElementById("title").innerHTML = product.name;
    document.getElementById("price").innerHTML = product.price;
    document.getElementById("description").innerHTML = product.description;
  }

  color.forEach((color) => {
    const option = document.createElement("option");
    document.getElementById("colors").appendChild(option);
    option.value = color;
    option.textContent = color;
  });
}

// récupération données bouton panier

const addBasket = document.getElementById("addToCart");

// creation d'un message d'alerte

addBasket.addEventListener("click", (e) => {
  const productColor = document.getElementById("colors").value;
  const productQuantity = document.getElementById("quantity").value;

  dataBaket(productColor, productQuantity);
  if (
    productColor == null ||
    productColor == "" ||
    productQuantity == null ||
    productQuantity == 0
  ) {
    alert("veuillez selectionner une couleur et une quantité valide!");
    return;
  }

  //récupération des données
  function dataBaket(productColor, productQuantity) {
    let myData = {
      id: id,
      color: productColor,
      price: myPrice,
      quantity: productQuantity,
      picture,
      accessibility,
    };

    localStorage.setItem(productColor, JSON.stringify(myData));
    window.location.href = "cart.html";
  }
});
