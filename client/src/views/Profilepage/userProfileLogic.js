import axios from "axios";
import Cookies from "js-cookie";
import {chatboxToggle} from '../../redux/actions/chatbox'

const userProfileLogic = ({socket, id, refresher, setRefresher, dispatch, setPageContent}) => {

    const addFriend = async () => {
        socket.emit('addFriend', {
            id, 
            accesstoken: Cookies.get('userToken')
        });
        setRefresher(!refresher);
    }

    const changePageContent = (e) => {
        setPageContent(e.target.text.toLowerCase())
    }

    const cancelFriendRequest = async () => {

        socket.emit('cancelFriendRequest', {
            id, 
            accesstoken: Cookies.get('userToken')
        });
        setRefresher(!refresher);
    }

    const confirmFriendRequest = async () => {

        socket.emit('confirmFriendRequest', {
            id, 
            accesstoken: Cookies.get('userToken')
        });
        dispatch({type: "REFRESH"});
        setRefresher(!refresher);
    }

    const openChatBox = async (userId) => {
        const res = await axios.get(`http://localhost:3001/api/getMessagesByUserId/${userId}`, {
            withCredentials: true,
            headers: {
                accesstoken: Cookies.get('userToken')
            }
        })
        dispatch(chatboxToggle(false))
        dispatch(chatboxToggle(true, res.data.chatData))
    }
    
        return { addFriend, cancelFriendRequest, confirmFriendRequest, openChatBox, changePageContent}
}
export default userProfileLogic