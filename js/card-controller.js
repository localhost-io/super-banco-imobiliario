console.log("card-controller");
const storage = window.localStorage;
const CARD_PREFIX = "card#";

const cards = [
  {
    id: 1,
    holderName: "Ezio L. Fonseca",
    number: ["1233", "2342", "1231", "5362"],
    validate: "00/00",
    saldo: 25000,
  },
  {
    id: 2,
    holderName: "Deivid F. Oliveira",
    number: ["1233", "2342", "1231", "0975"],
    validate: "00/00",
    saldo: 25000,
  },
  {
    id: 3,
    holderName: "Alves A. Braga",
    number: ["1233", "2342", "1231", "1853"],
    validate: "00/00",
    saldo: 25000,
  },
  {
    id: 4,
    holderName: "Pereira F. Silva",
    number: ["1233", "2342", "1231", "0932"],
    validate: "00/00",
    saldo: 25000,
  },
  {
    id: 5,
    holderName: "Juma A. Marrua",
    number: ["1233", "2342", "1231", "5679"],
    validate: "00/00",
    saldo: 25000,
  },
  {
    id: 6,
    holderName: "Alice P. Maravilha",
    number: ["1233", "2342", "1231", "1232"],
    validate: "00/00",
    saldo: 25000,
  },
];

function insertDefaultsCards() {
  console.log("insertDefaultsCards");
  for (let card of cards) {
    if (getCardStorage(card.id)) {
      continue;
    }
    setCardStorage(card);
  }
}

function getCards() {
  console.log("getCards");
  const cards = [];
  for (let [key, value] of Object.entries(storage)) {
    if (key.startsWith(CARD_PREFIX)) {
      cards.push(JSON.parse(value));
    }
  }

  return cards;
}

function transfere(cardOriginId, cardDestinId, value) {
  console.log("transfere", cardOriginId, cardDestinId, value);
  const cardOrigin = getCardStorage(cardOriginId);
  const cardDestin = getCardStorage(cardDestinId);

  if (cardOrigin.saldo >= value) {
    cardOrigin.saldo = cardOrigin.saldo - value;
    cardDestin.saldo = cardDestin.saldo + value;

    setCardStorage(cardOrigin);
    setCardStorage(cardDestin);
  } else {
    alert("Saldo insuficiente");
  }
}

function getCardStorage(cardId) {
  return JSON.parse(storage.getItem(CARD_PREFIX + cardId));
}

function setCardStorage(card) {
  storage.setItem(CARD_PREFIX + card.id, JSON.stringify(card));
}
