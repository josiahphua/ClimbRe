const router = require('express').Router();
const GymModel = require('../models/gym.model');
const checkUser = require('../lib/checkUser');
const gymSeed = require('../lib/seeds/gymSeed');


//getting all the gyms out in base /api/gym/ directory
router.get('/', async (req, res)=>{
    let allGyms = await GymModel.find()
    .populate({
        path: "zones",
        populate: {
            path: "routes",
            model: "Route"
        }
    }) 
    console.log(allGyms)
    try {
        res.status(200).json({allGyms})
    } catch (e) {
        res.status(400).json({"message" : e})
    }
});

router.post('/seed', async (req, res) => {
    await GymModel.deleteMany();
    try {
        const newGym = await GymModel.create(gymSeed)
        console.log("this is gym seeding: ",newGym)

        res.status(200).json({newGym})
    } catch (e) {
        res.status(400).json({"message" : e})
    }
})

//adding gym
router.post('/add', async (req, res)=>{
    const newGym = new GymModel(req.body)


    try {
        await newGym.save()

        res.status(200).json({newGym})
    } catch (e) {
        res.status(400).json({"message" : e})
    }
})

//updating gym
router.put('/update/:gymID', checkUser, async (req, res)=>{
    console.log("params: ", req.params.gymID)

    try {
        if(req.user.userType === "User"){
            throw "You are not authorized to view this page."
        }

        await GymModel.findOneAndUpdate()


    } catch (e) {
        
    }
})

// deleting gym
router.delete('/delete/:gymID', async (req, res)=>{
    try {
        let deleteGym = await GymModel.findByIdAndDelete(req.params.gymID);
        console.log('deleted: ', deleteGym)
        res.status(200).json({message : "gym deleted"});
    } catch (e) {
        res.status(400).json({message : e});
    }
})


module.exports = router