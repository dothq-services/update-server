
import { readFileSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import { resolve } from 'path'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const products = readFileSync(resolve(process.cwd(), "../", "config", "products.json"));

    res.status(200).json(products)
}