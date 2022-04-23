import React, {useContext, useState} from 'react'
import { PostBoxModalBackdrop } from '../../components/PostBox/PostBoxModal.style'
import {CallingPopupHeader, CallingPopupContainer, CallingPopupBody, CallingPopupOption} from "./callPopupComponent";

import { Context } from "../../components/Context/Call";
import { Image } from 'cloudinary-react';


function CallingPopup() {
  const { caller, answerCall, setIsReceivingCall, setCaller} = useContext(Context);
    const {profileUrl, firstname, lastname} = caller?.from;
    const [callAccepted, setCallAccepted] = useState(false);

    const acceptCall = () => {
        setCallAccepted(true)
        setTimeout(() => {
            answerCall();
        }, 2000);
    }

    const declineCall = () => {
        setIsReceivingCall(false);
    }

  return (
    <PostBoxModalBackdrop>
        <CallingPopupContainer>
            <CallingPopupHeader>
                <h2>Incoming Video Call</h2>
            </CallingPopupHeader>

            <audio controls loop  autoPlay style={{opacity: "0", pointerEvents:"none", position: "absolute"}}>
                <source src='/audios/ringtone.mp3' type="audio/mpeg"/>
            </audio>
            
            <CallingPopupBody>
                <div className='callingInfo'>
                    <Image publicId={profileUrl} cloudName="iamprogrammer" />
                    <h3>
                    {firstname} {lastname} is calling...
                    </h3>
                </div>

                <label>
                    {
                        callAccepted ? <p><h3>Initializing video please wait...</h3></p> : <p>The call will start as soon you answer the call.</p>
                    }
                </label>
            </CallingPopupBody>

            <CallingPopupOption callAccepted={callAccepted}>
                <i className="fa-solid fa-phone-slash declineIcon" onClick={declineCall}></i>
                <i className="fa-solid fa-phone acceptIcon" onClick={acceptCall}></i>
            </CallingPopupOption>
        </CallingPopupContainer>
    </PostBoxModalBackdrop>
  )
}

export default CallingPopup