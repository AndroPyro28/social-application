const { mysqlDB } = require("../config/connectDB");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");

module.exports.signup = async (req, res) => {
  let { firstname, lastname, email, address, password } = req.body;

  const values = Object.values(req.body);

  const isCompleted = values.every((val) => val !== "");

  if (!isCompleted) {
    return res.status(200).json({
      msg: "Please complete the following requirements",
      success: false,
    });
  }

  const selectQuery = "SELECT * FROM user WHERE email = ?";

  mysqlDB.query(selectQuery, [email], async (err, result) => {
    if (err) {
      console.error("select", err.message);

      return res.status(200).json({
        success: false,
        msg: "Something went wrong...",
      });
    }
    if (result.length > 0) {
      return res.status(200).json({
        msg: "This email is already in use",
        success: false,
      });
    }

    password = await bcrypt.hash(password, 6);
    const defaultProfile = process.env.defaultProfile;
    const defaultCover = process.env.defaultCover;

    const insertQuery =
      "INSERT INTO user (firstname, lastname, email, address, password, profileUrl, coverUrl) VALUES (?,?,?,?,?,?,?)";
    mysqlDB.query(
      insertQuery,
      [
        firstname,
        lastname,
        email,
        address,
        password,
        defaultProfile,
        defaultCover,
      ],
      (err, result) => {
        if (err) {
          console.error("insert", err.message);
          return res.status(200).json({
            success: false,
            msg: "Something went wrong...",
          });
        }
        return res.status(200).json({
          success: true,
          msg: "Registered successfully!",
        });
      }
    );
  });
};

const maxAge = 24 * 60 * 60;

const assignToken = (id) => {
  return jwt.sign({ id }, process.env.jwtSecret, {
    expiresIn: maxAge,
  });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(200).json({
      msg: "Email or Password is empty!",
      success: false,
    });
  }

  const selectQuery = "SELECT * FROM user WHERE email = ?";
  mysqlDB.query(selectQuery, [email], async (error, result) => {
    if (error) {
      return res.status(200).json({
        msg: "Something went wrong...",
        success: false,
      });
    }

    if (result <= 0) {
      return res.status(200).json({
        msg: "Invalid Credentials",
        success: false,
      });
    }
    if (!(await bcrypt.compare(password, result[0].password))) {
      return res.status(200).json({
        msg: "Invalid Credentials",
        success: false,
      });
    }

    const assignedToken = assignToken(result[0].id);

    return res.status(200).json({
      assignedToken,
      success: true,
      msg: "login successfully!",
    });
  });
};

const getDateToday = () => {
  const date = new Date();

    const today_Date =
      date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();

    const today_year = date.getFullYear();

    const today_month =
      date.getMonth() + 1 <= 9
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;

    const TODAY = `${today_year}-${today_month}-${today_Date}`;
    return TODAY;
}

module.exports.post = async (req, res) => {
  try {
    const { dataUrl, dataType, postContent = null } = req.body;

    let type = "text";
    if (
      dataType &&
      !dataType.startsWith("image") &&
      dataType &&
      !dataType.startsWith("video")
    ) {
      return res.status(200).json({
        msg: "Invalid type of video/photo",
        success: false,
      });
    }

    if (!dataUrl && !postContent) {
      return res.status(200).json({
        msg: "Posting something is required to upload",
        success: false,
      });
    }

     const TODAY = getDateToday();

    let postDataUrl = null;

    if (dataUrl.length > 0 && dataType.startsWith("video")) {
      const cloudinaryUpload = await cloudinary.uploader.upload(dataUrl, {
        // if the uploader upload a photo
        resource_type: "video",
        upload_preset: "social_userPost_Image_Video",
      });
      postDataUrl = cloudinaryUpload.public_id;
      type = "video";
    }
    if (dataUrl.length > 0 && dataType.startsWith("image")) {
      const cloudinaryUpload = await cloudinary.uploader.upload(dataUrl, {
        upload_preset: "social_userPost_Image_Video",
      });
      postDataUrl = cloudinaryUpload.public_id;
      type = "image";
    }

    const insertQuery =
      "INSERT INTO post (postContent, date, dataUrl, type, userId) VALUES(?, ?, ?, ?, ?)";

    mysqlDB.query(
      insertQuery,
      [postContent, TODAY, postDataUrl, type, req.currentUser.id],
      (error, result) => {
        if (error) {
          console.log("error error", error);
          return res.status(200).json({
            msg: "something went wrong...",
            success: false,
          });
        }

        return res.status(200).json({
          msg: "Post has been uploaded",
          success: true,
        });
      }
    );
  } catch (error) {
    console.error("error", error);
  }
};

module.exports.getAllFriendsStatus = async (req, res) => {
  const { id } = req.currentUser;

  try {
    const selectQuery = `SELECT * FROM friendsWith WHERE userId1 = ? OR userId2 = ?`;

    mysqlDB.query(selectQuery, [id, id], (error, result) => {
      if (error)
        return res.status(200).json({
          success: false,
          msg: "something went wrong",
        });

      let arrayOfId = new Array();

      arrayOfId.push(id);

      result.forEach((res) => {
        if (res.userId1 == id) {
          res.userId = res.userId2;
          arrayOfId.push(res.userId);
        }
        if (res.userId2 == id) {
          res.userId = res.userId1;
          arrayOfId.push(res.userId);
        }
        return res;
      });
      const selectQuery = `SELECT 
    u1.firstname, 
    u1.lastname,
    u1.profileUrl,
    p.*,
    GROUP_CONCAT(JSON_OBJECT('userId', likes.userId, 'id', likes.id)) as likes,

    JSON_OBJECT(
      'userId', u2.id, 'firstname', u2.firstname, 'lastname', u2.lastname, 'profileUrl', u2.profileUrl,

      'id', s.id, 'postContent', s.postContent, 'dataUrl', s.dataUrl, 'type', s.type, 
      'sharedPostId', s.sharedPostId, 'sharedCounts', s.sharedCounts,'created_at',  s.created_at 
    ) as sharedPost

    FROM user u1
    INNER JOIN post p
    ON p.userId = u1.id
    LEFT JOIN post s
    ON p.sharedPostId = s.id
    LEFT JOIN user u2
    ON s.userId = u2.id
    LEFT JOIN likes
    ON p.id = likes.postId
    WHERE u1.id IN (?)
    GROUP BY p.id
    ORDER BY p.created_at DESC`;

      mysqlDB.query(selectQuery, [arrayOfId], (error, result) => {
        if (error) {
          console.error(error.message);
        }

        const status = result.map(post => {

          if(post.sharedPostId) {
            post.sharedPost = JSON.parse(post.sharedPost)
          }
          else {
            post.sharedPost = {}
          } 
          return post
        })

        // to be continue
        
        // random the results here

        return res.status(200).json({
          newsFeedStatus: status,
          success: true,
          msg: "Data has been fetched!",
        });
      });
    });
  } catch (error) {
    return res.status(200).json({
      msg: "Something went wrong...",
      success: false,
    });
  }
};

module.exports.updateProfilePicture = async (req, res) => {
  const { profileUrlData } = req.body;

  if (!profileUrlData.includes("image")) {
    return res.status(200).json({
      msg: "JPG/PNG extension only",
      success: false,
    });
  }

  try {
    if (req.currentUser.profileUrl != process.env.defaultProfile) {
      const destroyIfNotDefaultPhoto = await cloudinary.uploader.destroy(
        req.currentUser.profileUrl
      );
    }

    const responseFromCloud = await cloudinary.uploader.upload(profileUrlData, {
      upload_preset: "social__userProfilePicture",
    });

    const profileUrl = responseFromCloud.public_id;

    const updateQuery = `UPDATE user set profileUrl = ? WHERE id = ?`;
    mysqlDB.query(
      updateQuery,
      [profileUrl, req.currentUser.id],
      (error, result) => {
        if (error) {
          return res.status(200).json({
            msg: "Something went wrong...",
            success: false,
          });
        }

        return res.status(200).json({
          msg: "Profile photo has been updated!",
          success: true,
        });
      }
    );
  } catch (error) {
    console.error(error.message);
  }
};

module.exports.updateCoverPhoto = async (req, res) => {
  const { coverUrlData } = req.body;

  if (!coverUrlData.includes("image")) {
    return res.status(200).json({
      msg: "JPG/PNG extension only",
      success: false,
    });
  }

  try {
    if (req.currentUser.coverUrl != process.env.defaultCover) {
      const destroyIfNotDefaultPhoto = await cloudinary.uploader.destroy(
        req.currentUser.coverUrl
      );
    }

    const responseFromCloud = await cloudinary.uploader.upload(coverUrlData, {
      upload_preset: "social__userCoverPhoto",
    });

    const coverUrl = responseFromCloud.public_id;

    const updateQuery = `UPDATE user set coverUrl = ? WHERE id = ?`;
    mysqlDB.query(
      updateQuery,
      [coverUrl, req.currentUser.id],
      (error, result) => {
        if (error) {
          return res.status(200).json({
            msg: "Something went wrong...",
            success: false,
          });
        }

        return res.status(200).json({
          msg: "Cover photo has been updated!",
          success: true,
        });
      }
    );
  } catch (error) {
    console.error(error.message);
  }
};

module.exports.userProfile = async (req, res) => {
  const { id } = req.params;

  try {
    if (id != req.currentUser.id) {
      // if userProfile to find is not the currentUser

      //multiple query
      const selectQuery = `SELECT user.*, friendsWith.id as friendShipId, userrelation.userIdTo as userRelationId FROM user
      LEFT JOIN friendsWith
      ON friendsWith.userId1 = ? AND friendsWith.userId2 = ?
      OR
      friendsWith.userId2 = ? AND friendsWith.userId1 = ?
      LEFT JOIN userrelation
      ON userrelation.userIdTo = ? AND userrelation.userIdFrom = ? AND userrelation.subject = ? OR
      userrelation.userIdFrom = ? AND userrelation.userIdTo = ? AND userrelation.subject = ?
      WHERE user.id = ?;

      SELECT
          GROUP_CONCAT(JSON_OBJECT('userId', likes.userId, 'id', likes.id)) as likes, 
          p.*,

          JSON_OBJECT(
            'userId', user.id, 'firstname', user.firstname, 'lastname', user.lastname, 'profileUrl', user.profileUrl,
            'postId', s.id, 'postContent', s.postContent, 'dataUrl', s.dataUrl, 'type', s.type, 
            'sharedPostId', s.sharedPostId, 'sharedCounts', s.sharedCounts, 'created_at', s.created_at
          ) as sharedPost

          FROM post p
          
          LEFT JOIN post s
          ON p.sharedPostId = s.id
          LEFT JOIN user 
          ON s.userId = user.id
          LEFT JOIN likes
          ON likes.postId = p.id
          WHERE p.userId = ?
          GROUP BY p.id`;

      mysqlDB.query(
        selectQuery,
        [
          req.currentUser.id,
          id,
          req.currentUser.id,
          id,
          req.currentUser.id,
          id,
          "friend_request",
          req.currentUser.id,
          id,
          "friend_request",
          id,
          id,
        ],
        (error, userResult) => {
          // ibahin natin to
          if (error) {
            console.log("not currentUser error 1:", error.message);
            return res.status(200).json({
              msg: "something went wrong...",
              success: false,
            });
          }

          const userData = userResult[0][0];

          const status =  userResult[1].map(post => {

            if(post.sharedPostId) {
              post.sharedPost = JSON.parse(post.sharedPost)
            }
            else {
              post.sharedPost = {}
            } 
            return post
          })
          
            if (!userData) {
              console.log("cannot find user");
              return res.status(200).json({
                msg: "Cannot find user",
                success: false,
              });
            }

          userData.posts = status;
          

          return res.status(200).json({
            userData,
            success: true,
          });
        }
      );
    } else {
      const selectQuery = `SELECT
      GROUP_CONCAT(JSON_OBJECT('userId', likes.userId, 'id', likes.id)) as likes, 
      p.*,

      JSON_OBJECT(
        'userId', user.id, 'firstname', user.firstname, 'lastname', user.lastname, 'profileUrl', user.profileUrl,
  
        'postId', s.id, 'postContent', s.postContent, 'dataUrl', s.dataUrl, 'type', s.type, 
        'sharedPostId', s.sharedPostId, 'sharedCounts', s.sharedCounts, 'created_at', s.created_at
      ) as sharedPost

      FROM post p
      
      LEFT JOIN post s
      ON p.sharedPostId = s.id
      LEFT JOIN user 
      ON s.userId = user.id
      LEFT JOIN likes
      ON likes.postId = p.id
      WHERE p.userId = ?
      GROUP BY p.id
      `;

      mysqlDB.query(selectQuery, [id], (error, postsResult) => {
        if (error) {
          console.log("postresult error");
          return res.status(200).json({
            msg: "something went wrong...",
            success: false,
          });
        }

        const userData = req.currentUser;

        if (postsResult.length <= 0) {
          console.log("no posted");
          return res.status(200).json({
            msg: "Cannot find posts of this user",
            success: true,
            userData,
          });
        }

        const status = postsResult.map(post => {

          if(post.sharedPostId) {
            post.sharedPost = JSON.parse(post.sharedPost)
          }
          else {
            post.sharedPost = {}
          }
          return post
        })

        userData.posts = status;

        return res.status(200).json({
          success: true,
          userData,
        });
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.addFriend = async (req, res) => {
  const { id } = req.body;
  try {
    const insertQuery =
      "INSERT INTO friendsWith (userId1, userId2, dateOfFriendShip) VALUES (?,?,?)";
    const date = new Date();

    mysqlDB.query(
      insertQuery,
      [req.currentUser.id, id, ""],
      (error, result) => {
        if (error) {
          return res.status(200).json({
            msg: "something went wrong...",
            success: false,
          });
        }

        return res.status(200).json({
          msg: "success friended",
          success: true,
        });
      }
    );
  } catch (error) {
    console.error(error.message);
  }
};

module.exports.getUserRelation = async (req, res) => {
  const { id } = req.params;
  try {
    const selectQuery = `SELECT userRelation.*, user.profileUrl FROM userRelation
    LEFT JOIN user
    ON user.id = userRelation.userIdFrom
    WHERE userIdTo = ?
    ORDER BY userRelation.date, userRelation.time DESC`;
    mysqlDB.query(selectQuery, [id], (error, result) => {
      if (error) {
        console.log(error.message);
      }
      if (result.length > 0) {

        
        return res.status(200).json({
          success: true,
          userRelation: result,
        });
      }
    });
  } catch (error) {}
};

module.exports.searchPeople = async (req, res) => {
  const { textSearch } = req.body;

  const firstname = textSearch.split(" ")[0];
  const lastname = textSearch.split(" ")[1];

  try {
    const selectQuery = `SELECT user.id, user.profileUrl, user.firstname, user.lastname FROM user
        WHERE user.firstname LIKE ? ${
          lastname ? "AND user.lastname LIKE ?" : ""
        }
        LIMIT 5`;

    mysqlDB.query(
      selectQuery,
      [`%${firstname}%`, `%${lastname}%`],
      (error, result) => {
        if (error)
          return res.status(200).json({
            success: false,
            msg: "something went wrong...",
          });

        return res.status(200).json({
          searchedData: result,
          success: true,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.getPostsNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const selectQuery = `SELECT * FROM postNotification WHERE userId = ?;`;
    mysqlDB.query(selectQuery, [id], (error, posts) => {
      if (error) {
        console.log(error.message);
        return res.status(200).json({
          msg: "something went wrong...",
          success: false,
        });
      }
      return res.status(200).json({
        posts,
        success: true,
      });
    });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports.getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;
  try {
    const selectQuery = `SELECT c.id as commentId, 
    JSON_OBJECT('firstname', u.firstname, 'lastname', u.lastname, 'profileUrl', u.profileUrl, 'content', c.content, 'type', c.type, 'dataUrl', c.dataUrl,  'date', c.date, 'time', c.time, 'userId', c.userId, 'postId', c.postId, 'created_at', c.created_at) as commentInfo,

    GROUP_CONCAT(JSON_OBJECT('id', r.id, 'content', r.content,'dataUrl', r.dataUrl, 'type', r.type, 'userId', r.userId, 'date', r.date, 'time', r.time, 'postId', r.postId, 'firstname', ur.firstname, 'lastname', ur.lastname, 'profileUrl', ur.profileUrl), '*DIVIDER*') as replies

    FROM comments c

    INNER JOIN user u
    ON u.id = c.userId

    LEFT JOIN comments r
    ON c.id = r.replyId

    LEFT JOIN user ur
    ON r.userId = ur.id
    
    WHERE c.postId = ?
    GROUP BY c.id`;

    mysqlDB.query(selectQuery, [postId], (error, comments) => {
      if (error) {
        return console.error(error.message);
      }

      if (comments.length > 0) {
        comments.map((comment) => {
          comment.commentInfo = JSON.parse(comment.commentInfo);

          const jsonReplies = comment.replies.split("*DIVIDER*");

          comment.replies = jsonReplies.map((reply) => {
            if (reply.startsWith(",")) {
              reply = reply.substring(1);
              return JSON.parse(reply);
            }
            if (reply != "") {
              return JSON.parse(reply);
            }
          });
          comment.replies.pop();
          return comment;
        });
      }

      return res.status(200).json({
        success: true,
        comments,
      });
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      msg: "something went wrong...",
    });
  }
};

module.exports.getPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const selectQuery = `
    SELECT 
    u1.firstname, 
    u1.lastname,
    u1.profileUrl,
    p.*,
    GROUP_CONCAT(JSON_OBJECT('userId', likes.userId, 'id', likes.id)) as likes,

    JSON_OBJECT(
      'userId', u2.id, 'firstname', u2.firstname, 'lastname', u2.lastname, 'profileUrl', u2.profileUrl,
      'id', s.id, 'postContent', s.postContent, 'dataUrl', s.dataUrl, 'type', s.type,
      'sharedCounts', s.sharedCounts, 'sharedPostId', s.sharedPostId, 'created_at', s.created_at
    ) as sharedPost

    FROM user u1
    INNER JOIN post p
    ON p.userId = u1.id
    LEFT JOIN post s
    ON p.sharedPostId = s.id
    LEFT JOIN user u2
    ON s.userId = u2.id
    LEFT JOIN likes
    ON p.id = likes.postId
    WHERE p.id = ?
    GROUP BY p.id
    ORDER BY p.created_at DESC
    `;
    // SELECT 
    // post.*,
    // user.firstname, 
    // user.lastname,
    // user.profileUrl,
    // JSON_OBJECT(
    //   'userId', user.id, 'firstname', user.firstname, 'lastname', user.lastname, 'profileUrl', user.profileUrl,

    //   'postId', s.id, 'postContent', s.postContent, 'dataUrl', s.dataUrl, 'type', s.type, 
    //   'sharedPostId', s.sharedPostId, 'created_at', s.created_at
    // ) as sharedPost,

    // GROUP_CONCAT(JSON_OBJECT('userId', likes.userId, 'id', likes.id)) as likes
    // FROM user
    // INNER JOIN post
    // ON post.userId = user.id
    // LEFT JOIN likes
    // ON post.id = likes.postId
    // WHERE post.id = ?
    // GROUP BY post.id

    mysqlDB.query(selectQuery, [postId], (error, result) => {
      if (error) return console.error('here ang bagong error', error.message);
      result[0].sharedPost = JSON.parse(result[0]?.sharedPost);

      
      return res.status(200).json({
        status: result[0],
      });
    });
  } catch (error) {
    console.error('here ang bagong error', error.message);
  }
};

module.exports.getMessagesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const selectQuery = `SELECT

    JSON_OBJECT('privateChatId', privateChat.id, 'userId1', privateChat.userId1, 'userId2', 
    privateChat.userId2, 'date', privateChat.date, 'time', privateChat.time) as privateChat,

    JSON_OBJECT('userId', user.id, 'profileUrl', user.ProfileUrl, 'email', user.email, 
    'firstname', user.firstname, 'lastname', user.lastname) as userData, 

    GROUP_CONCAT(JSON_OBJECT(
      'messageId', privateChatMessages.id, 'privateChatId', privateChatMessages.privateChatId, 'messageContent', privateChatMessages.message, 
      'messageData', privateChatMessages.dataUrl, 'messageType', privateChatMessages.type,
      'userId', privateChatMessages.userId, 'time', privateChatMessages.created_at
    ), '*DIVIDER*') as messages
    FROM user
    
    LEFT JOIN privateChat
    ON privateChat.userId1 = ? AND privateChat.userId2 = ? OR
    privateChat.userId2 = ? AND privateChat.userId1 = ?
    LEFT JOIN privateChatMessages
    ON privateChatMessages.userId IN (?) AND privateChatMessages.privateChatId = privateChat.id 
    WHERE user.id = ?
    GROUP BY privateChat.id
    `;
      
    mysqlDB.query(
      selectQuery,
      [req.currentUser.id,userId, req.currentUser.id,userId,
        [req.currentUser.id, userId],
         userId],
      (error, result) => {
        if (error) {
          return console.error("error", error.message);
        }

        const messages = result[0].messages.split("*DIVIDER*");
        messages.length--;
        result[0].messages = messages.map((message) => {
          if (message.startsWith(",")) {
            message = message.substring(1);
          }
          message = JSON.parse(message);

          if (message.messageId != null) {
            return message;
          }
        });

        result[0].messages = result[0].messages.filter(
          (message) => message != undefined
        );
        result[0].userData = JSON.parse(result[0].userData)
        result[0].privateChat = JSON.parse(result[0].privateChat)
        return res.status(200).json({
          chatData: result[0],
          success: true,
        });
      }
    );
  } catch (error) {
    return res.status(200).json({
      msg: error.message,
      success: false
    })
  }
};

module.exports.getAllFriends = async (req, res) => {
  
  try {

    const { id } = req.currentUser;

    const selectQuery = `
    SELECT * FROM friendsWith WHERE userId1 = ? OR userId2 = ?;
    SELECT * FROM user;
    `;

    mysqlDB.query(selectQuery, [id, id], (error, result) => {
     

      const friendsIds = result[0].map((friend) => {
        if(friend.userId1 != id) return friend.userId1

        return friend.userId2
      });

      // console.log(friendsIds);

      const friends = result[1].filter(friend => {
          if(friendsIds.includes(friend.id)) return friend;
      })

      return res.status(200).json({
        success: true,
        friends
      })
    })
    
  } catch (error) {
    console.error(error.message)
  }
}

module.exports.getAllFriendsByUserId = async (req, res) => {

  try {

    const {id} = req.params;

    const selectQuery = `
    SELECT * FROM friendsWith WHERE userId1 = ? OR userId2 = ?;
    SELECT * FROM user;
    `;

    mysqlDB.query(selectQuery, [id, id], (error, result) => {
     

      const friendsIds = result[0].map((friend) => {
        if(friend.userId1 != id) return friend.userId1

        return friend.userId2
      });

      const friends = result[1].filter(friend => {
          if(friendsIds.includes(friend.id)) return friend;
      })

      return res.status(200).json({
        success: true,
        friends
      })
    })
    
  } catch (error) {
    console.error(error.message)
  }
}

module.exports.getMessages = async (req, res) => {
  const { id } = req.currentUser;
  try {

    const selectQuery = `SELECT 

    JSON_OBJECT(
      'privateId', privateChat.id, 
      'userId1', privateChat.userId1, 
      'userId2', privateChat.userId2, 
      'refresher', privateChat.refresher, 
      'date', privateChat.date,
      'time', privateChat.time, 
      'created_at', privateChat.created_at,
      'updated_at', privateChat.updated_at
      ) as privateChat, 
    
    GROUP_CONCAT(JSON_OBJECT(
    'messageId', privateChatMessages.id, 
    'privateChatId', privateChatMessages.privateChatId, 
    'messageContent', privateChatMessages.message, 
    'messageData', privateChatMessages.dataUrl, 
    'messageType', privateChatMessages.type,
    'userId', privateChatMessages.userId,
    'visited', privateChatMessages.visited,
    'time', privateChatMessages.created_at), '*DIVIDER*') as messages

    FROM privateChat

    LEFT JOIN privateChatMessages
    ON privateChat.id = privateChatMessages.privateChatId
    WHERE privateChat.userId1 = ? OR privateChat.userId2 = ?
    GROUP BY privateChat.id;

    SELECT * FROM user`;
      
    mysqlDB.query(selectQuery, [id, id], (error, result) => {
      if (error) return console.error(error.message);
     let  messagesData = result[0];
     const users = result[1];
      //dividing the messageData JSON and parsing it
     messagesData = messagesData.filter(messageData => {
       let filteredMessage = messageData.messages.split('*DIVIDER*')
       filteredMessage.length--;
       
       const messageObject = filteredMessage.map(sms => {
        if(sms.startsWith(",")) {
          sms = sms.substring(1);
         }
         sms = JSON.parse(sms)
         
         return sms.messageId != null && sms;
       })
       messageData.privateChat = JSON.parse(messageData.privateChat)
       messageData.messages = messageObject
       return !messageData.messages.includes(false) && messageData
     })
     // organizing message data with user and privateChatsData
        let originalMessages = []
        messagesData.map(messageData => {
          originalMessages = users.filter(user => {
        if(messageData.privateChat.userId1 != id && user.id == messageData.privateChat.userId1 && user.id != id) {
          user.messages = messageData.messages;
          user.privateChat = messageData.privateChat
      }
        if(messageData.privateChat.userId2 != id && user.id == messageData.privateChat.userId2 && user.id != id) {
          user.messages = messageData.messages;
          user.privateChat = messageData.privateChat;
      }
      return user.messages && user;
      });
     })

     //lastly lets sort it

     for(let i = 0; i < originalMessages.length; i++) {
       for(let j = i + 1; j < originalMessages.length; j++) {
         if(originalMessages[i].privateChat.updated_at > originalMessages[j].privateChat.updated_at) {
           const temp = originalMessages[j];
           originalMessages[j] = originalMessages[i];
           originalMessages[i] = temp
         }
       }
     }

     //done but not optimize
    return res.status(200).json({
      success: true,
      messages: originalMessages
    })
  })
  } catch (error) {
    console.error(error.message);
  }
}

module.exports.updatePost = async (req, res) => {
  let { dataUrl, id, postContent, type, prevUrl, prevType} = req.body;
  try {

    // if(!dataUrl)
    if (type == "" && !dataUrl && postContent) type = "text";

    if(prevUrl?.length > 0 && prevType == "image") {
      const deletefile = await cloudinary.uploader.destroy(prevUrl);
    } 

    if(prevUrl?.length > 0 && prevType == "video") {
      const deletefile = await cloudinary.uploader.destroy(prevUrl, {
        resource_type: "video"
      });
    } 
    console.log({dataUrl, id, postContent, type, prevUrl, prevType})
  
    if (type == "" && dataUrl) { // there was changes in photo or dataUrl

      if(dataUrl?.includes('image')) {
        type = "image";
        const cloudinaryUpload = await cloudinary.uploader.upload(dataUrl, {
          upload_preset: "social_userPost_Image_Video",
        })
        dataUrl = cloudinaryUpload.public_id;
      } 

      if(dataUrl?.includes('video')) {
        type = "video";
        const cloudinaryUpload = await cloudinary.uploader.upload(dataUrl, {
          upload_preset: "social_userPost_Image_Video",
          resource_type: "video"
        })
        dataUrl = cloudinaryUpload.public_id;
      }
    }
    const updateQuery = `UPDATE post SET postContent = ?, dataUrl = ?, type = ? WHERE id = ?`;
    mysqlDB.query(updateQuery, [postContent, dataUrl, type, id], (error, result) => {
      if(error) {
        return console.log(error)
      }
      return res.status(200).json({
        success: true,
        msg: "Post has been updated!"
      })
    })

  } catch (error) {
    console.error(error.message)
  }
}

module.exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  
  try {
    const deleteQuery = `
    SELECT * FROM post WHERE id = ?;
    DELETE FROM post WHERE id = ?;
    `;

    mysqlDB.query(deleteQuery, [postId, postId], async (error, result) => {
      if(error) return console.error(error.message);

      const post = result[0][0];

      if(post.type == "video") {
      const deletedFile = await cloudinary.uploader.destroy(post.dataUrl, {
        resource_type: "video"
      })
      }

      if(post.type == "image") {
        const deletedFile = await cloudinary.uploader.destroy(post.dataUrl)
      }
      
      
      return res.status(200).json({
        postId,
        success: true
      })
    })
  } catch (error) {
    console.error(error.message)
  }
}

module.exports.sharePost = async (req, res) => {
  const {post:postToShared, postContent} = req.body;
  const {id:userId} = req.currentUser;
  try {
    const insertQuery = `
    INSERT INTO post (postContent, date, dataUrl, type, userId, sharedPostId) VALUES (?, ?, ?, ?, ?, ?);
    UPDATE post SET sharedCounts = ? WHERE id = ?
    `
    mysqlDB.query(insertQuery, [
      postContent, getDateToday(), null, "text", userId, postToShared.id, 
      postToShared.sharedCounts + 1, postToShared.id
  ], (error, result) => {
      if(error) return console.log(error);
      
      return res.status(200).json({
        success: true,
        msg: "Post shared to newsfeed..."
      })
    })
  } catch (error) {
    console.error(error.message)
  }
}

module.exports.getUserMedia = async (req, res) => {
  const {userId, mediaType} = req.body;
  try {
    const selectQuery = `SELECT * FROM post WHERE userId = ? AND type = ?;`;

    mysqlDB.query(selectQuery, [userId, mediaType], (error, medias) => {
      if(error) {
        return console.error(error.message);
      }

      return res.status(200).json({
        medias,
        success: true
    })
    })
  } catch (error) {
    console.error(error.message)
  }
}