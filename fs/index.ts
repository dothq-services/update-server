import express from 'express'
import path from 'path'
const serveIndex = require('serve-index')

const app = express()
const port = process.env.PORT || 9050

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use(serveIndex('public'))

app.use(express.static('public'))

app.listen(port, () => {
    console.log(`🚀 App listening at http://localhost:${port}`)
})