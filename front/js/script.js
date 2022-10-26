const url = "http://localhost:3000/api/products";

fetch(url)
  .then((response) => response.json())
  .then((data) => create(data));

function create(product) {
  product.forEach((product) => {
    const link = document.createElement("a");

    const article = document.createElement("article");

    const image = document.createElement("img");

    const title = document.createElement("h3");

    const description = document.createElement("p");

    myLink(product);
    myArticle(product);
    picture(product);
    myDescription(product);
    myTitle(product);

    function myLink(product) {
      document.getElementById("items").appendChild(link);
      link.href = `./product.html?id=${product._id}`;
    }

    function myArticle() {
      link.appendChild(article);
    }
    function picture(product) {
      article.appendChild(image);
      image.src = product.imageUrl;
      image.alt = product.altTxt;
    }
    function myTitle(product) {
      article.appendChild(title);
      title.classList.add("productName");
      title.innerHTML = product.name;
    }
    function myDescription(product) {
      article.appendChild(description);
      description.classList.add("productDescription");
      description.innerHTML = product.description;
    }
  });
}
