const sha512 = require('js-sha512')

export const calculateFileChecksum = (file, callback) => {
    let reader = new FileReader()
    reader.onload = (event) => {
        let hash: string = sha512(reader.result);
        callback(hash)
    }
    // TODO: This will require a CORS fix (next.config.js), but I don't understand CORS well enought to configure it to not break logins
    reader.readAsArrayBuffer(file)
}