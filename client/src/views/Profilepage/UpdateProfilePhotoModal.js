import React, { useState } from "react";
import UpdateProfileLogic from "./UpdateProfileLogic";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateUserModalBackdrop,
  UpdateUserModalBox,
} from "./UpdateUserModal.style";
import { refresh } from "../../redux/actions/appRefresher";
import { Image } from "cloudinary-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateProfileModal({ setProfileModal }) {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const { currentUser } = useSelector((state) => state.userReducer);
  const { handleChange, handleClick, updateProfilePicture } =
    UpdateProfileLogic({
      setProfilePhoto,
      profilePhoto,
      toast,
      setProfileModal,
    });

  return (
    <UpdateUserModalBackdrop>
      <ToastContainer autoClose={2000} />
      <i
        className="fa-solid fa-circle-xmark"
        onClick={() => setProfileModal(false)}
      ></i>
      <UpdateUserModalBox>
        <h2>Update Profile Picture</h2>

        {profilePhoto != null ? (
          <img
            src={profilePhoto}
            onClick={handleClick}
            title={profilePhoto && "Click to remove photo"}
          />
        ) : (
          <Image publicId={currentUser.profileUrl} cloudName="iamprogrammer" />
        )}

        {/* <img
          src={profilePhoto}
          onClick={handleClick}
          title={profilePhoto && "Click to remove photo"}
        /> */}

        <div className="input__box">
              <h5> + <i className="fa-solid fa-file-image"></i> </h5>
            <input type="file" placeholder="choose file" onChange={handleChange} accept="image/*" />
        </div>
        

        <button className="btnUpdate" onClick={updateProfilePicture}>
          Upload Photo
        </button>
      </UpdateUserModalBox>
    </UpdateUserModalBackdrop>
  );
}

export default UpdateProfileModal;
