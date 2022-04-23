import userReducer from './reducers/userReducer';
import socketReducer from './reducers/socketReducer';
import refresherReducer from './reducers/refresherReducer';
import chatboxReducer from './reducers/chatboxReducer';
import postIdReducer from './reducers/postIdReducer';
import videoCallReducer from "./reducers/videoCallReducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
    userReducer,
    socketReducer,
    refresherReducer,
    chatboxReducer,
    postIdReducer,
    videoCallReducer
});

export default rootReducers;