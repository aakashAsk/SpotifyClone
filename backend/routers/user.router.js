const userRouter = require('express').Router();
const userController = require('../controllers/user');

userRouter.post('/signup', userController.signup);
userRouter.post('/signin', userController.login);
userRouter.post('/lastPlayedSong', userController.lastPlayedSong);
userRouter.get('/getLastPlayedSong/:id', userController.getLastPlayedSong);
userRouter.put('/updateControls', userController.updateControls);

module.exports = userRouter;