import { Releases } from '../../../lib/database';
import Sequelize from 'sequelize'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // Verify all the values exist
        const param = req.body;
        if (
            (param.name ||
            param.product ||
            param.channel ||
            param.target ||
            param.locale ||
            param.version ||
            param.displayVersion ||
            param.buildID ||
            param.whatsNewURL ||
            param.releaseNotesURL ||
            param.releaseFileURL ||
            param.releaseFileSize ||
            param.releaseFileChecksum) === undefined
        ) {
            return res.status(400).json({ error: 'missingParameters', message: 'A required parameter is missing' })
        }
        // Get the ID
        let id = 0;
        const rel = await Releases.findAll({
            // Get all the elements in the Releases table, with the highest ID at the top
            order: Sequelize.literal('id DESC'),
        })
        id = +rel[0].getDataValue('id') + 1; // generate an ID that is one higher than the previous one
        // Let's verify the Token again
        if (param.token === undefined) {
            return res.status(400).json({ error: 'authError', message: 'The auth token is missing'})
        }
        await axios.post(`http://${req.headers.host}/api/id/getOrganizations`, {
            token: param.token
        }).then((values) => { 
            if (values.data.success === 'userValid') {
                // Create a new release on the Database
                const target = Releases.create({ 
                    name: req.body.name,
                    product: req.body.product,
                    channel: req.body.channel,
                    target: req.body.target,
                    locale: req.body.locale,
                    version: req.body.version,
                    displayVersion: req.body.displayVersion,
                    buildID: req.body.buildID,
                    whatsNewURL: req.body.whatsNewURL,
                    releaseNotesURL: req.body.releaseNotesURL,
                    releaseFileURL: req.body.releaseFileURL,
                    releaseFileSize: req.body.releaseFileSize,
                    releaseFileChecksum: req.body.releaseFileChecksum,
                    releaseType: 'minor',
                    id: id,
                }).then(() => {
                    res.status(200).json({ success: 'releaseAdded', message: 'Release Sucessfully Added' })
                }).catch((error) => {
                    res.status(400).json({ error: 'serverError', message: error })
                }); 
                return target;
            }
        }).catch((error) => {
            // Token auth didn't work
            return res.status(400).json({ error: 'authError', message: error })
        })
    } else {
        // Handle any other HTTP method
        return res.status(400).json({ error: 'invalidMethod', message: 'Invalid Request Method. Allowed Methods: POST' })
    }
}
  