import React from 'react'
import Cookies from 'js-cookie'
import {chatboxToggle} from '../../redux/actions/chatbox';
import axios from 'axios';
function protectedNavLogic({socketReducer, dispatch, setMessageNotificationToggle}) {
    
    const notificationVisit = (postNotifId, postId) => {
        socketReducer.emit('notifVisit', {
            postNotifId,
            accesstoken: Cookies.get('userToken')
        });
        window.location.assign(`/posts=${postId}`);
    }

    const userRelationVisit = (idFrom, currentuserId) => {
        socketReducer.emit('userRelationVisit', {
            idFrom,
            currentuserId,
            accesstoken: Cookies.get('userToken')
        });
        window.location.assign(`/userProfile/${idFrom}`)
    }

    const showNotification = (response) => {
        const notification = new Notification(`New notification from ${response.name}`, {
          body: `${response.subject === "friend_request" ? `${response.name} has sent you a friend request` : `${response.name} has accepted your friend request`}`,
        });
        
        notification.onclick = () => {
            window.location.assign(`/userProfile/${response.userIdFrom}`)
        }
    }

    const confirmRequestByButtonConfirm = (id) => {
        socketReducer.emit('confirmFriendRequest', {
            id, 
            accesstoken: Cookies.get('userToken')
        });
    }

    const openChatBox = async (userId) => {
        const res = await axios.get(`http://localhost:3001/api/getMessagesByUserId/${userId}`, {
            withCredentials: true,
            headers: {
                accesstoken: Cookies.get('userToken')
            }
        })
        setMessageNotificationToggle(false)
        dispatch(chatboxToggle(false))
        dispatch(chatboxToggle(true, res.data.chatData))
    }

    
    return { notificationVisit, userRelationVisit, showNotification, confirmRequestByButtonConfirm, openChatBox}
}

export default protectedNavLogic