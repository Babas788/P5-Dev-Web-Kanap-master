const url = "http://localhost:3000/api/products";

fetch(url)
  .then((response) => response.json())
  .then((data) =>
    //boucle pour injection de données API
    data.forEach((data) => {
      //creation du parent a pour lien
      const link = document.createElement("a");
      document.getElementById("items").appendChild(link);
      link.href = `./product.html?id=${data._id}`;

      //déclaration de mes constantes
      const article = document.createElement("article");
      link.appendChild(article);

      const image = document.createElement("img");

      const title = document.createElement("h3");

      const description = document.createElement("p");

      //initiation de mes programmes en fonctions

      function picture() {
        document.createElement("img");
        article.appendChild(image);
        image.src = data.imageUrl;
        image.alt = data.altTxt;
      }

      function myTitle() {
        article.appendChild(title);
        title.innerHTML = data.name;
        title.classList.add("productName");
      }
      function myDescription() {
        article.appendChild(description);
        description.innerHTML = data.description;
        description.classList.add("productDescription");
      }

      picture();
      myTitle();
      myDescription();
    })
  );
