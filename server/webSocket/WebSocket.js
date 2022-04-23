const { mysqlDB } = require("../config/connectDB");

const { verifyUserInSocket } = require("../middlewares/verifyUserInSocket");


const socket = (io) => {

  const cloudinary = require("../config/cloudinary"); // always put this here

  io.on("connection", (socket) => {
    {
      // socket.on('searchData', (data) => {
      //   const {textSearch, accesstoken} = data;
      //   console.log('search data hitted')
      //   verifyUserInSocket(accesstoken, (currentUser) => {
      //     if (!currentUser) {
      //       return socket.emit("deleteUserToken");
      //     }
      //     const selectQuery = `SELECT user.firstname, user.lastname FROM user
      //     WHERE user.firstname LIKE ? OR user.lastname LIKE ?
      //     LIMIT 6`;
      //     mysqlDB.query(selectQuery, [`%${textSearch}%`, `%${textSearch}%`], (error, result) => {
      //       if(error) console.log(error.message);
      //       console.log(result);
      //     })
      //   })
      // })
    }
    let user = {};
    socket.on("isOnline", (data) => {
      try {
        const {accesstoken} = data;
        verifyUserInSocket(accesstoken, null, (currentUser, userInteracted, today, time) => {
          if(!currentUser) {
            return;
          }
          user = currentUser
          const updateQuery = `UPDATE user SET isOnline = ? WHERE id = ?`

          mysqlDB.query(updateQuery, [true, currentUser.id], (error, result) => {
            if(error) {
              return console.log(error.message);
            }
          })
        })
         
      } catch (error) {
       console.log(error.message) 
      }
    }) // user goes online
    
    socket.on("addFriend", async (data) => {
      // start add friend
      const { accesstoken, id } = data;

      verifyUserInSocket(
        accesstoken,
        id,
        (currentUser, userInteracted, today, time) => {
          if (!currentUser) {
            return socket.emit("deleteUserToken");
          }

          const selectQuery =
            "SELECT * FROM userrelation WHERE userIdTo = ? AND userIdFrom = ? AND subject = ?";

          mysqlDB.query(
            selectQuery,
            [currentUser.id, userInteracted.id, "friend_request"],
            (error, result) => {
              if (error) console.log(error.message);

              if (result.length > 0) return;

              const insertQuery =
                "INSERT INTO userrelation (userIdTo, content, subject, date, time, userIdFrom) VALUES (?, ?, ?, ?, ?, ?)";
              const statement = `${currentUser.firstname} ${currentUser.lastname} sent you a friend request.`;

              mysqlDB.query(
                insertQuery,
                [
                  userInteracted.id,
                  statement,
                  "friend_request",
                  today,
                  time,
                  currentUser.id,
                ],
                (error, result) => {
                  if (error) {
                    console.log(error.message);
                    return;
                  }

                  if (result) {
                    socket.broadcast.emit("interaction_notification", {
                      // to all user but we will send a notification of friend request is the userIdTo /ProtectedNav/
                      id: result.insertId,
                      content: statement,
                      name: currentUser.firstname + " " + currentUser.lastname,
                      userIdTo: userInteracted.id,
                      userIdFrom: currentUser.id,
                      profileUrl: currentUser.profileUrl,
                      date: today,
                      time,
                      subject: "friend_request",
                    });
                  }
                  return;
                }
              );
            }
          );
        }
      );
    }); 

    socket.on("confirmFriendRequest", async (data) => {
      const { accesstoken, id } = data;

      verifyUserInSocket(
        accesstoken,
        id,
        (currentUser, userInteracted, today, time) => {
          if (!currentUser) {
            return socket.emit("deleteUserToken");
          }

          // delete a data in userRelation that has a friend request
          const updateQuery = `
        UPDATE userrelation SET content = ?, subject = ?, date = ?, time = ?, userIdTo = ?, userIdFrom = ?
        WHERE 
        userIdTo = ? AND userIdFrom = ? AND subject = ?
        OR
        userIdFrom = ? AND userIdTo = ? AND subject = ?
        `;
          const content = `${currentUser.firstname} ${currentUser.lastname} has accepted your friend request!`;

          mysqlDB.query(
            updateQuery,
            [
              content,
              "friend_request_accepted",
              today,
              time,
              userInteracted.id,
              currentUser.id,
              userInteracted.id,
              currentUser.id,
              "friend_request",
              userInteracted.id,
              currentUser.id,
              "friend_request",
            ],
            (error, result) => {
              if (error) {
                console.log(error.message);
                return;
              }

              const insertQuery = `INSERT INTO friendsWith (userId1, userId2, dateOfFriendShip) VALUES (?, ?, ?)`;

              mysqlDB.query(
                insertQuery,
                [userInteracted.id, currentUser.id, today],
                (error, result) => {
                  if (error) {
                    console.log(error.message);
                    return;
                  }

                  if (result) {
                    socket.broadcast.emit("interaction_notification", {
                      id: result.insertId,
                      content,
                      userIdFrom: currentUser.id,
                      name: currentUser.firstname + " " + currentUser.lastname,
                      userIdTo: userInteracted.id,
                      profileUrl: currentUser.profileUrl,
                      date: today,
                      time,
                      subject: "friend_request_accepted",
                    });
                  }
                }
              );
            }
          );
        }
      );
    }); 

    socket.on("likeOrUnlikePost", async (data) => {
      const { accesstoken, postId, userId } = data;
      verifyUserInSocket(
        accesstoken,
        null,
        (currentUser, userInteracted, today, time) => {
          if (!currentUser) {
            return socket.emit("deleteUserToken");
          }

          const selectQuery = `SELECT * FROM likes WHERE userId = ? AND postId = ?;
          SELECT likes.*, user.firstname, user.lastname, user.profileUrl FROM likes 
          INNER JOIN user
          ON user.id = likes.userId
          where postId = ?;
          `;
          mysqlDB.query(
            selectQuery,
            [currentUser.id, 
              postId, postId,
              currentUser.id, postId
            ],
            (error, result) => {
              if (error) {
                return console.log('error here', error.message);
              }
              if (result[0].length > 0) {

                const listOfPeopleWhoLikeThePost = result[1];

                const recentUserWhoLikedThePost = result[1][0];

                const content = `${recentUserWhoLikedThePost.firstname} ${recentUserWhoLikedThePost.lastname} ${listOfPeopleWhoLikeThePost.length-1 > 0 ? `liked your post` : `and ${listOfPeopleWhoLikeThePost.length -1 } others liked your post`}`
                
                const deleteQuery = `DELETE FROM likes WHERE userId = ? AND postId = ?;
                ${listOfPeopleWhoLikeThePost.length-1 > 0 ? `UPDATE postNotification SET content = ?, userProfileWhoLiked = ?, date = ?, time = ?, visited = ? WHERE postId = ? AND userId = ? AND content LIKE ?`: `DELETE FROM postNotification WHERE postId = ? AND userId = ? AND content LIKE ?`}
                `;
                const parameterCondition = listOfPeopleWhoLikeThePost.length-1 > 0 ? [
                    currentUser.id, postId,
                    content, recentUserWhoLikedThePost.profileUrl, today, time, false, postId, userId, `%like%`
                  ] : [
                    currentUser.id, postId,
                    postId, userId, `%like%`
                  ]

                 // we shoud user id
                mysqlDB.query(
                  deleteQuery,
                  parameterCondition,
                  (error, result) => {
                    if (error) {
                      return console.log('error here na', error.message);
                    }

                    socket.emit("deleteLikeSuccessfull", {
                      postId,
                      userId: currentUser.id,
                    });
                  }
                );
                
              } else {
                const listOfPeopleWhoLikeThePost = result[1];
                
                const content = `${currentUser.firstname} ${currentUser.lastname} ${listOfPeopleWhoLikeThePost.length > 0 ? `and ${listOfPeopleWhoLikeThePost.length} others liked your post` : `liked your post`}`
                
                let insertQuery = null;
                
                if(currentUser.id != userId) {
                  insertQuery = `INSERT INTO likes (userId, postId) VALUES (?,?);
                  ${listOfPeopleWhoLikeThePost.length > 0 ? "UPDATE postNotification SET content = ?, userProfileWhoLiked = ?, date = ?, time = ?, visited = ? WHERE postId = ? AND userId = ? AND content LIKE ?" : "INSERT INTO postNotification (content, userProfileWhoLiked, date, time, visited, postId, userId) VALUES (?, ?, ?, ?, ?, ?, ?);"}`;  
                  console.log('not equal')
                }
                else {
                  insertQuery = `INSERT INTO likes (userId, postId) VALUES (?,?);`;
                  console.log('not equal')

                }
                mysqlDB.query(
                  insertQuery,
                  [
                    currentUser.id, postId,
                    content, currentUser.profileUrl, today, time, false, postId, userId, `%like%`
                  ],
                  (error, result) => { // ERROR HERE
                    if (error) {
                      return console.log('....', error.message);
                    }

                    socket.emit("likeSuccessfull", { //broadcast kasi pang self emit lang to sa currentUser
                      postId,
                      userId: currentUser.id,
                    });
                    
                    socket.broadcast.emit("post_notification", {
                      content, 
                      date: today,
                      time,
                      postId, 
                      userId,
                      userProfileWhoLiked: currentUser.profileUrl,
                      username: currentUser.firstname + " " + currentUser.lastname,
                    })
                  }
                );
              }
            }
          );
        }
      );
    });

    socket.on("cancelFriendRequest", async (data) => {
      const { accesstoken, id } = data;
      verifyUserInSocket(accesstoken, id, (currentUser, userInteracted) => {
        if (!currentUser) {
          return socket.emit("deleteUserToken");
        }

        const selectQuery = `SELECT * FROM friendswith
          WHERE 
          userId1 = ? AND userId2 = ?
          OR
          userId2 = ? AND userId1 = ?`;

        mysqlDB.query(
          selectQuery,
          [
            userInteracted.id,
            currentUser.id,
            userInteracted.id,
            currentUser.id,
          ],
          (error, result) => {
            if (error) return console.log(error.message);

            if (result.length > 0) return;

            const deleteQuery = `DELETE FROM userrelation WHERE userIdTo = ? AND userIdFrom = ?`;
            mysqlDB.query(
              deleteQuery,
              [userInteracted.id, currentUser.id],
              (error, result) => {
                if (error) {
                  console.log(error.message);
                  return;
                }
              }
            );
          }
        );
      });
    });

    socket.on('notifVisit', (data) => {
      const {postNotifId, accesstoken} = data;

      verifyUserInSocket(accesstoken, null, (currentUser, userInteracted, today) => {
        
        if(!currentUser) {
          return socket.emit("deleteUserToken");
        }
        try {
          const updateQuery = `UPDATE postnotification SET visited = ? WHERE id = ?`;
          mysqlDB.query(updateQuery, [true,postNotifId] , (error) => {
            if(error) {
              return console.error(error.message);
            }

          })
        } catch (error) {
          console.error(error.message)
        }
      })

    });

    socket.on('userRelationVisit', (data) => {
      const {accesstoken, idFrom, currentuserId} = data;
      verifyUserInSocket(accesstoken, null, (currentUser, userInteracted, today, time) => {

        try {
          const updateQuery = `UPDATE userRelation SET visited = ? WHERE userIdTo = ? AND userIdFrom = ?`;
          mysqlDB.query(updateQuery, [
            true, currentuserId, idFrom
          ], (error) => {

            if(error) {
              console.error(error.message);
            }

            return;
          })
        } catch (error) {
          
        }
      });
    });

    socket.on('comment', async (data) => {
      const {accesstoken, postId, userId, comment} = data;
      verifyUserInSocket(accesstoken, userId, (currentUser, userInteracted, today, time) => {

        //to be continue
        if(!currentUser) {
          return;
        }

        let type = "text";

        const username = `${currentUser.firstname} ${currentUser.lastname}`;
        const content = `${username} has commented on your post`;

        try {
          const insertQuery = `INSERT INTO comments (content, dataUrl, type, date, time, userId, postId) VALUES (?, ?, ?, ?, ?, ?, ?); 
          ${currentUser.id != userId ? `INSERT INTO postNotification (content, userProfileWhoLiked, date, time, postId, userId) VALUES (?,?,?,?,?,?)`: ``}`
          mysqlDB.query(insertQuery, [
            comment, '---', type, today, time, currentUser.id, postId,
            content, currentUser.profileUrl, today, time, postId, userId //this is from user who posted the post
          ], (error, result) => {

            if(error) return console.log(error.message);
            socket.emit("push_comment", {
              commentId: result.insertId,
              commentInfo: {
                firstname: currentUser.firstname,
                lastname: currentUser.lastname,
                profileUrl: currentUser.profileUrl,
                content:comment,
                type,
                date:today,
                time, 
                postId,
              },
              replies: []
            })
            
            socket.broadcast.emit("post_notification", {
              content, 
              date: today,
              time,
              postId, 
              userId,
              userProfileWhoLiked: currentUser.profileUrl,
              username: username,
            })
            
          })
        } catch (error) {
          console.log(error.message);
        }
      })
    });

    socket.on('sendMessage', async (data) => {
      let {accesstoken, userId, message, dataUrl, type} = data;
      
      if(dataUrl.length <= 0) {
        type = "text";
      }

      verifyUserInSocket(accesstoken, userId, (currentUser, userInteracted, today, time) => {

        if(!currentUser) {

          return;
        }

        try {

          const selectQuery = `SELECT * FROM privateChat WHERE userId1 = ? AND userId2 = ? OR userId2 = ? AND userId1 = ?;`

          mysqlDB.query(selectQuery, [
            currentUser.id, userInteracted.id,
            currentUser.id, userInteracted.id
          ], async (error, result) => {
            if(error) {
              return console.log(error.message);
            }
            
            if(result.length > 0) {
              
              const insertQuery = `
                UPDATE PrivateChat SET refresher = ? WHERE privateChat.id = ?;

                INSERT INTO privateChatMessages (message, dataUrl, type, userId, privateChatId, date, time)
                VALUES (?, ?, ?, ?, ?, ?, ?);
                
                `;
                const refresher = result[0].refresher == 1 ? false : true
                mysqlDB.query(insertQuery,[
                  refresher, result[0].id, 
                  message, dataUrl, type, currentUser.id, result[0].id, today, time
                ],
                (error, privateChatMessages) => {
                  if(error) {
                    return console.log(error.message);
                  }
                  io.emit("messageBack", {
                    users: [currentUser.id, userInteracted.id],
                    message: {
                      messageId: privateChatMessages.insertId,
                      privateChatId: result[0].id,
                      userId: currentUser.id,
                      messageContent: message,
                      messageType: type,
                      messageData: dataUrl,
                      today,
                      time
                    }
                  })
                });
              } else {
              
              const insertQuery = `
                INSERT INTO privateChat (userId1, userId2, date, time) VALUES (?, ?, ?, ?);
              `

              mysqlDB.query(insertQuery, [currentUser.id, userInteracted.id, today, time], (error, privateChat) => {

                if(error) {
                  return console.log(error.message);
                }

                const insertQuery = `INSERT INTO privateChatMessages (message, dataUrl, type, userId, privateChatId, date, time)
                VALUES (?, ?, ?, ?, ?, ?, ?)`;

                mysqlDB.query(insertQuery,[message, dataUrl, type, currentUser.id, privateChat.insertId, today, time],
                (error, privateChatMessages) => {
                  if(error) {
                    return console.log(error.message);
                  }
                  io.emit("messageBack", {
                    users: [currentUser.id, userInteracted.id],
                    message: {
                      messageId: privateChatMessages.insertId,
                      privateChatId: privateChat.insertId,
                      userId: currentUser.id,
                      messageContent: message,
                      messageType: type,
                      messageData: dataUrl,
                      today,
                      time
                    }
                  })
                });
              })
            }
          })
        } catch (error) {
          console.error(error.message)
        }

      })
    });

    socket.on('sharePost', async (data) => {

      const {post, postContent, accesstoken} = data;
       verifyUserInSocket(accesstoken, post.userId, (currentUser ,userInteracted, today, time) => {
        if(!currentUser) {
          return;
        }

        const insertQuery = `
        INSERT INTO post (postContent, date, dataUrl, type, userId, sharedPostId) VALUES (?, ?, ?, ?, ?, ?);
        UPDATE post SET sharedCounts = ? WHERE id = ?`;

        mysqlDB.query(insertQuery, [
          postContent, today, null, "text", currentUser.id, post.id, 
          post.sharedCounts + 1, post.id
      ], (error, postResult) => {
        
          if(error) return console.log(error);

        const content = `${currentUser.firstname} ${currentUser.lastname} has shared your post`
        const insertQuery = `
        INSERT INTO postNotification 
        (content, userProfileWhoLiked, visited, date, time, postId, userId)
        VALUES 
        (?, ?, ?, ?, ?, ?, ?);`;

        mysqlDB.query(insertQuery, 
          [content, currentUser.profileUrl, false, today, time, postResult[0].insertId, post.userId], 
          (error, result) => {
            if(error) {
              return console.error(error.message)
            }
            socket.broadcast.emit("post_notification", { // eto yung error 
              content,
              date:today,
              time,
              postId: postResult[0].insertId,
              userId: post.userId,
              userProfileWhoLiked: currentUser.profileUrl,
              username: currentUser.firstname + " " + currentUser.lastname,
            })

        })
        })

        //continue here
        
       })
    });

    socket.on("callUser", ({userIdTocall, signalData, from}) => {
      socket.broadcast.emit("someOneCalling", {userIdTocall, signalData, from});
    });

    socket.on("answerCall", (data) => {
      socket.broadcast.emit("callAccepted", data)
    });

    socket.on("handshake_server", ({to, from}) => {
      socket.broadcast.emit("handshake_client", {to, from: user});
    })

    socket.on('endCall', ({userIdToEndCall}) => {
      socket.broadcast.emit("endCall", userIdToEndCall)
    })


    socket.on("disconnect", () => {
      try {
        const updateQuery = `UPDATE user SET isOnline = ? WHERE id = ?`
        mysqlDB.query(updateQuery, [false, user.id] , (error) => {
          if(error) {
            return console.error(error.message);
          }

        })
      } catch (error) {
        console.error(error.message)
      }
    }); //user goes offline
  });
};

module.exports = socket;
