function removeCardLeft(cardControlElement) {
  cardControl("left", false, cardControlElement);
}

function insertCardLeft(cardControlElement) {
  cardControl("left", true, cardControlElement);
}

function removeCardRight(cardControlElement) {
  cardControl("right", false, cardControlElement);
}

function insertCardRight(cardControlElement) {
  cardControl("right", true, cardControlElement);
}

function cardControl(position, isIn, cardElement) {
  const positions = ["left", "right"];

  if (positions.includes(position) == false) {
    throw "position not valid try " + positions;
  }

  cardElement.classList.add("animate__animated");
  if (isIn) {
    cardElement.classList.remove(
      "animate__fadeOut" + capitalize(position) + "Big"
    );
    cardElement.classList.add("animate__fadeIn" + capitalize(position) + "Big");
  } else {
    cardElement.classList.remove(
      "animate__fadeIn" + capitalize(position) + "Big"
    );
    cardElement.classList.add(
      "animate__fadeOut" + capitalize(position) + "Big"
    );
  }

  // document.querySelector(`.card-control.insert-${position}`).style.display =
  //   "block";

  const x = document.querySelector(`.card-control.insert-${position}`);
  x.innerHTML = null;

  if (position == "left") {
    const flip = document.createElement("div");
    flip.classList.add("card-flip");
    flip.innerHTML = cardElement.innerHTML;

    cardElement.innerHTML = null;
    cardElement.appendChild(flip);
  }

  x.appendChild(cardElement);
}

function capitalize(str) {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}

function createCardElement({ id, holderName, number, brand, validate }) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.id = id;

  const companyElement = document.createElement("div");
  companyElement.classList.add("card-company");

  const companyImgElement = document.createElement("img");
  companyImgElement.src = "assets/logo.png";

  companyElement.appendChild(companyImgElement);
  cardElement.appendChild(companyElement);

  const bodyElement = document.createElement("div");
  bodyElement.classList.add("card-body");

  const chipElement = document.createElement("div");
  chipElement.classList.add("card-chip");

  const chipImgElement = document.createElement("img");
  chipImgElement.src = "assets/card-chip.png";

  chipElement.appendChild(chipImgElement);

  bodyElement.appendChild(chipElement);

  const numberElement = document.createElement("div");
  numberElement.classList.add("card-number");

  for (let n of number) {
    const spanElement = document.createElement("span");
    spanElement.textContent = n;

    numberElement.appendChild(spanElement);
  }

  bodyElement.appendChild(numberElement);

  const validateElement = document.createElement("div");
  validateElement.classList.add("card-validate");
  validateElement.textContent = validate;

  bodyElement.appendChild(validateElement);

  const footerElement = document.createElement("div");
  footerElement.classList.add("card-footer");

  const holderNameElement = document.createElement("div");
  holderNameElement.classList.add("card-holder-name");
  holderNameElement.textContent = holderName;

  cardElement.appendChild(bodyElement);

  footerElement.appendChild(holderNameElement);

  const brandElement = document.createElement("div");
  brandElement.classList.add("card-brand");

  const brandImgElement = document.createElement("img");
  brandImgElement.src = "assets/brand-logo.png";

  brandElement.appendChild(brandImgElement);

  footerElement.appendChild(brandElement);
  cardElement.appendChild(footerElement);

  return cardElement;
}

async function showBalance(cardId, textElement) {
  return new Promise((resolve, reject) => {
    const cardStorage = getCardStorage(cardId);
    textElement.textContent = cardStorage.saldo;
    playAudioAsync(3, 150);
    setTimeout(resolve, 3000);
  });
}
