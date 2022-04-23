import React from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';

function chatBoxLogic({socket, message, setMessage, dataUrl, type, setType, setDataUrl, setFileName}) {

  let uploadType = "";
  let uploadedUrl = "";
    const sendMessage = async (userId) => {
      try {
        let messageContent = message;
        setMessage("");
        if(dataUrl.length > 0) {
          const formData = new FormData();
          formData.append("file", dataUrl);
          formData.append("upload_preset", "social_privateChatFiles");
          setDataUrl("");
          const res = await axios.post(`https://api.cloudinary.com/v1_1/iamprogrammer/${uploadType}/upload`, formData);
          uploadedUrl = res.data.url;
        }
        socket.emit('sendMessage', {
          userId,
          message:messageContent,
          dataUrl:uploadedUrl, //actual large file that converted to dataUrl
          type,
          accesstoken: Cookies.get('userToken')
      })

      } catch (error) {
        console.error(error.message)
      } 
    }

    const enterKey = (e, userId) => {
      if(e.key == "Enter" && message.length > 0 || e.key == "Enter" && dataUrl.length > 0) {
        
        return sendMessage(userId)
      }
    }

    const clickToSend = (userId) => {
      if(message.length > 0 || dataUrl.length > 0) {
        return sendMessage(userId)
      }
    }

    const handleFile = (e) => {
      try {
        const chatbox = document.querySelector('.chatbox__body');
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        setFileName(e.target.files[0].name)
        reader.onloadend = async () => {
         if(reader.DONE == 2) {
          setDataUrl(reader.result);
          console.log(reader.result)
          if(reader.result.includes("image")) {
            uploadType = "image"
            setType("image")
          }

          else if(reader.result.includes("pdf")) { 
            uploadType = "image"
            setType("pdf")
          }

          else if(reader.result.includes("video")) {
            uploadType = "video";
            setType("video")
          }

          chatbox.scrollTop = chatbox.scrollHeight;
         }
        }
        
      } catch (error) {
        console.error(error.message)
      }
        
    }

    const removeFile = () => {
        setDataUrl("");
        setFileName("");
    }

  return {
    enterKey,
    clickToSend,
    handleFile,
    sendMessage,
    removeFile
  }
}

export default chatBoxLogic