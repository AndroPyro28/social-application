import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import {
  AuthNavBar,
  NotificationListContainer,
  EmptyStateMent,
  NotificationContainer,
  NotificationContent,
  ButtonContainer,
  ButtonUserRelation,
  SearchBarContainer,
  SearchBarHeader,
  SearchDataList,
  SearchWord,
  NotificationDate,
  Data,
  NotificationNumber,
  NotificationButtonWrapper,
} from "./NavBar";

import { Image } from "cloudinary-react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import protectedNavLogic from "./protectedNavLogic";
import { format } from "timeago.js";
function ProtectedNav() {
  const { socketReducer } = useSelector((state) => state);
  const { currentUser } = useSelector((state) => state.userReducer);
  const reduxRefresher = useSelector((state) => state.refresherReducer);

  const [textSearch, setTextSearch] = useState("");
  const [searchedDataList, setSearchedDataList] = useState([]);

  //notification numbers
  const [userRelationNotificationNumber, setUserRelationNotificationNumber] =
    useState(0);
  const [postNotificationNumber, setPostNotificationNumber] = useState(0);
  const [messageNotificationNumber, setMessageNotificationNumber] = useState(0);

  //notification content / objects
  const [userRelation, setUserRelation] = useState([]);
  const [postNotification, setPostNotification] = useState([]);
  const [messageNotification, setMessageNotification] = useState([]);

  //notification boxes for opening the box
  const [userRelationToggle, setUserRelationToggle] = useState(false);
  const [postNotificationToggle, setPostNotificationToggle] = useState(false);
  const [messageNotificationToggle, setMessageNotificationToggle] =
    useState(false);

  const dispatch = useDispatch();

  const {
    notificationVisit,
    userRelationVisit,
    showNotification,
    confirmRequestByButtonConfirm,
    openChatBox
  } = protectedNavLogic({ socketReducer, dispatch, setMessageNotificationToggle });

  
  // const CONNECTION_PORT = "http://localhost:3001";

  // useEffect(() => {
  //   const socketConnection = io(CONNECTION_PORT);
  //   dispatch(socketConnected(socketConnection));
  //   socket = socketConnection;
  // }, []);

  const socket = useSelector(state => state.socketReducer);

  useEffect(async () => {
    setUserRelation([]);
    setUserRelationNotificationNumber(0);
    const res = await axios.get(
      `http://localhost:3001/api/getUserRelation/${currentUser.id}`,
      {
        withCredentials: true,
        headers: {
          accesstoken: Cookies.get("userToken"),
        },
      }
    );
    const { userRelation, success } = res.data;

    if (!success) return;
    userRelation.forEach((notif) => {
      if (!notif.visited) {
        setUserRelationNotificationNumber((prev) => prev + 1);
      }
    });
    setUserRelation(userRelation);
  }, [reduxRefresher]);

  useEffect(async () => {
    try {
      setPostNotification([]);
      setPostNotificationNumber(0);
      const res = await axios.get(
        `http://localhost:3001/api/getPostsNotification/${currentUser.id}`,
        {
          withCredentials: true,
          headers: {
            accesstoken: Cookies.get("userToken"),
          },
        }
      );

      const { success, posts } = res.data;

      posts.forEach(
        (post) => !post.visited && setPostNotificationNumber((prev) => prev + 1)
      ); // looping through the notifs if not visited yet then incremeant notif number

      setPostNotification(posts);
    } catch (error) {}
  }, []);

  useEffect(async () => {
    setMessageNotification([]);
    const res = await axios.get(`http://localhost:3001/api/getMessages`, {
      withCredentials: true,
      headers: {
        accesstoken: Cookies.get("userToken"),
      },
    });

    const { messages } = res.data;

    setMessageNotification(messages);
  }, [messageNotificationToggle]);

  useEffect(async () => {
    socketReducer?.emit("isOnline", {
      accesstoken: Cookies.get("userToken"),
    });
  }, [socketReducer]);

  useEffect(async () => {
    //event listeners
    socket.on("interaction_notification", async (response) => {
      if (response.userIdTo == currentUser.id) {
        setUserRelationNotificationNumber((prev) => prev + 1);
        setUserRelation((prev) => [...prev, response]);
        if (Notification.permission === "granted") {
          showNotification(response);
        }
      }
    });

    socket.on("post_notification", async (response) => {
      if (response.userId == currentUser.id) {        
        setPostNotification((prev) => [...prev, response]);
        setPostNotificationNumber((prev) => prev + 1);
        // showNotification(response);
      }
    });

    socket.on("deleteUserToken", () => {
      Cookies.remove("userToken");
      window.location.reload();
    });
  }, []);

  useEffect(async () => {
    // socket?.emit('searchData', {textSearch, accesstoken: Cookies.get('userToken')})
    setSearchedDataList([]);
    const res = await axios.post(
      "http://localhost:3001/api/searchPeople",
      {
        textSearch,
      },
      {
        withCredentials: true,
        headers: {
          accesstoken: Cookies.get("userToken"),
        },
      }
    );
    const { success, searchedData } = res.data;

    if (!success) {
      window.location.reload();
    }
    setSearchedDataList(searchedData);
  }, [textSearch]);

  

  const buttonInFriendRequest = (userId) => (
    <ButtonContainer>
      <ButtonUserRelation
        bg="#3982E4"
        onClick={() => confirmRequestByButtonConfirm(userId)}
      >
        Confirm
      </ButtonUserRelation>
      <ButtonUserRelation bg="#3A3B3C">Delete</ButtonUserRelation>
    </ButtonContainer>
  );

  const fetchAllFriendRelation =
    userRelation.length > 0 ? (
      userRelation
        ?.slice(0)
        .reverse()
        .map((notif, index) => {
          return (
            // To be continued
            <NotificationContainer
              key={index}
              isVisited={notif.visited}
              onClick={() =>
                userRelationVisit(notif.userIdFrom, notif.userIdTo)
              }
            >
              <Image
                publicId={notif.profileUrl}
                cloudName="iamprogrammer"
                onClick={() =>
                  userRelationVisit(notif.userIdFrom, notif.userIdTo)
                }
              />

              <NotificationContent>
                <div
                  onClick={() =>
                    userRelationVisit(notif.userIdFrom, notif.userIdTo)
                  }
                >
                  {notif.content}
                </div>
                {notif.subject === "friend_request" &&
                  buttonInFriendRequest(notif.userIdFrom)}
                <NotificationDate>{format(notif.updated_at)}</NotificationDate>
              </NotificationContent>
            </NotificationContainer>
          ); // to be continue
        })
    ) : (
      <EmptyStateMent>*No User Interaction yet*</EmptyStateMent>
    );

  const fetchAllPostNotification =
    postNotification.length > 0 ? (
      postNotification
        ?.slice(0)
        .reverse()
        .map((notif, index) => {
          return (
            <NotificationContainer
              key={index}
              isVisited={notif.visited}
              onClick={() => notificationVisit(notif.id, notif.postId)}
            >
              <Image
                publicId={notif.userProfileWhoLiked}
                cloudName="iamprogrammer"
                onClick={() =>
                  window.location.assign(
                    `/user=${currentUser.id}/posts/${notif.postId}`
                  )
                }
              />

              <NotificationContent>
                <div>{notif.content}</div>

                <NotificationDate>{ format(notif.created_at) }</NotificationDate>
              </NotificationContent>
            </NotificationContainer>
          );
        })
    ) : (
      <EmptyStateMent>*No Posts Interaction Yet*</EmptyStateMent>
    );

  const fetchAllMessagesNotification =
    messageNotification?.length > 0 ? (
      messageNotification
        .slice(0)
        .reverse()
        .map((message, index) => {
          const { privateChat } = message;
          const { messages: messageData } = message;

          return (
            <NotificationContainer
              key={index}
              isVisited={
                messageData[messageData.length - 1].userId == currentUser.id
                  ? true
                  : messageData[messageData.length - 1].visited == 1
              }
              onClick={() => openChatBox(message.id)}
            >
              <Image publicId={message.profileUrl} cloudName="iamprogrammer" />

              <NotificationContent>
                <div>
                  <strong style={{ color: "gray" }}>
                    {message.firstname} {message.lastname}
                  </strong>
                </div>

                <div
                  style={{
                    justifyContent: "flex-start",
                    fontSize: "14px",
                    maxHeight: "20px",
                    overflow: "hidden",
                    textOverflow:'ellipsis',
                  }}
                >
                  {
                  `${messageData[messageData.length - 1].userId == currentUser.id ? 
                    `You: ${messageData[messageData.length - 1].messageContent === "" ? 
                      "..." : messageData[messageData.length - 1].messageContent
                  }`
                      : messageData[messageData.length - 1].messageContent === "" ? 
                        "..." :  messageData[messageData.length - 1].messageContent
                    }`
                  }
                </div>
                <NotificationDate>
                  {format(privateChat.updated_at)}
                </NotificationDate>
              </NotificationContent>
            </NotificationContainer>
          );
        })
    ) : (
      <EmptyStateMent>*No Messages Created Yet*</EmptyStateMent>
    );

  return (
    <AuthNavBar>
      <div>
        <section>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
            placeholder="Find People"
          />

          {textSearch && (
            <SearchBarContainer>
              <SearchBarHeader>
                <span
                  className="fa-solid fa-arrow-left"
                  onClick={() => setTextSearch("")}
                ></span>
                <h3>Search People</h3>
              </SearchBarHeader>

              <SearchDataList>
                {searchedDataList?.length > 0 ? (
                  searchedDataList?.map((data, index) => {
                    return (
                      <Data
                        key={index}
                        onClick={() =>
                          window.location.assign(`/userProfile/${data.id}`)
                        }
                      >
                        <Image
                          publicId={data.profileUrl}
                          cloudName="iamprogrammer"
                        />{" "}
                        <p>
                          {data.firstname} {data.lastname}
                        </p>
                      </Data>
                    );
                  })
                ) : (
                  <h3>Search for more!</h3>
                )}

                <SearchWord>
                  <i className="fa-solid fa-magnifying-glass"></i>{" "}
                  <p>Search for '{textSearch}'</p>
                </SearchWord>
              </SearchDataList>
            </SearchBarContainer>
          )}
        </section>
      </div>

      <div>
        <a href="/home">
          <i className="fa-solid fa-house"></i>
        </a>
        <a href="#">
          <i className="fa-solid fa-object-ungroup"></i>
        </a>
      </div>
      <div>
        <section>
          <i className="fas fa-user"></i> {currentUser?.firstname} &nbsp;
          <i className="fa-solid fa-caret-down"></i>
          <div>
            <a href={`/userProfile/${currentUser?.id}`}>Profile</a>
            <a href="#">Chat</a>
            <a href="#">Notification</a>
            <a
              href="#"
              onClick={() => {
                Cookies.remove("userToken");
                window.location.assign(`/login`);
              }}
            >
              Logout
            </a>
          </div>
        </section>

        <NotificationButtonWrapper isActive = {userRelationToggle}>
          {userRelationNotificationNumber > 0 && (
            <NotificationNumber>
              {userRelationNotificationNumber}
            </NotificationNumber>
          )}

          <i
            className="fa-solid fa-user-group"
            onClick={() => {
              setUserRelationNotificationNumber(0);
              setUserRelationToggle(!userRelationToggle);
              setPostNotificationToggle(false);
              setMessageNotificationToggle(false)
            }}
          ></i>
          {userRelationToggle && (
            <NotificationListContainer>
              <h2>
                <span class="fa-solid fa-earth-asia"></span> People
              </h2>
              {fetchAllFriendRelation}
            </NotificationListContainer>
          )}
        </NotificationButtonWrapper>

        <NotificationButtonWrapper isActive={messageNotificationToggle}>
          {messageNotificationNumber > 0 && (
            <NotificationNumber>{messageNotificationNumber}</NotificationNumber>
          )}
          <i
            className="fa-solid fa-comment-dots"
            onClick={() => {
              setMessageNotificationToggle(!messageNotificationToggle);
              setMessageNotificationNumber(0);
              setUserRelationToggle(false);
              setPostNotificationToggle(false);
            }}
          ></i>

          {messageNotificationToggle && (
            <NotificationListContainer>
              <h2>
                <span class="fa-solid fa-comment"></span> Messages
              </h2>
              {fetchAllMessagesNotification}
            </NotificationListContainer>
          )}
        </NotificationButtonWrapper>

        <NotificationButtonWrapper isActive={postNotificationToggle}>
          {postNotificationNumber > 0 && (
            <NotificationNumber>{postNotificationNumber}</NotificationNumber>
          )}

          <i
            className="fa-solid fa-bell"
            onClick={() => {
              setPostNotificationToggle(!postNotificationToggle);
              setPostNotificationNumber(0);
              setUserRelationToggle(false);
              setMessageNotificationToggle(false)
            }}
          ></i>
          {postNotificationToggle && (
            <NotificationListContainer>
              <h2>
                {" "}
                <span className="fa-solid fa-bell"></span> Notifications
              </h2>
              {fetchAllPostNotification}
            </NotificationListContainer>
          )}
        </NotificationButtonWrapper>

        <div></div>
      </div>
    </AuthNavBar>
  );
}

export default ProtectedNav;
