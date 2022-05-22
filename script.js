var cardDestin;
var cardOrigin;

window.onload = () => {
  insertDefaultsCards();
  initCardMachine();
  renderWallet();
};

function initCardMachine() {
  const btnElements = document.getElementsByClassName("btn");
  for (let btnElement of btnElements) {
    btnElement.addEventListener("click", (e) => {
      playAudio();

      const mOrK = document.querySelector(".mk");
      const textElement = document.getElementById("display-input");
      let txt = textElement.textContent;
      const dataKey = btnElement.getAttribute("data-key");

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
          const cardDestinyElement = document.querySelector(
            ".card-control.insert-left .card"
          );
          const cardOriginElement = document.querySelector(
            ".card-control.insert-right .card"
          );

          if (!cardDestinyElement) {
            alert("Escolha um cartão para receber o valor");
          } else if (!cardOriginElement) {
            alert("Escolha um cartão para enviar o valor");
          } else {
            console.log("transfere " + textElement.textContent);

            const value = parseFloat(textElement.textContent);

            const cardOriginOld = getCardStorage(cardOriginElement.id);
            const cardDestinyOld = getCardStorage(cardDestinyElement.id);
            transfere(cardOriginElement.id, cardDestinyElement.id, value);
            const cardDestinyNew = getCardStorage(cardDestinyElement.id);
            const cardOriginNew = getCardStorage(cardOriginElement.id);

            await animateValueAsync(
              textElement,
              cardOriginOld.saldo,
              cardOriginNew.saldo
            );

            await animateValueAsync(
              textElement,
              cardDestinyOld.saldo,
              cardDestinyNew.saldo
            );

            // await showBalance(cardOriginElement.id, textElement);
            // await showBalance(cardDestinyElement.id, textElement);

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
      if (!cardDestin) {
        cardDestin = true;
        insertCardLeft(clone);
        clone.onclick = () => {
          cardDestin = false;
          cardElement.style.display = "block";
          removeCardLeft(clone);
        };
      } else if (cardDestin && !cardOrigin) {
        cardOrigin = true;
        insertCardRight(clone);
        clone.onclick = () => {
          cardOrigin = false;
          cardElement.style.display = "block";
          removeCardRight(clone);
        };
      }
    };
    walletElement.appendChild(cardElement);
  }
}

async function playAudioAsync(x = 1, duration) {
  for (let i = 0; i < x; i++) {
    console.log("gug", i);
    await playAudio(duration);
  }
}
async function playAudio(duration) {
  const clickAudio = document.getElementById("click-audio");
  if (!duration) duration = clickAudio.duration * 1000;
  return new Promise((resolve, reject) => {
    clickAudio.currentTime = 0;
    clickAudio.play();
    setTimeout(resolve, duration);
  });
}

async function animateValueAsync(element, to, from) {
  element.textContent = to;
  sleep(1500);
  await playAudioAsync(3, 150);

  let valueTo = parseFloat(to);
  let valueFrom = parseFloat(from);
  const isPlus = valueFrom > valueTo;

  let valueDiff = to - from;
  if (valueDiff < 0) valueDiff = valueDiff * -1;
  let diff = 10;

  if (valueDiff > 10000) {
    diff = 500;
  } else if (valueDiff > 1000) {
    diff = 150;
  } else if (valueDiff > 100) {
    diff = 100;
  }

  return new Promise((resolve) => {
    const intervalId = setInterval(async () => {
      playAudio();
      valueTo = isPlus ? valueTo + diff : valueTo - diff;
      element.textContent = valueTo;

      if (
        (isPlus && valueTo >= valueFrom) ||
        (!isPlus && valueTo <= valueFrom)
      ) {
        clearInterval(intervalId);
        element.textContent = valueFrom;
        await sleep(1500);
        element.textContent = "-";
        await sleep(800);

        resolve();
      }
    }, 70);
  });
}

async function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}
