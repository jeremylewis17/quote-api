const { quotes } = require('./data');

let quoteIdCounter = 13;

const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const getElementById = (id) => {
  return quotes.find((element) => {
    return element.id === Number(id);
  });
};

const getIndexById = (id) => {
  return quotes.findIndex((element) => {
    return element.id === Number(id);
  });
};

const createQuote = (quote, person) => {
  if (quote && person) {
    quoteIdCounter ++;
    let currentId = quoteIdCounter;
    return {
      'id':    currentId,
      'quote': quote,
      'person':  person,
    };
  } else {
    return false;
  }
};


module.exports = {
  getRandomElement,
  getElementById,
  getIndexById,
  createQuote
};
