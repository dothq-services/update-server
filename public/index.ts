import express from 'express'

const app = express();
const port = 9020;

app.get("/", (req, res) => {
    res.send('Hello World!');
});

app.get('/update/1/:product/:version/:buildID/:buildTarget/:locale/:channel/update.xml', (req, res) => {
    res.send('Product is set to ' + req.params.buildID)
})

app.listen(port, () => {
    console.log(`DotUpdate Server Started at http://localhost:${port}`)
});