let userRouter = require('express').Router();
let fetch = require('node-fetch')
let userController = require('../controllers/userController')


userRouter.get('/login', (req, res) => {
    try {
        res.render('pages/login.twig',{
            action: "login"
        });
    } catch (error) {
        res.send(error);
    }
})

userRouter.get('/loginDiscord', (req, res) => {
    try {
        res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_ID}&redirect_uri=http://localhost:3005/callback&response_type=code&scope=identify`);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

userRouter.get('/callback', async (req, res) => {
    try {
        let userData = await userController.getUserData(req, res);
        await userController.getMembers(userData);
        let user = await userController.getUserDiscord(userData.id)
        if (!user) {
            user = userController.createUser(userData)
        }
        req.session.userId = user._id
        res.redirect('/dashboard')
    } catch (error) {
        res.render('pages/login.twig', {
            error: error,
            action: "login"
        })
    }
})

userRouter.get('/dashboard', async(req, res)=>{
    try {
        res.render('pages/dashboard.twig')
    } catch (error) {
        
    }
})

module.exports = userRouter;