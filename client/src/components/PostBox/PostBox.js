import React from "react";
import { useSelector } from "react-redux";
import {
  PostBoxContainer,
  PostBoxOption,
  OptionContainer,
} from "./Postbox.style";

function PostBox({ openPostModal, setOpenPostModal }) {
  const { currentUser } = useSelector((state) => state.userReducer);
  return (
    <PostBoxContainer>
      <input
        type="text"
        value=""
        placeholder={`What's on your mind? ${currentUser.firstname}`}
        onClick={() => setOpenPostModal(true)}
      />

      <div className="linebreak"></div>
      <PostBoxOption>
        <OptionContainer bg="red" onClick={() => setOpenPostModal(true)}>
          <i className="fa-solid fa-clapperboard"></i> &nbsp;Video
        </OptionContainer>
        <OptionContainer bg="blue" onClick={() => setOpenPostModal(true)}>
          <i className="fa-solid fa-image"></i> &nbsp;Image
        </OptionContainer>
        <OptionContainer bg="yellow" onClick={() => setOpenPostModal(true)}>
          <i className="fa-solid fa-face-laugh-beam"> </i> &nbsp;Feeling Today
        </OptionContainer>
      </PostBoxOption>
    </PostBoxContainer>
  );
}

export default PostBox;
