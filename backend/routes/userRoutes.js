const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/auth/signup',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  authController.signup,
);

router.get('/get-user', authController.isLoggedIn);
router.get('/logout', authController.logout);

router.post('/verify-account/:verificationToken', authController.verifyAccount);
router.post('/auth/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:resetToken', authController.resetPassword);

router.use(authController.protect);

router.get('/my-account', userController.getAccount, userController.getUser);
router.patch('/update-password', authController.updatePassword);
router.patch(
  '/update-account',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateAccount,
);
router.delete('/delete-account', userController.deleteAccount);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.setPhoto,
    userController.updateUser,
  )
  .delete(userController.deleteUser);

module.exports = router;
