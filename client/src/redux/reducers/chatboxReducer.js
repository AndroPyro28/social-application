const initialState = {};

const chatboxReducer = (state=initialState, action) => {

    switch(action.type) {
        case true : {
            return action.payload;
        }
        case false : {
            return initialState;
        }

        default: return state;
    }
}  
export default chatboxReducer;
