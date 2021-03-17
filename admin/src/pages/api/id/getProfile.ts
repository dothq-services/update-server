import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const token = jwt.verify(
        req.body.token,
        process.env.JWT_KEY
    )
    axios.get('https://api.github.com/user', {
        headers: {
            'Authorization': `bearer ${token.token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    }).then((ghreq) => {
        res.send(ghreq.data)
    }).catch((err) => {
        res.send('err')
    })
}