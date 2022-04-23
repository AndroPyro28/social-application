import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { refresh } from "../../redux/actions/appRefresher";

function UpdateProfileLogic({ setProfilePhoto, profilePhoto, toast, setProfileModal}) {

  const handleChange = (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = async () => {
      setProfilePhoto(reader.result);
    };
  };

  const handleClick = () => {
    setProfilePhoto(null);
  };

  const updateProfilePicture = async () => {
    const btnUpdate = document.querySelector('.btnUpdate');
    if (!profilePhoto) {
      return toast("Choose a photo to update your profile", {
        type: "warning",
      });
    }
    if (!profilePhoto.includes("image")) {
      return toast("PNG/JPG extension only", {
        type: "warning",
      });
    }

    try {
      btnUpdate.disabled = true
      const res = await axios.post(
        "http://localhost:3001/api/updateProfilePicture",
        {
          profileUrlData: profilePhoto,
        },
        {
          withCredentials: true,
          headers: {
            accesstoken: Cookies.get("userToken"),
          },onUploadProgress: (progress) => {
            console.log(Math.round((progress.loaded * 100) / progress.total))
          }
        }
      );

      const {success, msg} = res.data;
      btnUpdate.disabled = false;
      if(!success) {
        return toast(msg, {
          type: 'error'
        })
      }
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  return { handleChange, handleClick, updateProfilePicture };
}

export default UpdateProfileLogic;
