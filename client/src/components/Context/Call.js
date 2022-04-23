import React, { createContext, useState, useRef, useEffect } from 'react';
import Peer from 'simple-peer';
import { useSelector } from 'react-redux';

const Context = createContext();

const ContextProvider = ({children}) => {

    const [myStream, setMyStream] = useState();
    const [partnerStream, setPartnerStream] = useState();
    const [isReceivingCall, setIsReceivingCall] = useState(false);
    const [caller, setCaller] = useState({ from: {}, callerSignal: null });
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    // const [onCallSession, setOnCallSession] = useState(false);
    const socket = useSelector(state => state.socketReducer);
    const { currentUser } = useSelector(state => state.userReducer);

    const peerConnectionRef = useRef(null);

    const videoConstraints = {
        height: window.innerHeight / 2,
        width: window.innerWidth / 2
    }
    
    useEffect(async () => {
            try {
                setMyStream(null);
              const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
            //   if(myVideo !== null).srcObj = stream

            if(stream) {
                setMyStream(stream);
                //  myVideo.current.srcObject = stream;
            }
                          
            } catch (err) {
              console.error(err);
            }

        socket.on("someOneCalling", ({from, signalData, userIdTocall}) => {
            if(userIdTocall == currentUser.id && !callAccepted) {
                setIsReceivingCall(true);

                setCaller({from, callerSignal:signalData});
            }
        });

        socket.on("handshake_client", (data) => {
            if(data.to == currentUser.id) {
                setCaller({from: data.from})
                setCallAccepted(true);
            }
        })

        socket.on('endCall', (userIdToEndCall) => {
            if(userIdToEndCall == currentUser.id) {
                // setCallAccepted(false);
                // window.location.reload();
                setCallEnded(true)
                peerConnectionRef.current = null;
            }
        })
    }, []);

    useEffect(async () => {
        const myVideo = document.querySelector(".myVideo");
        const partnerVideo = document.querySelector(".partnerVideo");
        myVideo.srcObject = myStream;
        partnerVideo.srcObject = partnerStream;
    }, [partnerStream, myStream]);
    

    const callUser = (userIdTocall) => {
        setCallAccepted(true);
        const peer = new Peer({ initiator: true, trickle: false, stream: myStream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userIdTocall, signalData: data, from: currentUser });
        });

        peer.on('stream', (stream) => {
            setPartnerStream(stream)
        });

        socket.on('callAccepted', (data) => {
            if(data.to == currentUser.id) {
                setCallAccepted(true);
                setCaller({from: data.from, callerSignal: data.signalData});
                setIsReceivingCall(false);
                peer.signal(data.signalData); 
            }
        });

        peerConnectionRef.current = peer;
    }

    const answerCall = () => {
        setCallAccepted(true);
        setIsReceivingCall(false);
        

        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: myStream,
        });

        peer.on("signal", (signalData) => {
            socket.emit("answerCall", {signalData, to: caller.from.id, from: currentUser})
        });

        peer.on("stream", (stream) => {
            console.log('stream', stream)
            setPartnerStream(stream)
        });
        peer.signal(caller.callerSignal);
        socket.emit("handshake_server", {to: caller.from.id, from: caller.from,})
        peerConnectionRef.current = peer;

    }

    const endCall = () => {
        setCallAccepted(false);
        setIsReceivingCall(false);
        peerConnectionRef.current = null;
        socket.emit("endCall", {
            userIdToEndCall: caller.from.id
        })
        window.location.reload();

    }

    return (
        <Context.Provider value={{
            myStream,
            caller,
            callAccepted,
            answerCall,
            callUser,
            isReceivingCall,
            setIsReceivingCall,
            setCaller,
            partnerStream,
            endCall,
            peerConnectionRef,
            callEnded
        }}
        >
          {children}
        </Context.Provider>
      );
}

export {Context, ContextProvider}