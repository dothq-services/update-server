import multer from 'multer'
import upload from './multer'
import authenticate from './auth'

export async function uploadMiddleware(res: any, req: any) {
    upload(req, res, (err: any) => {
        // Make sure no client/server errors happen before the actual work starts
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

        // Authenticate user
        authenticate(req, res, () => {
            const file = req.file;
                if (!file) {
                    return res.status(400).send({
                        error: 'noFiles',
                        message: 'No files were uploaded to the server'
                    })
                }

                res.header('Access-Control-Allow-Origin', '*')

                res.send({
                    success: 'fileUploaded',
                    message: 'File successfully uploaded',
                    location: `/pub/${req.body.fileLocation}/${req.file.originalname}`
                })
                console.log(`✅ File Uploaded to /pub/${req.body.fileLocation}/${req.file.originalname}`)
        })
    })
}