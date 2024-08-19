import { getData } from "./getData.js";
import {
  createDiv,
  createImage,
  createP,
  createSpan,
  createHItem,
  creatHrItem,
} from "./createElements.js";

const pickedAmount = [];
const options = [];
let menu;

const productsList = document.getElementById("products");
const cart = document.getElementById("cart");

function createCartHeader(amount) {
  return createHItem(`Your Cart (${amount})`, 1);
}

function createEmptyCart() {
  cart.innerHTML = "";
  cart.appendChild(createCartHeader(0));
  cart.appendChild(
    createImage("./images/illustration-empty-cart.svg", "empty-image")
  );
  cart.appendChild(createP("Your added items will appear here"));
}

const createPriceSummary = (id, total = true) => {
  let div = createDiv("price-info");
  div.appendChild(createSpan(`${pickedAmount[id]}x`, "amount"));
  div.appendChild(createSpan(`@ $${menu[id].price.toFixed(2)}`, "unit-price"));
  if (total) {
    div.appendChild(
      createSpan(`$${pickedAmount[id] * menu[id].price.toFixed(2)}`, "price")
    );
  }
  return div;
};

const createProductSummary = (id) => {
  let div = createDiv("item-info");
  div.appendChild(createP(menu[id].name));
  div.appendChild(createPriceSummary(id));
  return div;
};

function removeProduct(id) {
  pickedAmount[id] = 0;
  toggleToCartButton(options[id].btn);
}

function showProduct(id) {
  let div = createDiv("item");
  div.appendChild(createProductSummary(id));
  const deleteImg = createImage("./images/icon-remove-item.svg", "delete");
  deleteImg.addEventListener("click", () => {
    removeProduct(id);
    updateCartContent();
  });
  div.appendChild(deleteImg);
  cart.appendChild(div);
  cart.appendChild(creatHrItem());
}

function addTotal(orderConfirmed = false) {
  let cartTotal = 0;
  pickedAmount.forEach((picked, index) => {
    if (picked > 0) {
      if (!orderConfirmed) {
        showProduct(index);
      }
    }
    cartTotal += picked * menu[index].price;
  });
  let div = createDiv("order-total");
  div.appendChild(createP("Order Total"));
  div.appendChild(createHItem(`$${cartTotal.toFixed(2)}`, 1, "total"));
  return div;
}

const addOrderedProduct = () => {
  const div = createDiv("order");
  pickedAmount.forEach((amount, index) => {
    if (amount > 0) {
      const product = createDiv("item");
      const productInfo = createDiv("item-info");
      productInfo.appendChild(createImage(menu[index].image.thumbnail));
      const nameAndPrice = createDiv("item-name-price");
      nameAndPrice.appendChild(createP(menu[index].name, "name"));
      nameAndPrice.appendChild(createPriceSummary(index, false));
      productInfo.appendChild(nameAndPrice);
      product.appendChild(productInfo);
      product.appendChild(
        createSpan(`$${(amount * menu[index].price).toFixed(2)}`, "price")
      );
      div.appendChild(product);
      div.appendChild(creatHrItem());
    }
  });
  div.appendChild(addTotal(true));
  return div;
};

function confirmOrder() {
  const div = createDiv("confirmation");
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
  const documentWidth = Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.body.clientWidth,
    document.documentElement.clientWidth
  );
  div.style.height = `${documentHeight}px`;
  div.style.width = `${documentWidth}px`;

  const confirmationForm = createDiv("confirmation-form");
  confirmationForm.appendChild(
    createImage("./images/icon-order-confirmed.svg")
  );
  confirmationForm.appendChild(createHItem("Order Confirmed", 1));
  confirmationForm.appendChild(createP("We hope you enjoy your food"));
  confirmationForm.appendChild(addOrderedProduct());

  const startNewOrder = document.createElement("button");
  startNewOrder.className = "start-new";
  startNewOrder.textContent = "Start New Order";

  startNewOrder.addEventListener("click", () => {
    pickedAmount.forEach((amount, index) => {
      if (amount > 0) {
        removeProduct(index);
      }
    });
    updateCartContent();
    const confirmation = document.querySelector(".confirmation");
    confirmation.remove();
  });
  confirmationForm.appendChild(startNewOrder);
  div.appendChild(confirmationForm);
  document.body.appendChild(div);
  window.scrollTo(0, 0);
}

const addDelevery = () => {
  const div = createDiv("delevery");
  div.appendChild(createImage("./images/icon-carbon-neutral.svg"));
  div.appendChild(createP("This is <b>carbon-neutral</b> delevery"));
  return div;
};

const addConfirmButton = () => {
  const button = document.createElement("button");
  button.textContent = "Confirm Order";
  button.className = "confirm";
  button.addEventListener("click", confirmOrder);
  return button;
};

function updateCartContent() {
  let total = pickedAmount.reduce((first, last) => {
    return first + last;
  });

  if (total == 0) {
    createEmptyCart();
  } else {
    cart.innerHTML = "";
    cart.appendChild(createCartHeader(total));
    cart.appendChild(addTotal());
    cart.appendChild(addDelevery());
    cart.appendChild(addConfirmButton());
  }
}

function toggleToAmountButton(button, id) {
  button.innerHTML = "";

  let decBtn = createImage("./images/icon-decrement-quantity.svg", "dec");
  decBtn.addEventListener("click", () => {
    pickedAmount[id]--;
  });

  let incBtn = createImage("./images/icon-increment-quantity.svg", "inc");
  incBtn.addEventListener("click", () => {
    pickedAmount[id]++;
  });

  button.appendChild(decBtn);
  button.appendChild(createSpan(pickedAmount[id], "amount"));
  button.appendChild(incBtn);

  button.classList.remove("cart-button");
  button.classList.add("amount-button");
}

function toggleToCartButton(button) {
  button.innerHTML = "";
  button.textContent = "Add To Cart";
  button.appendChild(createImage("./images/icon-add-to-cart.svg"));
  button.classList.remove("amount-button");
  button.classList.add("cart-button");
}

const createButton = (id) => {
  const button = document.createElement("button");
  button.addEventListener("click", () => {
    if (pickedAmount[id] <= 0) {
      pickedAmount[id]++;
    }
    if (pickedAmount[id] > 0) {
      toggleToAmountButton(button, id);
      updateCartContent();
    } else {
      toggleToCartButton(button);
      updateCartContent();
    }
  });
  toggleToCartButton(button);
  const buttons = {};
  buttons.btn = button;
  options.push(buttons);
  return button;
};

function createProcuct(product) {
  const productDiv = createDiv("product");
  productDiv.appendChild(createImage(product.image.desktop));
  productDiv.appendChild(createButton(pickedAmount.length));
  productDiv.appendChild(createP(product.category, "category"));
  productDiv.appendChild(createP(product.name, "name"));
  productDiv.appendChild(createP(`$${product.price.toFixed(2)}`, "price"));

  pickedAmount.push(0);

  return productDiv;
}

function addProduct(product) {
  product.forEach((element) => {
    productsList.appendChild(createProcuct(element));
  });
}

async function displayProduct() {
  let result = await getData();
  menu = result;
  addProduct(result);
}

displayProduct();
createEmptyCart();
