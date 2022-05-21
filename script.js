var cardLeft;
var cardRight;

window.onload = () => {
  initCardMachine();
  renderWallet();
};

function initCardMachine() {
  const clickAudio = document.getElementById("click-audio");
  const btnElements = document.getElementsByClassName("btn");
  for (let btnElement of btnElements) {
    btnElement.addEventListener("click", (e) => {
      clickAudio.currentTime = 0;
      clickAudio.play();

      const mOrK = document.querySelector(".mk");
      const textElement = document.getElementById("display-input");
      let txt = textElement.textContent;
      const dataKey = btnElement.getAttribute("data-key");
      console.log(dataKey, !!txt);
      if (dataKey == "Backspace") {
        mOrK.textContent = null;
        textElement.textContent = "0";
      } else if (!!parseInt(txt) && ["m", "k"].includes(dataKey)) {
        mOrK.textContent = dataKey;
        if (dataKey == "m") {
          let value = txt.includes(".") ? txt + "00" : txt + "000";
          textElement.textContent = value;
        }

        setTimeout(() => {
          alert("transfere " + textElement.textContent);
          textElement.textContent = "0";
          mOrK.textContent = null;
        }, 1500);
      } else if ([...Array(10).keys(), "."].map(String).includes(dataKey)) {
        if (txt == 0) txt = "";
        let value = txt + btnElement.getAttribute("data-key");
        if (value.length < 10) {
          textElement.textContent = value;
        } else {
          alert("coloca validacao do tamanho max de n");
        }
      }
    });
  }

  document.addEventListener("keyup", (e) => {
    const keyElement = document.querySelector(`[data-key='${e.key}']`);
    if (keyElement) {
      keyElement.classList.add("active");
      keyElement.click();
    }
  });
}

function renderWallet() {
  const walletElement = document.getElementById("wallet");

  const cards = Array(6).fill({
    id: "1",
    holderName: "Deivid F. Oliveira",
    number: ["1233", "2342", "1231", "1232"],
    validate: "00/00",
  });

  for (let i in cards) {
    const card = cards[i];
    const cardElement = createCardElement(card);
    cardElement.classList.add("card-bg-" + i);

    cardElement.onclick = function () {
      const clone = cardElement.cloneNode(true);
      if (!cardRight || !cardLeft) {
        cardElement.style.display = "none";
      }
      if (!cardRight) {
        cardRight = true;
        insertCardRight(clone);
        clone.onclick = () => {
          cardRight = false;
          cardElement.style.display = "block";
          removeCardRight(clone);
        };
      } else if (cardRight && !cardLeft) {
        cardLeft = true;
        insertCardLeft(clone);
        clone.onclick = () => {
          cardLeft = false;
          cardElement.style.display = "block";
          removeCardLeft(clone);
        };
      }
    };
    walletElement.appendChild(cardElement);
  }
}
