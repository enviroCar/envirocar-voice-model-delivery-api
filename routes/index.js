import express from "express"
import fs from 'fs'
import logger from "../index.js"

const router = express.Router();

let models = fs.readdirSync("./assets")


router.get('/', (req,res) => {
    logger.debug(`'/' called by ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)

    res.send("enviroCar: Wake Word Model Delivery API ⚙")
})

router.get('/refresh', (req,res) => {
    logger.debug(`'refresh' called by ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)

    try{
        models = fs.readdirSync("./assets")
        res.send("Models list refreshed successfully ✔")
    }
    catch(e){
        res.status(500).send("Server Error: Refresh failed")
        logger.error(e.toString())
    }
})

router.get('/latest', async (req,res) => {
    logger.debug(`'latest' called by ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)

    try{ 
        let latest = models.filter(file => file.toLowerCase().includes('latest'))
        if(latest.length != 1){
            res.status(500).send("Server Error: No file or more than 1 file with latest tag.")
            logger.warn("No file or more than 1 file with latest tag")
            return
        }

        latest = latest[0]
        const file = fs.createReadStream(`./assets/${latest}`);
        const meta = fs.statSync(`./assets/${latest}`)
        const disposition = 'attachment; filename="' + latest + '"';
        
        res.setHeader('Content-Type', 'application/x-7z-compressed');
        res.setHeader('Content-Length', meta.size);
        res.setHeader('Content-Disposition', disposition);
        
        file.pipe(res);

        // res.download(`/home/ubuntu/enviroCar-model-delivery-api/assets/Vosk-Model-Latest.7z`)

    }
    catch(e){
        res.status(500).send("Server Error: An internal server error occured.")
        logger.error(e.toString())
    }
    
})

router.get('/models', (req,res)=> {
    logger.debug(`'models' called by ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)

    res.send(fs.readdirSync("./assets").map( file => file.split('.7z')[0]))
});

router.get('/models/:name', (req,res)=> {
    const name = req.params.name
    logger.debug(`'models/${name}' called by ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)


    if(!models.includes(name)){
        res.status(404).send("Not Found: No model with that name exists.")
        logger.warn("Not Found: No model with that name exists.")
        return
    }

    try{
        const data = fs.createReadStream(`./assets/${name}`);
        const disposition = 'attachment; filename="' + name + '"';
        
        res.setHeader('Content-Type', 'application/x-7z-compressed');
        res.setHeader('Content-Disposition', disposition);
        
        data.pipe(res);
    }
    catch(e){
        res.status(500).send("Server Error: An internal server error occured.")
        logger.error(e.toString())
    }

});

router.get('/*', (req,res)=>{
    logger.debug(`'/*' called by ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)

    res.status(404).send("Invalid Endpoint: Refer to <a href='https://github.com/devAyushDubey/enviroCar-model-delivery-api#endpoints'>endpoints reference</a>")
})

export default router;