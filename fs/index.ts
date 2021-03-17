import express from 'express'

const app = express()
const port = process.env.PORT || 9050

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`🚀 App listening at http://localhost:${port}`)
})