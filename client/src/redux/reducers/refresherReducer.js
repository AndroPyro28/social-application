const initialState = false;

const socketReducer = (state = initialState, action) => {
    switch(action.type) {
        case "REFRESH" : {
            return !state;
        }
        default: return state;
    }
}

export default socketReducer;