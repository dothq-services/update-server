import express from 'express'

const app = express();
const port = 9020;

app.get("/", (req, res) => {
    res.send('Hello World!');
});

app.get('/update/1/:product/:version/:buildID/:buildTarget/:locale/:channel/update.xml', (req, res) => {
    // Ok, so basically, first, check for all releases that have the same channel, build target, and locale, and product.
    // Then filter through until we find one that has the newest version
    // If none exist, just show a blank update.xml
    
    //res.header("Content-Type", "text/xml");
    //res.end(`<?xml version="1.0"?>
    //<updates></updates>`)
})

app.listen(port, () => {
    console.log(`DotUpdate Server Started at http://localhost:${port}`)
});