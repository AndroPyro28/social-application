import React, { useEffect, useState } from "react";
import postBoxLogic from "./postBoxLogic";
import {
  PostBoxModalBackdrop,
  PostBoxModalBox,
  PostBoxBanner,
  PostBoxOptions,
  DataContainer
} from "./PostBoxModal.style";

function PostBoxModal({ setOpenPostModal, toast, setRefresher, refresher }) {
  const [postContent, setPostContent] = useState("");
  const [postData, setPostData] = useState();
  const [dataDisplayer, setDataDisplayer] = useState([]);

  const { handleSubmit, handleSetFile } = postBoxLogic({
    postContent,
    setPostContent,
    setDataDisplayer,
    postData,
    setPostData,
    setOpenPostModal,
    toast,
    setRefresher,
    refresher,
  });

  return (
    <PostBoxModalBackdrop>
      <i
        class="fa-solid fa-circle-xmark closeBtn"
        onClick={() => setOpenPostModal(false)}
      ></i>
      <PostBoxModalBox>
        <PostBoxBanner>
          <h1>Create Post</h1>
        </PostBoxBanner>

        <textarea
          placeholder="Tell about yourself..."
          onChange={(e) => setPostContent(e.target.value)}
        />

        <DataContainer>

          {
            postData && postData.includes('image') && <img src={postData} onClick={() => setPostData(null)}/>
          }

          {
            postData && postData.includes('video') && 
            <video controls="controls autoplay"  onClick={() => setPostData(null)}>
            <source src={postData} type="video/mp4" />
            </video>
          }

        </DataContainer>
          

        <PostBoxOptions>
          <h5>  <i className="fa-solid fa-file-image"></i> +</h5>

          <input type="file" onChange={handleSetFile} multiple accept="image/* video/*"/>
        </PostBoxOptions>

        <button className="btnSubmit" name="dataUrl" onClick={handleSubmit}>Post</button>
      </PostBoxModalBox>
    </PostBoxModalBackdrop>
  );
}

export default PostBoxModal;
