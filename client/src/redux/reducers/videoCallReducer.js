const initialState = {
    stream: null,
    signalData: null,
    callAccepted: false,
    receivingCall: false
};

const videoCallReducer = (state = initialState, action) => {
    switch(action.type) {

        case "setStream": {
            return { ...initialState, stream: action.payload }
        }

        case "callUser": {
            
        }

        case "acceptCall": {

        }

        case "leaveCall": {

        }

        default: return state;
    }
}

export default videoCallReducer;
