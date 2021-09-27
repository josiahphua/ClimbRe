const router = require('express').Router();
const ZoneModel = require('../models/zone.model');
const zoneSeed = require('../lib/seeds/zoneSeed');

router.get('/', async (req, res) => { 
    let allZones = await ZoneModel.find();
    
    try {
        res.status(200).json({allZones})
    } catch (e) {
        res.status(400).json({"message" : e})
    }
})


router.post('/seed', async (req, res) => {
    await ZoneModel.deleteMany();
    try {
        const newSeeds = await ZoneModel.create(zoneSeed)
        console.log("this is zone seeding: ", newSeeds)

        res.status(200).json({newSeeds})
    } catch (e) {
        res.status(400).json({"message": e})
    }
})

module.exports = router
