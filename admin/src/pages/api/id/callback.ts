import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    axios.post('https://github.com/login/oauth/access_token', {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
        state: req.query.state,
        redirect_uri: process.env.REDIRECT_URI
    }).then(() => {
        res.redirect('/')
    })
}