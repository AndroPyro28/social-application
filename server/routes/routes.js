const express = require('express');

const appController = require('../controllers/appController');
const { verifyUser } = require('../middlewares/verifyUser');
const router = express.Router();

router.post('/signup', appController.signup);
router.post('/login', appController.login);
router.post('/post', verifyUser, appController.post);
router.get('/getAllFriendsStatus', verifyUser, appController.getAllFriendsStatus);
router.post('/updateProfilePicture', verifyUser, appController.updateProfilePicture);
router.post('/updateCoverPhoto', verifyUser, appController.updateCoverPhoto);
router.get('/userProfile/:id', verifyUser, appController.userProfile);
router.post('/addFriend', verifyUser, appController.addFriend);
router.get(`/getUserRelation/:id`, verifyUser, appController.getUserRelation);
router.post('/searchPeople', verifyUser, appController.searchPeople);
router.get('/getPostsNotification/:id', verifyUser, appController.getPostsNotification);
router.get('/getCommentsByPostId/:postId', verifyUser, appController.getCommentsByPostId);
router.get('/getPost/:postId', verifyUser, appController.getPost);
router.get('/getMessagesByUserId/:userId', verifyUser, appController.getMessagesByUserId);
router.get('/getAllFriends', verifyUser, appController.getAllFriends);
router.get('/getAllFriendsByUserId/:id', verifyUser, appController.getAllFriendsByUserId);
router.get('/getMessages', verifyUser, appController.getMessages);
router.post(`/updatePost`, verifyUser, appController.updatePost);
router.delete(`/deletePost/:postId`, verifyUser, appController.deletePost)
router.post(`/sharePost`, verifyUser, appController.sharePost);
router.post(`/getUserMedia`, verifyUser, appController.getUserMedia);

module.exports = router;