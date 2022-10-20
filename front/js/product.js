//creation image

// récupération id
const page = window.location.search;
const url = new URLSearchParams(page);
const id = url.get("id");

const api = `http://localhost:3000/api/products/${id}`;

fetch(api)
  .then((response) => response.json())
  .then((data) => {
    const image = document.createElement("img");

    const couleur = data.colors;

    function child() {
      document.querySelector(".item__img").appendChild(image);
    }

    function insert() {
      image.src = data.imageUrl;
      document.getElementById("title").innerHTML = data.name;
      document.getElementById("price").innerHTML = data.price;
      document.getElementById("description").innerHTML = data.description;
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

    color();
    insert();
    child();
  });
