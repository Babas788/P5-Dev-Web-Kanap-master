//creation image

// récupération id
const page = window.location.search;
const url = new URLSearchParams(page);
const id = url.get("id");

const myUrl = `http://localhost:3000/api/products/${id}`;

fetch(myUrl)
  .then((response) => response.json())
  .then((data) => create(data));

function create(product) {
  const image = document.createElement("img");
  const couleur = product.colors;

  insert(product);
  child();
  color();

  function child() {
    document.querySelector(".item__img").appendChild(image);
  }

  function insert(product) {
    image.src = product.imageUrl;
    document.getElementById("title").innerHTML = product.name;
    document.getElementById("price").innerHTML = product.price;
    document.getElementById("description").innerHTML = product.description;
  }

  function color() {
    couleur.forEach((color) => {
      const option = document.createElement("option");
      console.log(option);
      document.getElementById("colors").appendChild(option);
      option.value = color;
      option.textContent = color;
    });
  }
}
