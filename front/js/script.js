const url = "http://localhost:3000/api/products";

fetch(url)
  .then((response) => response.json())
  .then((data) => create(data));

function create(api) {
  api.forEach((api) => {
    const link = document.createElement("a");

    const article = document.createElement("article");

    const image = document.createElement("img");

    const title = document.createElement("h3");

    const description = document.createElement("p");

    function myLink() {
      document.getElementById("items").appendChild(link);
      link.href = `./product.html?id=${api._id}`;
    }

    function myArticle() {
      link.appendChild(article);
    }
    function picture() {
      article.appendChild(image);
      image.src = api.imageUrl;
      image.alt = api.altTxt;
    }
    function myTitle() {
      article.appendChild(title);
      title.innerHTML = api.name;
    }
    function myDescription() {
      article.appendChild(description);
      description.innerHTML = api.description;
    }

    myLink();
    myArticle();
    picture();
    myDescription();
    myTitle();
  });
}
