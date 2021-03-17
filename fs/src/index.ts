import express from 'express'
import path from 'path'
import fs from 'fs'
import bodyParser from 'body-parser'
import serveIndex from 'serve-index'
import dotenv from 'dotenv'
import { uploadMiddleware } from './upload'
dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
const port = process.env.PORT || 9050

// Send index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Upload Files
app.post('/upload', (req, res) => uploadMiddleware(res, req))
app.get('/upload', (req, res) => {
    res.send({ 
        error: 'methodNotAllowed',
        message: 'GET is not a valid method for this endpoint'
    })
})

// Serve Static Files
app.use(serveIndex(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

// Start Server
app.listen(port, () => {
    // Create 'pub' dir to store files
    if (!fs.existsSync(path.join(__dirname, 'public', 'pub' ))) {
        fs.mkdirSync(path.join(__dirname, 'public', 'pub'))
    }
    console.log(`🚀 App listening at http://localhost:${port}`)
})