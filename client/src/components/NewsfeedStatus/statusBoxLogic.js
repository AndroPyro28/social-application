import Cookies from 'js-cookie';

function statusBoxLogic({socket}) {

    const likeORUnlikePost = (postId, userId) => {
        socket.emit('likeOrUnlikePost', {
            accesstoken: Cookies.get('userToken'),
            postId,
            userId
        })
    }

    const comment = (postId, userId, comment) => {
        socket.emit('comment', {
            accesstoken: Cookies.get('userToken'),
            postId,
            userId,
            comment
        })
    }

  return {likeORUnlikePost, comment}
}

export default statusBoxLogic