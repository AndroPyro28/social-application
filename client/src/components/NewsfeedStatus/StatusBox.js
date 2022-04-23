import styled from "styled-components";
import {
  StatusContainer,
  StatusBanner,
  StatusUserName,
  StatusProfilePicture,
  StatusContent,
  CRSContainer,
  SocialContainer,
  LikedButton,
  CommentsContainer,
  Comment,
  CommentInputContainer,
  PostOption,
  SharedPostContainer,
  ShareOption
} from "./StatusContainer";
import {format} from 'timeago.js';
import axios from "axios";
import { Image, Video } from "cloudinary-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import statusBoxLogic from "./statusBoxLogic";
import Cookies from "js-cookie";
import UpdatePostBox from "../PostBox/UpdatePostBox";
import { getPostForEdit, getPostIdForDelete, getPostIdForShare } from "../../redux/actions/postId";

const StatusBox = ({ status }) => {
  const [likedList, setLikedList] = useState([]);
  const [likedCount, setLikedCount] = useState(0);
  const [comments, setComments] = useState([]);

  const [toggleComments, setToggleComments] = useState(false);
  const [toggleOption, setToggleOption] = useState(false);
  const [toggleShareOption, setToggleShareOption] = useState(false);

  useEffect(() => {
    const arrayOfWhoLikeThisPost = status?.likes.filter(like => like.id != null)
    setLikedList(arrayOfWhoLikeThisPost);
    setLikedCount(arrayOfWhoLikeThisPost.length);
  }, [])



  const {currentUser} = useSelector(state => state.userReducer);
  const socket = useSelector(state => state.socketReducer)
  const [newComment, setNewComment] = useState("");

  const { likeORUnlikePost, comment} = statusBoxLogic({socket})

  const dispatch = useDispatch();

  const {sharedPostId, sharedPost} = status;

  useEffect(() => {
    //socket events listener
    socket.on('deleteLikeSuccessfull', (response) => {
      if(response.postId == status.id) {
        setLikedCount(prev => prev - 1); // to constantly update the number of likes
        
        setLikedList(status.likes.filter(like => like.userId != response.userId)) //to check if this user liked this post then show LIKED
      }
    })

    socket.on('likeSuccessfull', (response) => {
      if(response.postId == status.id) {
        setLikedCount(prev => prev + 1); // to constantly update the number of likes
        setLikedList(prev => [...prev, response]) // to check if this user liked this post then show LIKED
      }
    });

    socket.on("push_comment", (response) => {
      setNewComment("");
      setComments(prev => [...prev, response])
    });

  }, []);

  useEffect(async () => {
    setComments([]);
    const res = await axios.get(`http://localhost:3001/api/getCommentsByPostId/${status.id}`, {
      withCredentials: true,
      headers: {
        accesstoken: Cookies.get("userToken")
      }
    });
    const {comments} = res.data;
    
    setComments(comments);

  }, [toggleComments])

  return (
    <StatusContainer>
      <StatusBanner>
        <div>
          <StatusProfilePicture>
            <Image cloudName="iamprogrammer" publicId={status.profileUrl} onClick={() => window.location.assign(`/userProfile/${status.userId}`)} />
          </StatusProfilePicture>
          <StatusUserName >
            <span onClick={() => window.location.assign(`/userProfile/${status.userId}`)}>{status.firstname} {status.lastname} </span>
             &nbsp;
            <i className="fa-solid fa-clock" onClick={() => window.location.assign(`/posts=${status.id}`)}>
              &nbsp;
              {format(status.created_at)}
            </i>
          </StatusUserName>
        </div>
      </StatusBanner>
      {
        currentUser.id == status.userId && <i className="fa-solid fa-ellipsis more" onClick={() =>  setToggleOption(!toggleOption) }></i>
      }

      <PostOption toggleOption={toggleOption}>
        <span onClick={() => dispatch( getPostForEdit(status))}><i className="fa-solid fa-pen-to-square"></i>&nbsp; Edit post</span>
        <span onClick={() => dispatch( getPostIdForDelete(status.id) )}><i className="fa-solid fa-eraser"></i>&nbsp; Delete post</span>
      </PostOption>
      

      <StatusContent>
        <p>{status.postContent}</p>

        {
          status.type == 'image' && status.dataUrl && <Image cloudName="iamprogrammer" publicId={status.dataUrl} />
        }

        {
           status.type == 'video' && status.dataUrl && <Video cloudName="iamprogrammer" controls="controls autoplay" publicId={status.dataUrl} /> 
        }

      </StatusContent>

      { /* sharedPost Content */
         sharedPostId && (
           <SharedPostContainer>
        <StatusContent isSharedPost={true}>

      <StatusBanner isSharedPost ={true}>
        <div>
          <StatusProfilePicture>
            <Image cloudName="iamprogrammer" publicId={sharedPost.profileUrl} onClick={() => window.location.assign(`/userProfile/${sharedPost.userId}`)} />
          </StatusProfilePicture>
          <StatusUserName>
            <span onClick={() => window.location.assign(`/userProfile/${sharedPost.userId}`)}>{sharedPost.firstname} {sharedPost.lastname} </span>
             &nbsp;
            <i className="fa-solid fa-clock" onClick={() => window.location.assign(`/posts=${sharedPost.id}`)}>
              &nbsp;
              {format(sharedPost.created_at)}
            </i>
          </StatusUserName>
        </div>
      </StatusBanner>
        <p> {sharedPost.postContent} </p>
            {
              sharedPost.type == "image" && sharedPost.dataUrl && <Image cloudName="iamprogrammer" publicId={sharedPost.dataUrl} />
            }

            {
              sharedPost.type == "video" && sharedPost.dataUrl && <Video cloudName="iamprogrammer" controls="controls autoplay" publicId={sharedPost.dataUrl} /> 
            }
          </StatusContent>
          </SharedPostContainer>
          )
           /* sharedPost Content */
      }

        { /* share option */
           toggleShareOption && (
           <ShareOption>
            <span onClick={() => dispatch(getPostIdForShare(sharedPostId && sharedPost || status))}> <i className="fa-solid fa-share"></i> Share</span>
            <span> <i className ="fa-solid fa-users"></i> Send To Friends</span>
          </ShareOption>
        )
         }


      <SocialContainer>
         {
           likedCount > 0 ? <div className="likesContainer"><i className="fa-solid fa-thumbs-up"></i> {likedCount}</div> : <div></div>
         }
        <div onClick={() => setToggleComments (!toggleComments)}>{comments.length > 0 && <span className="commentsContainer"> <i className="fa-solid fa-comment"></i> {comments.length}</span>} &nbsp; <span className="sharesContainer"><i className="fa-solid fa-share"></i> {status?.sharedCounts}</span></div>
      </SocialContainer>

         

      <CRSContainer>

        {
          likedList.some(like => like.userId == currentUser.id) ? 
          <LikedButton onClick={() => likeORUnlikePost(status.id, status.userId)}><i className="fa-solid fa-thumbs-up"> </i> &nbsp; liked</LikedButton>
          :
          <div onClick={() => likeORUnlikePost(status.id, status.userId)}><i className="fa-solid fa-thumbs-up"> </i> &nbsp; Like</div>
        }
        
        <div onClick={() => setToggleComments (!toggleComments)}><i className="fa-solid fa-message"></i> &nbsp; Comment</div>
        <div onClick={() => setToggleShareOption(!toggleShareOption)}><i className="fa-solid fa-share"></i>&nbsp; Share</div>
       
      </CRSContainer>

      {/* this is comment section */}

        {
          toggleComments && <CommentsContainer>

          { /* comment textbox here */ }

          <CommentInputContainer>
            <Image publicId={currentUser.profileUrl} cloudName="iamprogrammer"/>
            <div className="InputWrapperComment">
              <input type="text" placeholder="Write a comment..." value={newComment} onChange={ (e) => setNewComment(e.target.value)} onKeyDown={(e) => {
                if (e.key === 'Enter' && newComment != "") comment(status.id, status.userId, newComment)
              }} />
              <i className="fa-solid fa-paper-plane" onClick={() => newComment != "" && comment(status.id, status.userId, newComment)}></i>
            </div>
          </CommentInputContainer>

          {  
            comments.length > 0 ? 
            comments.map((comment, index) => {
              const { commentInfo } = comment;
              if(commentInfo.postId == status.id) {
                return (
                  <Comment key={index}>
                    <Image publicId={commentInfo.profileUrl} cloudName="iamprogrammer" onClick={() => window.location.assign(`/userProfile/${commentInfo.userId}`)} />
                    <p> <span className="name" onClick={() => window.location.assign(`/userProfile/${commentInfo.userId}`)}>{commentInfo.firstname} {commentInfo.lastname} <i className="fa-solid fa-comment"></i></span> {commentInfo.content} </p>
                    <div className="time"> <i className="fa-solid fa-clock-rotate-left"></i> {format(commentInfo.created_at)} </div>
                      {
                        currentUser.id == commentInfo.userId && <i class="fa-solid fa-ellipsis commentOption"></i>
                      }
                  </Comment>
                  ) 
              }
            })
            :
            (<div className="noCommentsSign"> <i className="fa-solid fa-comment-slash"></i> No Comments Yet</div>)
          }
          

        </CommentsContainer>
}
    </StatusContainer>
  );
};

export default StatusBox;
