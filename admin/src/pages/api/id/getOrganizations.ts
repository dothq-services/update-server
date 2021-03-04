import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const token = jwt.verify(
        req.body.token,
        process.env.JWT_KEY
    )
    axios.get('https://api.github.com/user/orgs', {
        headers: {
            'Authorization': `bearer ${token.token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    }).then((ghreq) => {
        var i
        for (i=0; i < (ghreq as any).length; ++i) { 
            if (JSON[i].login === 'dothq') { 
                res.json({ success: 'dothq' })
            } 
        }

    }).catch((err) => {
        res.send('err')
    })
}