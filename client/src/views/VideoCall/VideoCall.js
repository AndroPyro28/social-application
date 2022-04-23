import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../components/Context/Call';
import CallEndedPostBox from '../../components/PostBox/CallEndedPostBox';

import {VideoCallContainer, PartnerVideo, MyVideo, VideoWrapper, CallOptions} from "./videoCallComponents";

function VideoCall({onSession}) {
  const { caller, myStream, partnerStream, endCall, peerConnectionRef, callEnded} = useContext(Context);
  const {firstname, lastname} = caller.from;

  useEffect( async () => {
    if(onSession) {
      window.onbeforeunload = function () {
        return "You sure you want to leave this call?";
    }
  }
    else {
      window.onbeforeunload = function () {
        return null;
    }
  }
    
  }, [])

  return ( // error ayaw gumana ng partner video ref
  
    <VideoCallContainer onSession={onSession}>
      {
        callEnded && <CallEndedPostBox />
      }
        <VideoWrapper className='myVideoWrapper'>
          <MyVideo playsInline muted autoPlay className='myVideo' />
          <h3>You</h3>
        </VideoWrapper>
          
        <VideoWrapper className='partnerVideoWrapper'>
          <PartnerVideo playsInline autoPlay className='partnerVideo' />
          <h3>{firstname} {lastname}</h3>
        </VideoWrapper>
          
        <CallOptions>
        <i className="fa-solid fa-phone disconnect" onClick={endCall}></i>
        </CallOptions>
    </VideoCallContainer>
  )
}

export default VideoCall