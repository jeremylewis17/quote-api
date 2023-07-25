const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, getElementById, getIndexById, createQuote } = require('./utils');

const PORT = process.env.PORT || 4001;
app.use(express.static('public'));

app.listen(PORT, () =>{
    console.log(`Starting up server on ${PORT}`);
});

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = {quote: getRandomElement(quotes)};
    res.send(randomQuote);
});

app.get('/api/quotes/:id', (req, res, next) => {
    const quote = getElementById(req.params.id);
    if (!quote){
        res.status(404).send();
    } else {
        res.send(quote);
    }
});

//send the full array of quotes if no person was given. Otherwise give an array of quotes from that person
app.get('/api/quotes', (req, res, next) => {
    const quotesFromPerson = [];
    const person = req.query.person;
    if (!person){
        quotes.forEach((quoteObj) => {
            quotesFromPerson.push(quoteObj.quote);
        });
    } else {
        quotes.forEach((quoteObj) => {
            if (quoteObj.person === person){
                quotesFromPerson.push(quoteObj.quote);
            }
        });
    }
    res.send({quotes: quotesFromPerson});
});

app.post('/api/quotes', (req, res, next) => {
    if (!req.query.quote || !req.query.person){
        res.status(400).send();
    } else {
        const newQuoteObject = createQuote(req.query.quote, req.query.person);
        quotes.push(newQuoteObject);
        res.send({quote: newQuoteObject});
    }
});

app.put('/api/quotes/:id', (req, res, next) => {
    const quoteIndex = getIndexById(req.params.id);
    if (quoteIndex === -1){
        res.status(404).send()
    } else {
        const replacementQuote = {id: Number(req.params.id), quote: req.query.quote, person: req.query.person};
        quotes[quoteIndex] = replacementQuote;
        res.send(replacementQuote);
        }
    });

app.delete('/api/quotes/:id', (req, res, next) => {
    const quoteIndex = getIndexById(req.params.id);
    if (quoteIndex === -1){
        res.status(404).send()
    } else {
        quotes.splice(quoteIndex, 1);
        res.status(204).send();
    }
});