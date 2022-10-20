const url = "http://localhost:3000/api/products";

fetch(url)
  .then((response) => response.json())
  .then((data) =>
    //boucle pour injection de données API
    data.forEach((data) => {
      //creation du parent a pour lien
      const link = document.createElement("a");
      link.href = `./product.html?id=${data._id}`;

      //déclaration de mes constantes
      const article = document.createElement("article");

      const image = document.createElement("img");

      const title = document.createElement("h3");

      const description = document.createElement("p");

      //initiation de mes programmes en fonctions
      function Child() {
        document.getElementById("items").appendChild(link);
        article.appendChild(image);
        article.appendChild(description);
        article.appendChild(title);
        link.appendChild(article);
      }

      function insert() {
        description.innerHTML = data.description;
        title.innerHTML = data.name;
        image.src = data.imageUrl;
        image.alt = data.altTxt;
      }

      function classList() {
        description.classList.add("productDescription");
        title.classList.add("productName");
      }

      Child();
      insert();
      classList();
    })
  );
