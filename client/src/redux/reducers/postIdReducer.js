const initialState = null;

const postIdReducer = (state=initialState, action) => {

    switch(action.type) {

        case "getPostId": {
            return action.payload;
        }

        case "editPost": {
            return action.payload;
        }

        case "sharePost": {
            return action.payload;
        }

        case "deletePost": {
            return action.payload;
        }

        case "REMOVEPOSTID": {
            return initialState;
        }

        default: return state;
    }

}

export default postIdReducer;