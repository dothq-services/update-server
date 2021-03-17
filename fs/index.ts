import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import fs from 'fs'
import serveIndex from 'serve-index'
import multer from 'multer'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
const port = process.env.PORT || 9050

// Send index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Upload File

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // This is extremely important, but MAKE SURE TO SUBMIT THE FILE LOCATION BEFORE THE ACUTAL FILE
        // Like, just make sure the file order is { fileLocation, releaseFile }
        // Otherwise the location is "undefined"
        try {
            let location = req.body.fileLocation
            if (req.body.fileLocation) {
                if (req.body.fileLocation.substring(0, 1) === '/') {
                    location = req.body.fileLocation.substring(1)
                } else {
                    location = req.body.fileLocation
                }
            }
            if (!fs.existsSync(path.join(__dirname, `./public/pub/${location}`))) {
                fs.mkdirSync(path.join(__dirname, `./public/pub/${location}/`), { recursive: true })
            } 
            cb(null, `./public/pub/${req.body.fileLocation}`)
        } catch {
            return null;
        }
        
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage }).single('releaseFile');
app.post('/upload', (req, res, next) => {
    upload(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            res.status(500).send({
                error: 'serverError',
                message: `Something went wrong on our end: ${err}`
            })
            return console.log(`❌ Server Error: ${err}`)
        } else if (err) {
            res.status(400).send({
                error: 'clientError',
                message: `Something went wrong on your end: ${err}. NOTE: If the error is ENOENT, try switching the order of your parameters.`
            })
            return console.log(`❌ Client Error: ${err}`)
        }

        const file = req.file;
        if (!file) {
            return res.status(400).send({
                error: 'noFiles',
                message: 'No files were uploaded to the server'
            })
        }

        res.send({
            success: 'fileUploaded',
            message: 'File successfully uploaded',
            location: `/pub/${req.body.fileLocation}/${req.file.originalname}`
        })
        console.log(`✅ File Uploaded to /pub/${req.body.fileLocation}/${req.file.originalname}`)
    })
    
})

// Serve Static Files
app.use(serveIndex('public'))
app.use(express.static('public'))

// Start Server
app.listen(port, () => {
    console.log(`🚀 App listening at http://localhost:${port}`)
})