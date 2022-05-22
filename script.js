var cardDestin;
var cardOrigin;

window.onload = () => {
  insertDefaultsCards();
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

        setTimeout(async () => {
          const cardDestinyElement = document.querySelector('.card-control.insert-left .card');
          const cardOriginElement = document.querySelector('.card-control.insert-right .card');

          if (!cardDestinyElement) {
            alert('Escolha um cartão para receber o valor');
          } else if (!cardOriginElement) {
            alert('Escolha um cartão para enviar o valor');
          } else {
            console.log("transfere " + textElement.textContent);
            const value = parseFloat(textElement.textContent);
            transfere(cardOriginElement.id, cardDestinyElement.id, value);
            await showBalance(cardOriginElement.id, textElement);
            await showBalance(cardDestinyElement.id, textElement);
            textElement.textContent = "0";
            mOrK.textContent = null;
          }

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

  const cards = getCards();

  for (let i in cards) {
    const card = cards[i];
    const cardElement = createCardElement(card);
    cardElement.classList.add("card-bg-" + i);

    cardElement.onclick = function () {
      const clone = cardElement.cloneNode(true);
      if (!cardOrigin || !cardDestin) {
        cardElement.style.display = "none";
      }
      if (!cardOrigin) {
        cardOrigin = true;
        insertCardRight(clone);
        clone.onclick = () => {
          cardOrigin = false;
          cardElement.style.display = "block";
          removeCardRight(clone);
        };
      } else if (cardOrigin && !cardDestin) {
        cardDestin = true;
        insertCardLeft(clone);
        clone.onclick = () => {
          cardDestin = false;
          cardElement.style.display = "block";
          removeCardLeft(clone);
        };
      }
    };
    walletElement.appendChild(cardElement);
  }
}
