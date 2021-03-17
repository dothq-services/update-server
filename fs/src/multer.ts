import multer from 'multer'
import path from 'path'
import fs from 'fs-extra'


// Upload File
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        // This is extremely important, but MAKE SURE TO SUBMIT THE FILE LOCATION BEFORE THE ACUTAL FILE
        // Like, just make sure the file order is { fileLocation, releaseFile }
        // Otherwise the location is "undefined"

        try {
            // Strip slash from file location (to prevent "pubundefined"-type errors)
            let location = req.body.fileLocation
            if (req.body.fileLocation) {
                if (req.body.fileLocation.substring(0, 1) === '/') {
                    location = req.body.fileLocation.substring(1)
                } else {
                    location = req.body.fileLocation
                }
            } else {
                location = ''
            }
            // Verify that the folder exists, and if not, create it
            await fs.ensureDir(path.join(__dirname, 'public', 'pub', location), err => {
                if (err) console.log(err)
            })
            // Return the file location
            cb(null, path.join(__dirname, 'public', 'pub', location))
        } catch {
            return null;
        }
        
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage }).single('releaseFile');

export default upload;