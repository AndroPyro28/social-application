import { Image, Video, Audio, Transformation } from 'cloudinary-react';
// import {  } from '@cloudinary/url-gen';
// import {} from "cloudinary"
import React, { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {chatboxToggle} from '../../redux/actions/chatbox';
import {ChatBoxContainer, ChatBoxHeader, ChatBoxBody, ChatBoxInputs} from './ChatBoxComponents';
import chatBoxLogic from './chatBoxLogic';
import {format} from 'timeago.js';
import {Context, ContextProvider} from "../Context/Call";

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Plugins

function ChatBox({ chatboxData }) {

  const dispatch = useDispatch();

  const {currentUser} = useSelector(state => state.userReducer);

  const handleDeleteChatBoxDate = () => {
    dispatch(chatboxToggle(false))
  }
  const [messagesData, setMessagesData] = useState([])
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const socket = useSelector(state => state.socketReducer);

  useEffect(() => {
    setMessagesData(chatboxData.messages);
  }, [])

  useEffect(() => {
    const chatbox = document.querySelector('.chatbox__body');
    socket?.on("messageBack", (response) => {
      response.users.map(id => {
        if(id == currentUser.id) {
          setMessagesData([...messagesData, response.message])
        }
      })
    })
    chatbox.scrollTop = chatbox.scrollHeight;
  }, [messagesData])

  const {clickToSend ,enterKey, handleFile, removeFile} = chatBoxLogic({socket, setMessage, message, type, dataUrl, setDataUrl, setType, setFileName });

  const {userData} = chatboxData;

   const {callAccepted, callUser} = useContext(Context)
  const fetchMessages = messagesData.map((message, index) => {
    const {time, userId, messageType, messageData, messageContent} = message
    if(message.userId === currentUser.id) {
      return <span className="you" key={index} title={format(time)}>
        <p>{messageContent}</p>

        {
          messageType == "image" && (<Image publicId={messageData} cloudName="iamprogrammer" />)
        }

        {
          messageType == "video" && (<Video publicId={messageData} cloudName="iamprogrammer" controls="controls autoplay" />)
        }

        {
           messageType == "pdf" && <a href={messageData} target="_blank"> <i className="fa-solid fa-file-pdf red"></i> To view pdf (Click Here)</a>
        }

        <label> <i className="fa-solid fa-clock"></i> {format(time)}</label>
      </span>
    }
    else {
      return <div className='message__container' key={index} title={format(time)} >
      <Image className="profileImageByOthers" publicId={userData?.profileUrl} cloudName="iamprogrammer" />
      <span className='other'>
      <p>{messageContent}</p>

        {
          messageType == "image" && (<Image publicId={messageData} cloudName="iamprogrammer" />)
        }

        {
          messageType == "video" && (<Video publicId={messageData} cloudName="iamprogrammer" controls="controls autoplay" />)
        }
        
        {
           messageType == "pdf" && <a href={messageData} target="_blank"> <i className="fa-solid fa-file-pdf red"></i> To view pdf (Click Here)</a>
        }

      <label> <i className="fa-solid fa-clock"></i> {format(time)}</label>
      </span>
      
    </div>
    }
    
  })

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <ChatBoxContainer >

      <ChatBoxHeader > {/* chatbox header */}
      <Image className="profileImageByOthers" publicId={userData?.profileUrl} cloudName="iamprogrammer" />

        <span>{userData?.firstname} {userData?.lastname}</span>
        <i class="fa-solid fa-video videoCall" onClick={() => callUser(userData?.userId)}></i>
        <i class="fa-solid fa-xmark close" onClick={handleDeleteChatBoxDate}></i>
      </ChatBoxHeader> {/* chatbox header */}
    
      <ChatBoxBody className='chatbox__body'> {/* chatbox body */}

        
        {
          fetchMessages
        }

      </ChatBoxBody> {/* chatbox body */}

      {fileName.length > 0 && dataUrl.length > 0 && 
      <data> 
        {

          dataUrl.includes('image') && <><img className='pre-sendData' src={dataUrl} /> {fileName}</>
        }

        {
          dataUrl.includes('video') && <><video controls="controls" className='pre-sendData'>
          <source src={dataUrl} type="video/mp4" />
          </video> {fileName}</>
        }

        {
          dataUrl.includes("application/pdf") && <><i className="fa-solid fa-file-pdf pdfIcon"></i> {fileName}</>
        }

        
        
        <i className="fa-solid fa-xmark deleteData" onClick={removeFile}></i></data>}
      <ChatBoxInputs> {/* chatbox inputs */}
      
      <div>
        
        {/* {
          dataUrl.length > 0 ? 
          <i className="fa-solid fa-link-slash notEmpty" title={`Click to remove File`}
          onClick={removeFile}></i> :
          <i class="fa-solid fa-link empty" title="Upload File"></i>
        } */}

        <i class="fa-solid fa-link empty" title="Upload File"></i>
        
        <input type="file" className='fileSender' title='Upload File' onChange={handleFile} />
      </div>
      
      <input type="text"  value={message} 
      onChange={(e) => setMessage(e.target.value)} 
      placeholder='Write a message...'
       onKeyDown={(e) => enterKey(e,userData?.userId)}
      />
      <i className="fa-solid fa-paper-plane" 
       onClick = {() => clickToSend(userData?.userId)} 
      ></i>
      
      {/* inputs and send button */}

      </ChatBoxInputs> {/* chatbox inputs */}
      
    </ChatBoxContainer>
  )
}
// CONTINUE: VIDEO UPLOADING ERROR!
export default ChatBox