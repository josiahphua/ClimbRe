const router = require('express').Router();
const RouteModel = require('../models/route.model');
const routeSeed = require('../lib/seeds/routeSeed');

router.get('/', async (req, res) => { 
    let allRoutes = await RouteModel.find();
    
    try {
        res.status(200).json({allRoutes})
    } catch (e) {
        res.status(400).json({"message" : e})
    }
})


router.post('/seed', async (req, res) => {
    await RouteModel.deleteMany();
    try {
        const newSeeds = await RouteModel.create(routeSeed)
        console.log("this is zone seeding: ", newSeeds)
        
        res.status(200).json({newSeeds})
    } catch (e) {
        res.status(400).json({"message": e})
    }
})

module.exports = router
