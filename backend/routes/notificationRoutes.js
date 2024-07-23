const express = require('express');
const notificationController = require('../controllers/notificationController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/unread', notificationController.getUnreadNotifications);
router.delete('/markAsRead/:id', notificationController.markAsRead);

module.exports = router;
