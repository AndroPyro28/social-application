import { createGlobalStyle } from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import UnProtectedRoutes from "./routes/UnProtectedRoutes";
import Signup from "./views/Signup/Signup";
import Login from "./views/Login/Login";
import "./App.css";
import UnProtectedNav from "./components/NavBar/UnProtectedNav";
import ProtectedNav from "./components/NavBar/ProtectedNav";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticationFailed,
  authenticationSuccess,
} from "./redux/actions/user";
import Home from "./views/Homepage/Home";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import UserProfile from "./views/Profilepage/UserProfile";
import UserPost from "./views/UserPost/UserPost";
import Footer from "./components/Footer/Footer";
import ChatBox from "./components/ChatBox/ChatBox";
import ActiveList from "./components/ActiveList/ActiveList";
import VideoCall from "./views/VideoCall/VideoCall";
import {socketConnected} from "./redux/actions/socket";
import io from "socket.io-client";

import {ContextProvider} from "./components/Context/Call"

function App() {
  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const chatboxData = useSelector((state) => state.chatboxReducer);
  const appRefresher = useSelector((state) => state.refresherReducer);
  const { currentUser } = useSelector((state) => state.userReducer);
  const [toggleActiveList, setToggleActiveList] = useState(false);

  const CreateGlobalStyle = createGlobalStyle`
  html, body {
    margin:0;
    padding:0;
    box-sizing: border-box;
    overflow-X:hidden;
    height:100%;
    width:100%;
    scroll-behavior: smooth;
    
    font-family: 'poppins', sans-serif;

    @keyframes floatButton {
      0% {
        transform: translateY(-20px);
      }
      100% {
        transform: translateY(0px);
      }
    }

    .toggleActiveList {
      font-size: 15px;
      position: fixed;
      right: 50px;
      padding: 20px;
      bottom: 50px;
      background: gray;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      animation-name: floatButton;
      animation-duration: 2000ms;
      animation-iteration-count: infinite;
      animation-direction: alternate-reverse;
      transition: all .3s ease;
      &:hover {
        background: lightgray;
        color: black;
      }
    }
    //if we enable background customization

    /* background-image: url("/images/nicePicture.jpg");
    background-position: center;
    background-size:cover; */
    
  }

  /* video, img{
    height: ${window.innerHeight / 2} !important;
    width: ${window.innerWidth / 2} !important;
  } */

    //if we enable background customization

  /* div {
    background: rgba(255, 255, 255, 0.041) !important;
} */
    ul, a {
    text-decoration: none;
    list-style:none;
    color:black;
    }

    :is(h1, h2, h3, h4, h5 ,h6) {
      margin:0;
    }

    img {
      object-fit: cover;
    }
  `;

  useEffect(async () => {
    try {
      Notification.requestPermission();
      const res = await axios.get("http://localhost:3001/api/auth", {
        withCredentials: true,
        headers: {
          accesstoken: Cookies.get("userToken"),
        },
      });
      const { currentUser, success } = res.data;

      if (!success) {
        Cookies.remove("userToken");
        dispatch(authenticationFailed());
      } else {
        dispatch(authenticationSuccess(currentUser, true));
        const socketConnection = io("http://localhost:3001");
        dispatch(socketConnected(socketConnection));
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }, [appRefresher]);

  return (
    !loading && (
      <div className="App">
        <CreateGlobalStyle />
        <Router>
          {Cookies.get("userToken") ? <ProtectedNav /> : <UnProtectedNav />}

          <Switch>
            <UnProtectedRoutes
              exact
              path="/signup"
              Component={Signup}
              isAuth={Cookies.get("userToken")}
            />

            <UnProtectedRoutes
              exact
              path="/login"
              Component={Login}
              isAuth={Cookies.get("userToken")}
            />

            <ProtectedRoutes
              exact
              path="/home"
              Component={Home}
              isAuth={Cookies.get("userToken")}
            />

            <ProtectedRoutes
              exact
              path="/userProfile/:id"
              Component={UserProfile}
              isAuth={Cookies.get("userToken")}
            />

            <ProtectedRoutes
              exact
              path="/posts=:postId"
              Component={UserPost}
              isAuth={Cookies.get("userToken")}
            />

            <ProtectedRoutes
              exact
              path="/videocall"
              Component={VideoCall}
              isAuth={Cookies.get("userToken")}
            />

            <Route path="*">{() => window.location.assign("/login")}</Route>
          </Switch>

          {currentUser && !chatboxData.userData && (
            <ActiveList
              setToggleActiveList={setToggleActiveList}
              toggleActiveList={toggleActiveList}
            />
          )}

          {currentUser && !chatboxData.userData && !toggleActiveList && (
            <i
              className="fa-solid fa-list toggleActiveList"
              onClick={() => setToggleActiveList(true)}
            ></i>
          )}

          {currentUser && chatboxData.userData && (
            <ContextProvider>
              <ChatBox chatboxData={chatboxData} />
            </ContextProvider>
            
          )}

          <Footer />
        </Router>
      </div>
    )
  );
}

export default App;
