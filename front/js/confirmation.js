const id = new URL(window.location.href).searchParams.get("id");
const orderId = document.getElementById("orderId");
orderId.textContent = id;

localStorage.getItem("productCart");
localStorage.clear();
