import express from 'express'
import { Releases } from './lib/database'

const app = express();
const port = 9010;

app.get("/", (req, res) => {
    res.send('The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.');
});

app.get('/update/1/:product/:version/:buildID/:buildTarget/:locale/:channel/update.xml', async (req, res) => {  
    const rel = await Releases.findAll({
        where: {
            product: req.params.product,
            target: req.params.buildTarget,
            locale: req.params.locale,
            channel: req.params.channel
        }
    })
    // Make sure a release exists
    if (!rel[0]) {
        res.header("Content-Type", "text/xml");
        res.end(`<?xml version="1.0"?>
<updates></updates>`) 
    }
    // Sort all releases (in case there is multiple)
    const top = rel.sort((a: any, b: any) => parseFloat(b.id) - parseFloat(a.id));
    // Element that has all data for the release
    const data = (top[0] as any).dataValues;
    // Check if either the version, or build ID are the same
    if (data.version === req.params.version || data.buildID === req.params.buildID) {
        res.header("Content-Type", "text/xml");
        res.end(`<?xml version="1.0"?>
<updates></updates>`) 
    }
    // Make sure a release exists
    if (data.id) {
        res.header("Content-Type", "text/xml");
        res.end(`<?xml version="1.0"?>
<updates>
        <update actions="showURL" appVersion="${data.version}" buildID="${data.buildID}" detailsURL="${data.releasenotesurl}" displayVersion="${data.displayversion}" openURL="${data.whatsnewurl}" type="${data.releasetype}">
            <patch type="complete" URL="${data.releaseurl}" hashFunction="sha512" hashValue="${data.releasesha512}" size="${data.releasesize}" />
        </update>
</updates>`);
    } else {
      res.header("Content-Type", "text/xml");
      res.end(`<?xml version="1.0"?>
<updates></updates>`)  
    }
})

app.listen(port, () => {
    console.log(`🆙  Dot Update Server started at http://localhost:${port}`)
});