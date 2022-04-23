import React, { useState } from "react";
import UpdateCoverLogic from "./UpdateCoverLogic";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateUserModalBackdrop,
  UpdateUserModalBox,
} from "./UpdateUserModal.style";
import { Image } from "cloudinary-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateCoverPhotoModal({ setCoverModal }) {
  const [coverPhoto, setCoverPhoto] = useState();

  const { currentUser } = useSelector((state) => state.userReducer);

  const { handleClick, handleChange, updateCoverPicture } = UpdateCoverLogic({
    setCoverModal,
    setCoverPhoto,
    coverPhoto,
    toast,
  });
  return (
    <UpdateUserModalBackdrop>
      <ToastContainer autoClose={2000} />
      <i
        className="fa-solid fa-circle-xmark"
        onClick={() => setCoverModal(false)}
      ></i>
      <UpdateUserModalBox>
        <h2>Update Cover Photo</h2>

        {/* <img
          src={coverPhoto}
          onClick={handleClick}
          title={coverPhoto && "Click to remove photo"}
        /> */}

        {coverPhoto != null ? (
          <img
            src={coverPhoto}
            onClick={handleClick}
            title={coverPhoto && "Click to remove photo"}
          />
        ) : (
          <Image publicId={currentUser.coverUrl} cloudName="iamprogrammer" />
        )}

        <div className="input__box">
              <h5> + <i className="fa-solid fa-file-image"></i> </h5>
            <input type="file" placeholder="choose file" onChange={handleChange} accept="image/*" />
        </div>

        <button className="btnUpdate" onClick={updateCoverPicture}>
          Upload Photo
        </button>
      </UpdateUserModalBox>
    </UpdateUserModalBackdrop>
  );
}

export default UpdateCoverPhotoModal;
