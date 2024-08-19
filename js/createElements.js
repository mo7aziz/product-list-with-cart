export const createDiv = (className, inner = "") => {
  const divItem = document.createElement("div");
  divItem.classList.add(className);
  divItem.innerHTML = inner;
  return divItem;
};

export const createImage = (src, className = "") => {
  const img = document.createElement("img");
  img.setAttribute("src", src);
  img.className = className;
  return img;
};

export const createP = (content, className = "") => {
  const pItem = document.createElement("p");
  pItem.innerHTML = content;
  pItem.className = className;
  return pItem;
};

export const createSpan = (content, className = "") => {
  const span = document.createElement("span");
  span.innerHTML = content;
  span.classList.add(className);
  return span;
};

export const createHItem = (content, size, className = "") => {
  const hItem = document.createElement("h" + size);
  hItem.innerHTML = content;
  hItem.className = className;
  return hItem;
};

export const creatHrItem = () => {
  const hrItem = document.createElement("hr");
  return hrItem;
};
