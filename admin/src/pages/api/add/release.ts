import { Releases } from '../../../lib/database';
import Sequelize from 'sequelize'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // Get the ID
        let id = 0;
        const rel = await Releases.findAll({
            // Get all the elements in the Releases table, with the highest ID at the top
            order: Sequelize.literal('id DESC'),
        })
        id = +rel[0].dataValues.id + 1; // generate an ID that is one higher than the previous one
        // Obviously, we want to verify that the token is valid
        // Next, verify that all the columns have valid info to add
        // then we submit it to the DB, which sends it to the public server :)
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
            id: 0,
        }).then(() => {
            res.status(200).json({ success: 'Release Added'})
        }).catch((e) => {
            console.log(e)
            res.status(400).json({ error: e })
        }); 
        target;
    } else {
        // Handle any other HTTP method
        res.status(400).json({ error: 'Invalid Request Type' })
    }
}
  