const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const orderRouter = require('./orderRoutes');

const router = express.Router();

router.use('/:userId/orders', authController.protect, orderRouter);

router.post(
  '/auth/signup',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  authController.signup,
);

router.get('/get-user', authController.isLoggedIn);

router.post('/verify-account/:verificationToken', authController.verifyAccount);
router.post(
  '/activate-account/:activationToken',
  authController.activateAccount,
);
router.post('/auth/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:resetToken', authController.resetPassword);

router.use(authController.protect);

router.get('/logout', authController.logout);
router.get('/my-account', userController.getAccount, userController.getUser);
router.patch('/update-password', authController.updatePassword);
router.patch(
  '/update-account',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateAccount,
);
router.delete('/delete-account', userController.deleteAccount);

router
  .route('/')
  .get(authController.restrictTo('admin'), userController.getAllUsers)
  .post(authController.restrictTo('admin'), userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(
    authController.restrictTo('admin'),
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.setPhoto,
    userController.updateUser,
  )
  .delete(authController.restrictTo('admin'), userController.deleteUser);

module.exports = router;
