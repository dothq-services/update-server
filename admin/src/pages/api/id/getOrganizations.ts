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
            'Authorization': `Bearer ${token.token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    }).then((ghreq) => {
        var i
        for (i=0; i < (ghreq as any).data.length; ++i) { 
            if (ghreq.data[i].login === 'dothq') { 
                res.json({ success: 'userValid' })
            } 
        }

    }).catch((err) => {
        res.send('err: ' + err)
    })
}