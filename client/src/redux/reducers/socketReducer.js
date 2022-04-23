const initialState = null;

const socketReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SOCKETCONNECTIONSUCCESS" : {
            return action.payload;
        }
        case "SOCKETCONNECTIONFAILED" : {
            return action.payload;
        }

        default: return state;
    }
}

export default socketReducer;